import { EstadoTicketModule } from './../estado-ticket/estado-ticket.module';
import { Module, HttpModule, HttpService } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TrazaTicketModule } from './../traza-ticket/traza-ticket.module';

// import { TrazaTicket } from './../traza-ticket/entities/traza-ticket.entity';
import { Ticket } from './entities/ticket.entity';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { TrazaTicketService } from 'src/traza-ticket/traza-ticket.service';

@Module({
	imports: [TrazaTicketModule, EstadoTicketModule, SequelizeModule.forFeature([Ticket]), HttpModule ],
	// imports: [], NO funciona
	controllers: [TicketController],
	providers: [TicketService,],
})
export class TicketModule { }
