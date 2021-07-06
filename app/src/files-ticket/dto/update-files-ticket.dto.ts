import { PartialType } from '@nestjs/mapped-types';
import { IsNumber } from 'class-validator';
import { CreateFilesTicketDto } from './create-files-ticket.dto';

export class UpdateFilesTicketDto extends PartialType(CreateFilesTicketDto) {
    @IsNumber()
    idTsImgsTickets? :number
}
