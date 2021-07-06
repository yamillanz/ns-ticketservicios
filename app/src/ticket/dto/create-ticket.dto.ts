import { IsAlphanumeric, IsBoolean, IsEmpty, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateTicketDto {

	// @IsDate()
	// @IsOptional()
	// fechaAlta?: Date;


	@IsString()
	@IsNotEmpty()
	descripcion: string;

	@IsString()
	@IsNotEmpty()
	fechaRequerida: Date;

	@IsOptional()
	@IsString()
	fechaEstimada?: Date;

	@IsNumber()
	idEstadoActual: number;

	@IsString()
	estadoActual: string;

	@IsString()
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
	idSegUsuario: number;
	@IsNumber()
	idServiciosGerencias?: number;
	
	@IsNumber()
	idSegUsuarioOrigen?: number;
	
	@IsNumber()
	@IsOptional()
	idEnlace?: number;
	@IsNumber()
	@IsOptional()
	idAssets?: number;
	
	@IsNumber()
	@IsOptional()
	idSegUsuarioAsignado?: number;

	@IsOptional()
	@IsNumber()
	idSolpedCompras?: number;

	@IsNumber()
	estatus?: number;

}
