import { Injectable, HttpService } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { NotFoundException } from '@nestjs/common/exceptions';
import { Op } from 'sequelize';
import { TrazaTicket } from './../traza-ticket/entities/traza-ticket.entity';
import { Ticket } from './entities/ticket.entity';

import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { TicketTrazaDto } from './dto/ticket-traza.dto';
import { TicketDto } from './dto/ticket.dto';

import { EstadoTicketService } from './../estado-ticket/estado-ticket.service';
import { TrazaTicketService } from 'src/traza-ticket/traza-ticket.service';

@Injectable()
export class TicketService {
    private readonly URL_gerencias = process.env.URL_BACKEND;
    private readonly URL_BACKCONFIG = process.env.URL_BACKCONFIG;

    constructor(
        @InjectModel(Ticket)
        private readonly ticketRepo: typeof Ticket, //ModelCtor<Ticket>, //,

        private readonly srvTrazas: TrazaTicketService,
        private readonly srvEstados: EstadoTicketService,
        private http: HttpService,
    ) {}

    async create(createTicketDto: CreateTicketDto) {
        try {
            const newTicket: Ticket = new Ticket();
            Object.assign(newTicket, createTicketDto);
            return newTicket.save();
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    async findAll() {
        try {
            // return await this.ticketRepo.findAll<Ticket>({include: [TrazaTicket]});
            return await this.ticketRepo.findAll<Ticket>({ where: { estatus: 1 } });
        } catch (error) {
            console.error(error);
            return error;
        }
        // return `This action returns all ticket`;
    }

    async findAllWithTrazas() {
        try {
            // return await this.ticketRepo.findAll<Ticket>({include: [TrazaTicket]});
            return await this.ticketRepo.findAll<Ticket>({
                include: [TrazaTicket],
                where: { estatus: 1 },
            });
        } catch (error) {
            console.error(error);
            return error;
        }
        // return `This action returns all ticket`;
    }

    async findOne(id: number): Promise<Ticket> {
        try {
            // return await this.ticketRepo.findAll<Ticket>({include: [TrazaTicket]});
            return await this.ticketRepo.findOne<Ticket>({ where: { idTicketServicio: id } });
        } catch (error) {
            console.error(error);
        }
    }

    async findOneWithTrazas(id: number): Promise<TicketTrazaDto> {
        try {
            let ticketFinded = (
                await this.ticketRepo.findOne<Ticket>({ where: { idTicketServicio: id } })
            ).toJSON();
            let newTicketDto: TicketTrazaDto = new TicketTrazaDto();
            Object.assign(newTicketDto, ticketFinded);
            //Te desaclopas un poco de ORM
            newTicketDto.trazas = await this.srvTrazas.findAllforOneTicket(
                newTicketDto.idTicketServicio,
            );
            return newTicketDto;

            //completamente acoplado al orm
            // return await this.ticketRepo.findOne<Ticket>(
            // 	{
            // 		include: [{ model: TrazaTicket, include: [EstadoTicket] }],
            // 		where: { idTicketServicio: id }
            // 	}
            // );
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    async findAllPorUsuario(idSegUsuario: number): Promise<CreateTicketDto[]> {
        try {
            return await this.ticketRepo.findAll<Ticket>({ where: { idSegUsuario } });
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    async findAllPorGerencia(idGerencia: number): Promise<CreateTicketDto[]> {
        try {
            return await this.ticketRepo.findAll<Ticket>({
                where: { idGerenciaOrigen: idGerencia },
            });
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    async findAllRecibidos(idGerencia: number): Promise<TicketDto[]> {
        try {
            //HISTORICOS
            // return await this.ticketRepo.findAll<Ticket>({
            // 	where: {
            // 		idGerenciaOrigen: idGerencia,
            // 		idEstadoActual: { [Op.between]: [6, 9], [Op.lt]: 0 }
            // 	}
            // });
            // (SELECT nombre FROM config_servicios_gerencias ger WHERE ger.idServiciosGerencias = tickets.idServiciosGerencias) tipo_servicio
            let dtosRecibidos: TicketDto[] = [];
            const recibidos = await this.ticketRepo.findAll<Ticket>({
                where: {
                    idGerenciaDestino: idGerencia,
                    idEstadoActual: { [Op.or]: [10, { [Op.between]: [2, 5] }] },
                },
                order: [
                    [`idEstadoActual`, `DESC`],
                    [`idTicketServicio`, `DESC`],
                ],
            });

            for (const ticket of recibidos) {
                let newdto: TicketDto = Object.assign({}, ticket.toJSON());
                let dataEstado = await this.srvEstados.findOne(ticket.idEstadoActual);
                newdto.gerenciaOrigen = (
                    await this.http
                        .get(this.URL_gerencias + `gerencias/${ticket.idGerenciaOrigen}`)
                        .toPromise()
                ).data[0].nombre;

                newdto.tipo_servicio = (
                    await this.http
                        .get(
                            `${this.URL_BACKCONFIG}config/serviciosgerencias/${ticket.idServiciosGerencias}`,
                        )
                        .toPromise()
                ).data[0].nombre;

                newdto.estado_actual_accion_adic = dataEstado.accion_adicional;
                newdto.orden = dataEstado.accion_adicional;
                newdto.orden_mod = +(await this.srvEstados.findOne(ticket.idEstadoActual)).orden;
                dtosRecibidos.push(newdto);
            }
            return dtosRecibidos.sort(
                (tikA, tikB) =>
                    tikB.orden_mod - tikA.orden_mod ||
                    tikB.idTicketServicio - tikA.idTicketServicio,
            );
            // return dtosRecibidos;
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    async findAllEnviados(idGerencia: number): Promise<TicketDto[]> {
        // "SELECT tickets.*,
        //         (SELECT nombre FROM config_gerencias ger WHERE ger.idConfigGerencia = tickets.idGerenciaDestino) gerenciaDestino,
        //         IF(tickets.idEstadoActual = 1 OR tickets.idEstadoActual = 2 OR tickets.idEstadoActual = 5, 0, 1) orden_mod
        //         FROM ts_ticket_servicio tickets
        //             WHERE idGerenciaOrigen = $idgerencia
        //             AND ((tickets.IdEstadoActual >= 1 and tickets.IdEstadoActual < 6) OR (tickets.IdEstadoActual = 10))
        //             ORDER BY orden_mod, idEstadoActual ASC";
        try {
            let dtosRecibidos: TicketDto[] = [];
            const recibidos = await this.ticketRepo.findAll<Ticket>({
                where: {
                    idGerenciaOrigen: idGerencia,
                    idEstadoActual: { [Op.or]: [10, { [Op.between]: [1, 5] }] },
                },
                order: [
                    [`idEstadoActual`, `ASC`],
                    [`idTicketServicio`, `DESC`],
                ],
            });

            for (const ticket of recibidos) {
                let newdto: TicketDto = Object.assign({}, ticket.toJSON());
                // let dataEstado = await this.srvEstados.findOne(ticket.idEstadoActual);
                newdto.gerenciaDestino = (
                    await this.http
                        .get(this.URL_gerencias + `gerencias/${ticket.idGerenciaDestino}`)
                        .toPromise()
                ).data[0].nombre;

                newdto.tipo_servicio = (
                    await this.http
                        .get(
                            `${this.URL_BACKCONFIG}config/serviciosgerencias/${ticket.idServiciosGerencias}`,
                        )
                        .toPromise()
                ).data[0].nombre;

                newdto.orden_mod = ticket.idEstadoActual in [1, 2, 5] ? 0 : 1;
                // newdto.estado_actual_accion_adic = dataEstado.accion_adicional;
                // newdto.orden = dataEstado.accion_adicional;
                dtosRecibidos.push(newdto);
            }
            // return dtosRecibidos.sort((ticketa, ticketb) => ticketb.orden_mod - ticketa.orden_mod);
            return dtosRecibidos;
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    async findAllHistoricosRecibidos(idGerencia: number): Promise<TicketDto[]> {
        let dtosHistoricosRec: TicketDto[] = [];
        const histRecibidos = await this.ticketRepo.findAll<Ticket>({
            where: {
                idGerenciaDestino: idGerencia,
                idEstadoActual: { [Op.or]: [{ [Op.lte]: 0 }, { [Op.between]: [6, 9] }] },
            },
            order: [],
        });
        for (const ticket of histRecibidos) {
            let dtoticket: TicketDto = Object.assign({}, ticket.toJSON());

            dtoticket.gerenciaOrigen = (
                await this.http
                    .get(this.URL_gerencias + `gerencias/${ticket.idGerenciaOrigen}`)
                    .toPromise()
            ).data[0].nombre;

            dtoticket.tipo_servicio = (
                await this.http
                    .get(
                        `${this.URL_BACKCONFIG}config/serviciosgerencias/${ticket.idServiciosGerencias}`,
                    )
                    .toPromise()
            ).data[0].nombre;

            dtosHistoricosRec.push(dtoticket);
        }
        return dtosHistoricosRec;
    }

    async findAllHistoricosEnviados(idGerencia: number): Promise<TicketDto[]> {
        let dtosHistoricosRec: TicketDto[] = [];
        const histRecibidos = await this.ticketRepo.findAll<Ticket>({
            where: {
                idGerenciaOrigen: idGerencia,
                idEstadoActual: { [Op.or]: [{ [Op.lte]: 0 }, { [Op.between]: [6, 9] }] },
            },
        });
        for (const ticket of histRecibidos) {
            let dtoticket: TicketDto = Object.assign({}, ticket.toJSON());

            dtoticket.gerenciaDestino = (
                await this.http
                    .get(this.URL_gerencias + `gerencias/${ticket.idGerenciaDestino}`)
                    .toPromise()
            ).data[0].nombre;

            dtoticket.tipo_servicio = (
                await this.http
                    .get(
                        `${this.URL_BACKCONFIG}config/serviciosgerencias/${ticket.idServiciosGerencias}`,
                    )
                    .toPromise()
            ).data[0].nombre;

            dtosHistoricosRec.push(dtoticket);
        }
        return dtosHistoricosRec;
    }

    async update(id: number, updateTicketDto: UpdateTicketDto) {
        let updateTicket = await this.ticketRepo.findOne<Ticket>({
            where: { idTicketServicio: id },
        });
        if (!updateTicket) {
            throw new NotFoundException('Ticket no existe');
        }
        // console.log("viene ", updateTicketDto);

        try {
            Object.assign(updateTicket, updateTicketDto);
            return updateTicket.save();
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    async remove(id: number) {
        let updateTicket = await this.ticketRepo.findOne<Ticket>({
            where: { idTicketServicio: id },
        });
        if (!updateTicket) {
            throw new NotFoundException('Ticcket no existe');
        }

        updateTicket.estatus = 0;
        try {
            updateTicket.save();
        } catch (error) {
            console.error(error);
            return error;
        }
    }
}
