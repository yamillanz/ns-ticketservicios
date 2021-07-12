import { Module } from '@nestjs/common';
import { EncuestaService } from './encuesta.service';
import { EncuestaController } from './encuesta.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Pregunta } from './entities/pregunta.entity';
import { Respuesta } from './entities/respuesta.entity';

@Module({
  imports:[SequelizeModule.forFeature([Pregunta, Respuesta])],
  controllers: [EncuestaController],
  providers: [EncuestaService]
})
export class EncuestaModule {}
