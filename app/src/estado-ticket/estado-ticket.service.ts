import { TrazaTicket } from './../traza-ticket/entities/traza-ticket.entity';
import { EstadoTicket } from './entities/estado-ticket.entity';
import { forwardRef, Injectable } from '@nestjs/common';
import { CreateEstadoTicketDto } from './dto/create-estado-ticket.dto';
import { UpdateEstadoTicketDto } from './dto/update-estado-ticket.dto';
import { InjectModel } from '@nestjs/sequelize';
import { TrazaTicketService } from 'src/traza-ticket/traza-ticket.service';
import { Inject } from '@nestjs/common';
import { Op } from 'sequelize';
import { ModelCtor } from 'sequelize-typescript';

@Injectable()
export class EstadoTicketService {
	constructor(
		@InjectModel(EstadoTicket) private readonly estadoRepo: ModelCtor<EstadoTicket>, //typeof EstadoTicket,
		@Inject(forwardRef(() => TrazaTicketService)) private readonly svrTraza: TrazaTicketService
		// private readonly svrTraza: TrazaTicketService
	) { }

	create(createEstadoTicketDto: CreateEstadoTicketDto) {
		let newEstado: EstadoTicket = new EstadoTicket();
		Object.assign(newEstado, createEstadoTicketDto);
		return newEstado.save();
	}

	async findAll() {
		return await this.estadoRepo.findAll();
	}

	async findOne(id: number) {
		return await this.estadoRepo.findByPk(id);
	}

	async findPorOrden(idorden: number) {
		return await this.estadoRepo.findAll({ where: { orden: idorden } });
	}

	async findEstadosNext(idTicketServicio: number, anular: number) {
		const trazaultima: TrazaTicket = await this.svrTraza.findUltimaTraza(idTicketServicio);
		const ultimoEstado: EstadoTicket = await this.estadoRepo.findByPk(trazaultima.idEstadoTicket);
		const estadossiguientes: EstadoTicket[] = await this.estadoRepo.findAll({
			where: {
				orden: { [Op.or]: [ultimoEstado.orden + 1, anular ? -20 : -10] }
			}
		});
		return estadossiguientes;
	}

	async findForRecibios(idTicket: number, verificar: number) {
		const trazaultima: TrazaTicket = await this.svrTraza.findUltimaTraza(idTicket);
		const ultimoEstado: EstadoTicket = await this.estadoRepo.findByPk(trazaultima.idEstadoTicket);
		const estadoAnular: EstadoTicket = await this.estadoRepo.findOne({ where: { orden: -10 } });
		const estadosSiguientes: EstadoTicket[] = await this.estadoRepo.findAll({
			where: {
				orden: { [Op.or]: [ultimoEstado.orden + 1] }
			}
		});

		if (ultimoEstado.idEstadoTicket === 1 && verificar === 1) { return [...estadosSiguientes, estadoAnular] };

		if (ultimoEstado.idEstadoTicket === 1 && !verificar) { return [estadoAnular] };
		if (ultimoEstado.idEstadoTicket === 5) { return [...estadosSiguientes] };

		return [ultimoEstado, ...estadosSiguientes];
	}

	async findEstadosCurrentAndNext(idTicketServicio: number, aprobado: number) {
		const trazaultima: TrazaTicket = await this.svrTraza.findUltimaTraza(idTicketServicio);
		const ultimoEstado: EstadoTicket = await this.estadoRepo.findByPk(trazaultima.idEstadoTicket);
		const estadoRechazar: EstadoTicket = await this.estadoRepo.findOne({ where: { orden: -20 } });
		const estadossiguientes: EstadoTicket[] = await this.estadoRepo.findAll({
			where: {
				orden: { [Op.or]: [ultimoEstado.orden + 1] }
			}
		});

		if (aprobado === 0) {
			return estadossiguientes
		}

		if (aprobado === 1) {
			return [ultimoEstado, ...estadossiguientes];
		}

		if (aprobado === 2) {
			return [...estadossiguientes, estadoRechazar];
		}

		if (aprobado === 3) {
			return [ultimoEstado, ...estadossiguientes, estadoRechazar];
		}

	}

	findEstadosHisRecibidos() {
		return this.estadoRepo.findAll({ where: { idEstadoTicket: { [Op.between]: [6, 9] } } });
	}
	update(id: number, updateEstadoTicketDto: UpdateEstadoTicketDto) {
		return `This action updates a #${id} estadoTicket`;
	}

	remove(id: number) {
		return `This action removes a #${id} estadoTicket`;
	}
}
