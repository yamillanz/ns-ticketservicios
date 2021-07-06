import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { EstadoTicket } from './entities/estado-ticket.entity';
import { EstadoTicketService } from './estado-ticket.service';
import { EstadoTicketController } from './estado-ticket.controller';

@Module({
	imports: [SequelizeModule.forFeature([EstadoTicket])],
	controllers: [EstadoTicketController],
	providers: [EstadoTicketService],
	exports: [EstadoTicketService]
})
export class EstadoTicketModule { }
