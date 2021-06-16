import { IsAlphanumeric, IsBoolean, IsDate, IsEmpty, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateTicketDto {
	// @PrimaryKey
	// @AutoIncrement
	// @Column
	// idTicketServicio: number;

	@IsDate()
    @IsOptional()
	fechaAlta?: Date;
	
	// @UpdatedAt
	// updateAt:  Date;

	@IsString()
    @IsNotEmpty()
	descripcion: string;

	@IsDate()
	fechaRequerida?: Date;

	@IsDate()
	fechaEstimada?: Date;

	@IsNumber()
	idEstadoActual?: number;

	@IsString()
	estadoActual?: string;

	@IsDate()
	fechaEstadoActual?: Date;

	@IsString()
	justificacionEstadoActual?: string;

	// @Column
	// idGerenciaOrigen: number;
	// @Column
	// idGerenciaDestino: number;
	// @Column
	// idSegUsuario: number
	// @Column
	// idServiciosGerencias: number
	// @Column
	// idAssets: number;
	// @Column
	// idSegUsuarioOrigen: number;
	// @Column
	// idEnlace: number;
	// @Column
	// idSegUsuarioAsignado: number;
	@IsNumber()
    @IsNotEmpty()
	idSolpedCompras: number;

}
