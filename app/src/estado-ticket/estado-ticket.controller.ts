import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from '@nestjs/common';
import { EstadoTicketService } from './estado-ticket.service';
import { CreateEstadoTicketDto } from './dto/create-estado-ticket.dto';
import { UpdateEstadoTicketDto } from './dto/update-estado-ticket.dto';

@Controller('api/estado-ticket')
export class EstadoTicketController {
	private readonly log: Logger = new Logger('estadosticket');

	constructor(private readonly estadoTicketService: EstadoTicketService) { }

	@Post()
	create(@Body() createEstadoTicketDto: CreateEstadoTicketDto) {
		this.log.debug(`create estado`);
		return this.estadoTicketService.create(createEstadoTicketDto);
	}

	@Get()
	findAll() {
		return this.estadoTicketService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		this.log.debug(`find by ${id}`);
		return this.estadoTicketService.findOne(+id);
	}

	@Get('estadoticketorden/:idorden')
	findPorOrden(@Param('idorden') idorden: string) {
		this.log.debug(`find by ${idorden}`);
		return this.estadoTicketService.findPorOrden(+idorden);
	}

	@Get('estadossiguientes/:idTicket/:anular')
	findEstadosNext(@Param('idTicket') idTicket: number, @Param('anular') anular : number) {
		this.log.debug(`estados siguientes`);
		return this.estadoTicketService.findEstadosNext(idTicket, anular);
	}

	@Get('estadosactualysig/:idTicket/:aprobado')
	findEstadosCurrentAndNext(@Param('idTicket') idTicket: number, @Param('aprobado') aprobado : number) {
		this.log.debug(`estados actual y siguiente`);
		return this.estadoTicketService.findEstadosCurrentAndNext(+idTicket, +aprobado);
	}
	
	@Get('estadoshisrecibidos')
	findEstadosHisRecibidos() {
		this.log.debug(`estados recibidos historicos`);
		return this.estadoTicketService.findEstadosHisRecibidos();
	}
	
	@Patch(':id')
	update(@Param('id') id: string, @Body() updateEstadoTicketDto: UpdateEstadoTicketDto) {
		return this.estadoTicketService.update(+id, updateEstadoTicketDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.estadoTicketService.remove(+id);
	}
}
