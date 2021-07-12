import { IsNotEmpty, IsOptional, IsString, IsNumber } from "class-validator"
export class CreateRespuestaDto {
    // idRespuesta?: number;

    @IsNotEmpty()
    @IsNumber()
    idSegUsuario?: number;

    @IsNotEmpty()
    @IsNumber()
    idPregunta?: number;

    @IsNotEmpty()
    @IsNumber()
    valoracion?: number;

    @IsOptional()
    @IsString()
    valoracion_text?: string;

    @IsOptional()
    @IsNumber()
    idRefServicio?: number;

    @IsOptional()
    estatus?: number;
}
