import { IsAlphanumeric, IsBoolean, IsDate, IsEmpty, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateTicketDto {

	// @IsDate()
	// @IsOptional()
	// fechaAlta?: Date;


	@IsString()
	@IsNotEmpty()
	descripcion: string;

	@IsDate()
	@IsNotEmpty()
	fechaRequerida: Date;

	@IsDate()
	fechaEstimada: Date;

	@IsNumber()
	idEstadoActual: number;

	@IsString()
	estadoActual: string;

	@IsDate()
	fechaEstadoActual?: Date;

	@IsString()
	justificacionEstadoActual?: string;

	@IsNumber()
	@IsNotEmpty()
	idGerenciaOrigen: number;
	@IsNumber()
	@IsNotEmpty()
	idGerenciaDestino: number;

	@IsNumber()
	@IsNotEmpty()
	idSegUsuario: number
	@IsNumber()
	idServiciosGerencias?: number
	@IsNumber()
	idAssets?: number;

	@IsNumber()
	idSegUsuarioOrigen?: number;
	@IsNumber()
	idEnlace?: number;
	@IsNumber()
	idSegUsuarioAsignado?: number;

	@IsNumber()
	@IsNotEmpty()
	idSolpedCompras?: number;

	@IsNumber()
	estatus?: number;

}
