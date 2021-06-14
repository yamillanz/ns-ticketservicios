import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TicketModule } from './ticket/ticket.module';
import { TrazaTicketModule } from './traza-ticket/traza-ticket.module';
import { EncuestaModule } from './encuesta/encuesta.module';
import { ComentariosModule } from './comentarios/comentarios.module';

@Module({
  imports: [TicketModule, TrazaTicketModule, EncuestaModule, ComentariosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
