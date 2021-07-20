import { Injectable } from '@nestjs/common';
import { CreatePreguntaDto } from './dto/create-pregunta.dto';
import { UpdatePreguntaDto } from './dto/update-pregunta.dto';
import { CreateRespuestaDto } from './dto/create-respuesta.dto';
import { UpdateRespuestaDto } from './dto/update-respuesta.dto';
import { Pregunta } from './entities/pregunta.entity';
import { Respuesta } from './entities/respuesta.entity';
import { InjectModel } from '@nestjs/sequelize';
import { ModelCtor } from 'sequelize-typescript';

@Injectable()
export class EncuestaService {
	//@InjectModel(TrazaTicket) private readonly trazaRepo: typeof TrazaTicket
	constructor(
		@InjectModel(Pregunta) private readonly preguntasRepo: ModelCtor<Pregunta>, //typeof Pregunta,
		@InjectModel(Respuesta) private readonly respuestasRepo: ModelCtor<Respuesta>, //typeof Respuesta
	) { }

	createPregunta(createPregunstaDto: CreatePreguntaDto) {
		return 'This action adds a new encuesta';
	}

	async createRespuesta(createRespuestaDto: CreateRespuestaDto) {
		try {
			let newRespuesta: Respuesta = new Respuesta();
			Object.assign(newRespuesta, createRespuestaDto);
			return await newRespuesta.save();
		} catch (error) {
			console.log(error);
			return error;
		}
	}

	findAll() {
		return `This action returns all encuesta`;
	}

	async findAllPreguntasPorGerencia(idConfigGerencia: number) {
		return await this.preguntasRepo.findAll({ where: { idConfigGerencia } })
	}


	async findRespuestasPorPregunta(idPregunta: number) {
		try {
			return await this.respuestasRepo.findAll({
				where: { idPregunta },
				include: { model: Pregunta }
			})
		} catch (error) {
			console.log(error);
			return error;
		}

		// this.preguntasRepo.findAll({ where: { idPregunta } })
	}

	// $app->get('/api/respuestasserv/{idRefServicio}', function(Request $request, Response $response){
	// 	$id = $request->getAttribute('idRefServicio');
	// 	$consulta = "SELECT re.*,
	// 				(SELECT descripcion FROM gen_preguntas_gerencias ger 
	// 				WHERE ger.idPregunta = re.idPregunta) desc_pregunta
	// 			 FROM gen_respuestas_valoracion re 
	// 			 WHERE idRefServicio = $id";
	async findRespuestaPorServicio(idRefServicio : number){
		try {
			return await this.respuestasRepo.findAll({
				where: { idRefServicio },
				include: { model: Pregunta }
			})
		} catch (error) {
			console.log(error);
			return error;
		}
	}

	findOne(id: number) {
		return `This action returns a #${id} encuesta`;
	}

	update(id: number, updatePreguntaDto: UpdatePreguntaDto) {
		return `This action updates a #${id} encuesta`;
	}

	remove(id: number) {
		return `This action removes a #${id} encuesta`;
	}
}
