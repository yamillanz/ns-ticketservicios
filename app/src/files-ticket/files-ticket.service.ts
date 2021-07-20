import { FilesTicket } from './entities/files-ticket.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateFilesTicketDto } from './dto/create-files-ticket.dto';
import { UpdateFilesTicketDto } from './dto/update-files-ticket.dto';
import { where } from 'sequelize';
import { ModelCtor } from 'sequelize-typescript';

@Injectable()
export class FilesTicketService {
	constructor(
		@InjectModel(FilesTicket)
		private readonly fileTicketRepo: ModelCtor<FilesTicket>, //typeof FilesTicket

	) { }

	create(createFilesTicketDto: CreateFilesTicketDto) {
		try {
			let newFilesTicket: FilesTicket = new FilesTicket();
			Object.assign(newFilesTicket, createFilesTicketDto);
			return newFilesTicket.save();
		} catch (error) {
			console.log(error);
			return error
		}
	}

	async findAll() {
		return await this.fileTicketRepo.findAll();
	}

	async findAllFromTicket(idTicketServicio: number) {
		return await this.fileTicketRepo.findAll({ where: { idTicketServicio } });
	}

	findOne(id: number) {
		return `This action returns a #${id} filesTicket`;
	}

	

	update(id: number, updateFilesTicketDto: UpdateFilesTicketDto) {
		return `This action updates a #${id} filesTicket`;
	}

	remove(id: number) {
		return `This action removes a #${id} filesTicket`;
	}
}
