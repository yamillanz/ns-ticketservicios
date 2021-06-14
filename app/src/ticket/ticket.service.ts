import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from './entities/ticket.entity';

@Injectable()
export class TicketService {
	constructor(
		@InjectModel(Ticket)
		private readonly ticketRepo : typeof Ticket
	){}
	create(createTicketDto: CreateTicketDto) {
		return 'This action adds a new ticket';
	}

	async findAll() {
		try {
			return await this.ticketRepo.findAll();			
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
