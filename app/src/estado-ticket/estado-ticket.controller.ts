import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstadoTicketService } from './estado-ticket.service';
import { CreateEstadoTicketDto } from './dto/create-estado-ticket.dto';
import { UpdateEstadoTicketDto } from './dto/update-estado-ticket.dto';

@Controller('estado-ticket')
export class EstadoTicketController {
  constructor(private readonly estadoTicketService: EstadoTicketService) {}

  @Post()
  create(@Body() createEstadoTicketDto: CreateEstadoTicketDto) {
    return this.estadoTicketService.create(createEstadoTicketDto);
  }

  @Get()
  findAll() {
    return this.estadoTicketService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estadoTicketService.findOne(+id);
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
