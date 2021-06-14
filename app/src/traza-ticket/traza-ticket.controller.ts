import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TrazaTicketService } from './traza-ticket.service';
import { CreateTrazaTicketDto } from './dto/create-traza-ticket.dto';
import { UpdateTrazaTicketDto } from './dto/update-traza-ticket.dto';

@Controller('traza-ticket')
export class TrazaTicketController {
  constructor(private readonly trazaTicketService: TrazaTicketService) {}

  @Post()
  create(@Body() createTrazaTicketDto: CreateTrazaTicketDto) {
    return this.trazaTicketService.create(createTrazaTicketDto);
  }

  @Get()
  findAll() {
    return this.trazaTicketService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trazaTicketService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrazaTicketDto: UpdateTrazaTicketDto) {
    return this.trazaTicketService.update(+id, updateTrazaTicketDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trazaTicketService.remove(+id);
  }
}
