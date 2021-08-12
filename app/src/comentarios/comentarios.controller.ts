import { LastCommentParams } from './dto/last-comments.params';
import { Controller, Get, Post, Body, Patch, Param, Delete, Logger, HttpException } from '@nestjs/common';
import { ComentariosService } from './comentarios.service';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { UpdateComentarioDto } from './dto/update-comentario.dto';

@Controller('api/comentarios')
export class ComentariosController {
	private readonly log: Logger = new Logger('comentarios');
	constructor(private readonly comentariosService: ComentariosService) { }

	@Post()
	create(@Body() createComentarioDto: CreateComentarioDto) {
		return this.comentariosService.create(createComentarioDto);
	}

	@Get()
	findAll() {
		return this.comentariosService.findAll();
	}

	@Get('tickets/:idTicketServicio')
	findAlltickets(@Param('idTicketServicio') idticket: string) {
		this.log.debug(`comentarios del ticket ${idticket}`);
		return this.comentariosService.findAllPorTicket(+idticket);
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.comentariosService.findOne(+id);
	}

	@Get('lastcomment/user/:idSegUsuario/:idTicketServicio')
	findLastCommentUser(@Param() params: LastCommentParams/*  @Param('idTicketServicio') idTicketServicio: number */) {
		this.log.debug(`ultimo comentario user ${params}`);
		return this.comentariosService.findLastCommentUser(+params.idSegUsuario, params.idTicketServicio);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateComentarioDto: UpdateComentarioDto) {
		return this.comentariosService.update(+id, updateComentarioDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.comentariosService.remove(+id);
	}
}
