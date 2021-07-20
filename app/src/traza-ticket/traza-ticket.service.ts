import { EstadoTicketService } from './../estado-ticket/estado-ticket.service';
import { EstadoTicket } from './../estado-ticket/entities/estado-ticket.entity';
import { TrazaTicket } from './entities/traza-ticket.entity';
import { forwardRef, HttpService, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrazaTicketDto } from './dto/create-traza-ticket.dto';
import { UpdateTrazaTicketDto } from './dto/update-traza-ticket.dto';
import { InjectModel } from '@nestjs/sequelize';
import { TrazaTicketDto } from './dto/traza-ticket.dto';
import { ModelCtor } from 'sequelize-typescript';

@Injectable()
export class TrazaTicketService {
	private readonly URL_usuarios: string = process.env.URL_BACKEND;

	constructor(
		@InjectModel(TrazaTicket) private readonly trazaRepo: typeof TrazaTicket, //ModelCtor<TrazaTicket>, //,
		@Inject(forwardRef(() => EstadoTicketService)) private readonly svrEstadoTicket: EstadoTicketService,
		// private readonly svrEstadoTicket: EstadoTicketService,
		private readonly http: HttpService
	) { }


	create(createTrazaTicketDto: CreateTrazaTicketDto) {
		try {
			let newTraza: TrazaTicket = new TrazaTicket();
			Object.assign(newTraza, createTrazaTicketDto);
			return newTraza.save();
		} catch (error) {
			console.error(error);
			return error
		}
	}

	findAll() {
		try {
			return this.trazaRepo.findAll({ include: [EstadoTicket] });

		} catch (error) {
			console.error(error);
			return error
		}
	}

	async findAllforOneTicket(idTicketServicio: number): Promise<TrazaTicketDto[]> {
		try {
			let dtosTrazasFinded: TrazaTicketDto[] = [];
			let trazasFinded = (await this.trazaRepo.findAll({ where: { idTicketServicio } }));
			for (const traza of trazasFinded) {
				let dto: TrazaTicketDto = Object.assign({}, traza.toJSON());
				dto.nombreEstado = (await this.svrEstadoTicket.findOne(traza.idEstadoTicket)).nombre;
				dto.Usuario = (await this.http.get(this.URL_usuarios + `usuarios/${traza.idSegUsuario}`).toPromise()).data[0].nombre_completo;
				dtosTrazasFinded.push(dto);
			}
			// dtosTrazasFinded = await Promise.all(trazasFinded.map(async (traza) => {
			// 	let dto : TrazaTicketDto = {};
			// 	Object.assign(dto, traza.toJSON());
			// 	dto.nombreEstado = (await this.svrEstadoTicket.findOne(traza.idEstadoTicket)).nombre;
			// 	// this.svrEstadoTicket.findOne(traza.idEstadoTicket).then(estado =>{
			// 	// 	dto.nombreEstado = estado.nombre;
			// 	// });
			// 	dto.Usuario = "";
			// 	return dto;
			// }));
			return dtosTrazasFinded;

		} catch (error) {
			console.error(error);
			return error
		}
	}

	findOne(id: number) {
		return `This action returns a #${id} trazaTicket`;
	}

	findUltimaTraza(idTicket: number): Promise<TrazaTicket> {
		return this.trazaRepo.findOne({ where: { idTicketServicio: idTicket }, order: [[`fechaAlta`, "DESC"]], limit: 1 });
	}

	update(id: number, updateTrazaTicketDto: UpdateTrazaTicketDto) {
		return `This action updates a #${id} trazaTicket`;
	}

	async remove(id: number) {
		let updatedTrazas: TrazaTicket = await this.trazaRepo.findByPk(id);
		if (!updatedTrazas) {
			throw new NotFoundException('traza no existe');
		}

		updatedTrazas.estatus = 0;

		return updatedTrazas.save()
	}
}
