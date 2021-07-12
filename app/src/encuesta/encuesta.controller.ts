import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from '@nestjs/common';
import { EncuestaService } from './encuesta.service';
import { CreatePreguntaDto } from './dto/create-pregunta.dto';
import { CreateRespuestaDto } from './dto/create-respuesta.dto';
import { UpdatePreguntaDto } from './dto/update-pregunta.dto';
import { UpdateRespuestaDto } from './dto/update-respuesta.dto';

@Controller('api/encuesta')
export class EncuestaController {

	private readonly log: Logger = new Logger('ticket');
	
	constructor(private readonly encuestaService: EncuestaService) { }

	@Post('pregunta')
	createPregunta(@Body() createPreguntaDto: CreatePreguntaDto) {
		this.log.debug(`create pregunta`);
		return this.encuestaService.createPregunta(createPreguntaDto);
	}

	@Post('respuesta')
	createRespuesta(@Body() createRespuestaDto: CreateRespuestaDto) {
		this.log.debug(`create respuesta`);
		return this.encuestaService.createRespuesta(createRespuestaDto);
	}

	@Get('/pregunta/:idGerencia')
	findAllPreguntas(@Param('idGerencia') idGerencia: string) {
		return this.encuestaService.findAllPreguntasPorGerencia(+idGerencia);
	}

	@Get('/respuesta/:idPregunta')
	findAllRespuestaPorPreguntas(@Param('idPregunta') idPregunta: string) {
		return this.encuestaService.findRespuestasPorPregunta(+idPregunta);
	}

	@Get('/respuestasserv/:idRefServicio')
	findRespuestaPorServicio(@Param('idRefServicio') idRefServicio: string) {
		return this.encuestaService.findRespuestaPorServicio(+idRefServicio);
	}

	// @Get(':id')
	// findOne(@Param('id') id: string) {
	// 	return this.encuestaService.findOne(+id);
	// }

	@Patch('pregunta/:id')
	updatePregunta(@Param('id') id: string, @Body() updatePreguntaDto: UpdatePreguntaDto) {
		return this.encuestaService.update(+id, updatePreguntaDto);
	}

	@Patch('respuesta/:id')
	updateRespuesta(@Param('id') id: string, @Body() updateRespuestaDto: UpdateRespuestaDto) {
		return this.encuestaService.update(+id, updateRespuestaDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.encuestaService.remove(+id);
	}
}
