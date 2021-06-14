import { PartialType } from '@nestjs/mapped-types';
import { CreateTrazaTicketDto } from './create-traza-ticket.dto';

export class UpdateTrazaTicketDto extends PartialType(CreateTrazaTicketDto) {}
