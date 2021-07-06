import { PartialType } from '@nestjs/mapped-types';
import { CreateTrazaTicketDto } from './create-traza-ticket.dto';

export class TrazaTicketDto extends PartialType(CreateTrazaTicketDto) {
    nombreEstado?: string;
    Usuario?: string;
}
