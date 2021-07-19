import { TicketService } from './../ticket/ticket.service';
import { Ticket } from './../ticket/entities/ticket.entity';
import { Comentario } from './entities/comentario.entity';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { UpdateComentarioDto } from './dto/update-comentario.dto';
import { InjectModel } from '@nestjs/sequelize';
import { HttpService } from '@nestjs/common/http';
import config from './config.constants';
import { NotFoundException } from '@nestjs/common/exceptions';

@Injectable()
export class ComentariosService {

	constructor(
		// @InjectModel(Comentario) private readonly comentarioRepo: typeof Comentario,
		@Inject('COMENTARIO_REPOSITORY') private comentarioRepo: typeof Comentario,
		@Inject(forwardRef(() => TicketService)) private readonly svrTicket: TicketService,

		private readonly http: HttpService
	) { }

	async create(createComentarioDto: CreateComentarioDto) {
		// let newComentario = new Comentario();
		// Object.assign(newComentario, createComentarioDto);
		// newComentario.save();
		try {
			let newComment: Comentario = await this.comentarioRepo.create({ ...createComentarioDto } as Comentario);
			return await newComment.save()

		} catch (error) {
			console.log(error);
			return error;
		}
	}

	async findAll() {
		return await this.comentarioRepo.findAll();
	}

	async findAllPorTicket(idTicketServicio: number) {
		try {
			const ticket :Ticket = await this.svrTicket.findOne(idTicketServicio);
			if(!ticket) {
				throw new NotFoundException('Ticket not exist!');
			}
			let comentarios: Comentario[] = await this.comentarioRepo.findAll({ where: { idReferencia: idTicketServicio }, include: [Ticket] });
			let commetsTickets: CreateComentarioDto[] = [];
			for (const comment of comentarios) {
				let commentAdded: CreateComentarioDto = Object.assign({}, comment.toJSON());
				commentAdded.nombre_usuario = (await this.http.get(process.env.URL_BACKEND + `usuarios/${comment.idSegUsuario}`).toPromise()).data[0].nombre_completo;
				commetsTickets.push(commentAdded);
			}

			return commetsTickets;
		} catch (error) {
			console.log(error);
			return error;
		}

	}

	findOne(id: number) {
		return `This action returns a #${id} comentario`;
	}

	update(id: number, updateComentarioDto: UpdateComentarioDto) {
		return `This action updates a #${id} comentario`;
	}

	remove(id: number) {
		return `This action removes a #${id} comentario`;
	}
}
