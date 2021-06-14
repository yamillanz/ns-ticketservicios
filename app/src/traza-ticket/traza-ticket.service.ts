import { Injectable } from '@nestjs/common';
import { CreateTrazaTicketDto } from './dto/create-traza-ticket.dto';
import { UpdateTrazaTicketDto } from './dto/update-traza-ticket.dto';

@Injectable()
export class TrazaTicketService {
  create(createTrazaTicketDto: CreateTrazaTicketDto) {
    return 'This action adds a new trazaTicket';
  }

  findAll() {
    return `This action returns all trazaTicket`;
  }

  findOne(id: number) {
    return `This action returns a #${id} trazaTicket`;
  }

  update(id: number, updateTrazaTicketDto: UpdateTrazaTicketDto) {
    return `This action updates a #${id} trazaTicket`;
  }

  remove(id: number) {
    return `This action removes a #${id} trazaTicket`;
  }
}
