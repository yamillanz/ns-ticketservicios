import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TicketModule } from './ticket/ticket.module';
import { TrazaTicketModule } from './traza-ticket/traza-ticket.module';
import { EncuestaModule } from './encuesta/encuesta.module';
import { ComentariosModule } from './comentarios/comentarios.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Ticket } from './ticket/entities/ticket.entity';

@Module({
	imports: [TicketModule, TrazaTicketModule, EncuestaModule, ComentariosModule,
		SequelizeModule.forRoot({
			dialect: 'mysql',
			host: 'localhost',
			port: 3306,
			username: 'root',
			password: '.4C3r04dm1n',
			database: 'intranet',
			models: [Ticket],
			// autoLoadModels: true,
		})
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
