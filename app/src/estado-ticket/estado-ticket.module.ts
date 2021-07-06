import { TrazaTicketService } from 'src/traza-ticket/traza-ticket.service';
import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { EstadoTicket } from './entities/estado-ticket.entity';
import { EstadoTicketService } from './estado-ticket.service';
import { EstadoTicketController } from './estado-ticket.controller';
import { TrazaTicketModule } from 'src/traza-ticket/traza-ticket.module';


@Module({
	imports: [SequelizeModule.forFeature([EstadoTicket]), forwardRef(() => TrazaTicketModule)],
	controllers: [EstadoTicketController],
	providers: [EstadoTicketService],
	exports: [EstadoTicketService]
})
export class EstadoTicketModule { }
