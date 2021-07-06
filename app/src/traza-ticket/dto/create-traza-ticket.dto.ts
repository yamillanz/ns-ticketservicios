import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTrazaTicketDto {
    @IsString()
    @IsNotEmpty()
    justificacion?: string;

    @IsNumber()
    @IsNotEmpty()
    idTicketServicio?: number;
    
    @IsNumber()
    @IsNotEmpty()
    idEstadoTicket?: number;
        
    @IsNumber()
    @IsNotEmpty()
    idSegUsuario?: number;

}
