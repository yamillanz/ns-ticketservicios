import { Comentario } from './entities/comentario.entity';
import { forwardRef, Module } from '@nestjs/common';
import { ComentariosService } from './comentarios.service';
import { ComentariosController } from './comentarios.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { comentarioProviders } from './comentarios.provider';
import { HttpModule } from '@nestjs/common/http';
import { TicketModule } from 'src/ticket/ticket.module';

@Module({
	imports: [
		SequelizeModule.forFeature([Comentario]),
		HttpModule,
		forwardRef(() => TicketModule),
	],
	controllers: [ComentariosController],
	providers: [
		ComentariosService,
		...comentarioProviders,
	]
})
export class ComentariosModule { }
