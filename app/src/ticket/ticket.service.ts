import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from './entities/ticket.entity';

@Injectable()
export class TicketService {
	constructor(
		@InjectModel(Ticket)
		// @Inject([{
		// 	provide: 'TICKET_REPOSITORY',
		// 	useValue: Ticket, 
		// }])
		private readonly ticketRepo: typeof Ticket
	) { }

	async create(createTicketDto: CreateTicketDto) {
		 try {
			const userNew: Ticket = new Ticket();
			Object.assign(userNew, createTicketDto);
			//userNew.descripcion = createTicketDto.descripcion;
			//userNew.justificacionEstadoActual = createTicketDto.justificacionEstadoActual;
			//userNew.idSolpedCompras = createTicketDto.idSolpedCompras;
			// const {userNew.descripcion}
			// const newUserModel = new Ticket();
			// this.ticketRepo.create<Ticket>(createTicketDto)
			// await newUserModel({ descripcion });
			// this.ticketRepo.create(new Ticket())
			return userNew.save();
		 } catch (error) {
			 console.error(error);
			 return error;
		}
	}

	async findAll() {
		try {
			return await this.ticketRepo.findAll<Ticket>();
		} catch (error) {
			console.error(error);
		}
		// return `This action returns all ticket`;
	}

	findOne(id: number) {
		return `This action returns a #${id} ticket`;
	}

	update(id: number, updateTicketDto: UpdateTicketDto) {
		return `This action updates a #${id} ticket`;
	}

	remove(id: number) {
		return `This action removes a #${id} ticket`;
	}
}
