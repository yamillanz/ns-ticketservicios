import { EstadoTicket } from './entities/estado-ticket.entity';
import { Injectable } from '@nestjs/common';
import { CreateEstadoTicketDto } from './dto/create-estado-ticket.dto';
import { UpdateEstadoTicketDto } from './dto/update-estado-ticket.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class EstadoTicketService {
	constructor(
		@InjectModel(EstadoTicket)
		private readonly estadoRepo: typeof EstadoTicket
	) { }

	create(createEstadoTicketDto: CreateEstadoTicketDto) {
		return 'This action adds a new estadoTicket';
	}

	async findAll() {
		return await this.estadoRepo.findAll();
	}

	async findOne(id: number) {
		return await this.estadoRepo.findByPk(id);
	}

	update(id: number, updateEstadoTicketDto: UpdateEstadoTicketDto) {
		return `This action updates a #${id} estadoTicket`;
	}

	remove(id: number) {
		return `This action removes a #${id} estadoTicket`;
	}
}
