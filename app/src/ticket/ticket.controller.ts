import { Controller, Get, Post, Body, Param, Delete, Logger, Put } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Controller('ticket')
export class TicketController {

	private readonly log: Logger = new Logger('ticket');

	constructor(private readonly ticketService: TicketService,) { }

	@Post()
	create(@Body() createTicketDto: CreateTicketDto) {
		this.log.debug(`create ticket`);
		return this.ticketService.create(createTicketDto);
	}

	@Get()
	async findAll() {
		this.log.debug(`find all`);
		return await this.ticketService.findAll();
	}

	@Get('/trazas')
	async findAllWithTrazas() {
		this.log.debug(`find all with trazas`);
		return await this.ticketService.findAllWithTrazas();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		this.log.debug(`find one ${id}`);
		return this.ticketService.findOne(+id);
	}

	@Get(':id/contrazas')
	findOneWithTrazas(@Param('id') id: string) {
		this.log.debug(`find one with trazas ${id}`);
		return this.ticketService.findOneWithTrazas(+id);
	}

	@Get('/porusr/:idSegUsuario')
	findAllPorUsuario(@Param('idSegUsuario') id: string) {
		this.log.debug(`all for user: ${id}`);
		return this.ticketService.findAllPorUsuario(+id);
	}

	@Get('/porgerencia/:idGerencia')
	findAllPorGerencia(@Param('idGerencia') id: string) {
		this.log.debug(`all for gerencia: ${id}`);
		return this.ticketService.findAllPorGerencia(+id);
	}

	@Get('/recibidos/:idGerencia')
	findAllRecibidos(@Param('idGerencia') id: string) {
		this.log.debug(`all gerencia: ${id} recibidos`);
		return this.ticketService.findAllRecibidos(+id);
	}

	@Get('/enviados/:idGerencia')
	findAllEnviados(@Param('idGerencia') id: string) {
		this.log.debug(`all gerencia: ${id} enviados`);
		return this.ticketService.findAllEnviados(+id);
	}

	@Get('/hisrecibidos/:idGerencia')
	findAllhistoricosRecibidos(@Param('idGerencia') id: string) {
		this.log.debug(`all gerencia: ${id} enviados`);
		return this.ticketService.findAllHistoricosRecibidos(+id);
	}

	@Get('/hisenviados/:idGerencia')
	findAllhistoricosEnviados(@Param('idGerencia') id: string) {
		this.log.debug(`all gerencia: ${id} enviados`);
		return this.ticketService.findAllHistoricosEnviados(+id);
	}

	@Put(':id')
	update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
		this.log.debug(`update ticket ${id}`);
		return this.ticketService.update(+id, updateTicketDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.ticketService.remove(+id);
	}

}
