import { PartialType } from '@nestjs/mapped-types';
import { CreateEstadoTicketDto } from './create-estado-ticket.dto';

export class UpdateEstadoTicketDto extends PartialType(CreateEstadoTicketDto) {}
