import { IsNotEmpty, IsOptional, IsString, IsNumber } from "class-validator"
export class CreateFilesTicketDto {

    // @IsNumber()
    // @IsOptional()
    // idTsImgsTickets?: string;

    @IsString()
    @IsNotEmpty()
    nombre_imagen?: string;

    @IsString()
    @IsOptional()
    direccion?: string;

    @IsNumber()
    @IsNotEmpty()
    idTicketServicio?: number;

    @IsNumber()
    @IsOptional()
    img?: number;

    @IsString()
    @IsNotEmpty()
    nombre_original?: string;

}
