import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { TicketModule } from './ticket/ticket.module';
import { TrazaTicketModule } from './traza-ticket/traza-ticket.module';
import { EstadoTicketModule } from './estado-ticket/estado-ticket.module';
import { EncuestaModule } from './encuesta/encuesta.module';
import { ComentariosModule } from './comentarios/comentarios.module';

import { FilesTicket } from './files-ticket/entities/files-ticket.entity';
import { TrazaTicket } from './traza-ticket/entities/traza-ticket.entity';
import { Ticket } from './ticket/entities/ticket.entity';
import { EstadoTicket } from './estado-ticket/entities/estado-ticket.entity';
import { FilesTicketModule } from './files-ticket/files-ticket.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
	imports: [TicketModule, TrazaTicketModule, EstadoTicketModule, EncuestaModule,
		ComentariosModule, FilesTicketModule,
		SequelizeModule.forRoot({
			dialect: 'mysql',
			host: 'localhost',
			port: 3306,
			username: 'root',
			password: '.4C3r04dm1n',
			database: 'intranet',
			models: [Ticket, TrazaTicket, EstadoTicket, FilesTicket],
			//autoLoadModels: true,
		}),
		ConfigModule.forRoot(),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
