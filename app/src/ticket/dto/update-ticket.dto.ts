import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { CreateTicketDto } from './create-ticket.dto';

export class UpdateTicketDto extends PartialType(CreateTicketDto) {
    // @IsNumber()
    // @IsNotEmpty()
    @IsOptional()
	idTicketServicio?: number;
}
