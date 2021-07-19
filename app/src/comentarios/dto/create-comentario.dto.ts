import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
export class CreateComentarioDto {
	// idComentario?: number;

	@IsString()
	descripcion?: string;

	@IsNumber()
	@IsNotEmpty()
	idReferencia?: number;

	@IsNumber()
	@IsOptional()
	estatus?: number;

	@IsNumber()
	@IsNotEmpty()
	idSegUsuario?: number;

	nombre_usuario?: string
}
