import { Module } from '@nestjs/common';
import { TrazaTicketService } from './traza-ticket.service';
import { TrazaTicketController } from './traza-ticket.controller';

@Module({
  controllers: [TrazaTicketController],
  providers: [TrazaTicketService]
})
export class TrazaTicketModule {}
