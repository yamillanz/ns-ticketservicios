import { HttpModule, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { EstadoTicketModule } from './../estado-ticket/estado-ticket.module';

import { TrazaTicket } from './entities/traza-ticket.entity';
import { TrazaTicketService } from './traza-ticket.service';
import { TrazaTicketController } from './traza-ticket.controller';

@Module({
	imports: [SequelizeModule.forFeature([TrazaTicket]), EstadoTicketModule, HttpModule],
	controllers: [TrazaTicketController],
	providers: [TrazaTicketService],
	exports: [TrazaTicketService]
})
export class TrazaTicketModule { }
