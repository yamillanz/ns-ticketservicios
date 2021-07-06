import { IsNumber } from 'class-validator';
import { IsString } from 'class-validator';
import { IsOptional } from 'class-validator';
export class CreateEstadoTicketDto {
    // @Column
    // idEstadoTicket: number;


    @IsOptional()
	fechaAlta?: Date ;
	
    @IsString()
    nombre : string; 
	
    @IsString()
    descripcion: string; 
	
    @IsNumber()
    idGerencia: number; 

	@IsNumber()
    orden: number;
    
    @IsNumber()
    @IsOptional()
	accion_adicional?: number;

}
