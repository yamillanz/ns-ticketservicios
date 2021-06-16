import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from '@nestjs/common';
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

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.ticketService.findOne(+id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
		return this.ticketService.update(+id, updateTicketDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.ticketService.remove(+id);
	}
}
