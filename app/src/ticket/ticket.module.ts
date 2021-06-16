import { Module, LoggerService } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Ticket } from './entities/ticket.entity';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';

@Module({
	imports: [SequelizeModule.forFeature([Ticket])],
	controllers: [TicketController],
	providers: [TicketService, ]
})
export class TicketModule { }
