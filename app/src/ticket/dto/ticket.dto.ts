import { CreateTrazaTicketDto } from '../../traza-ticket/dto/create-traza-ticket.dto';
import { PartialType } from "@nestjs/mapped-types";
import { IsAlphanumeric, IsBoolean, IsDate, IsEmpty, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { CreateTicketDto } from "./create-ticket.dto";

export class TicketDto extends PartialType(CreateTicketDto) {
    @IsNumber()
    idTicketServicio?: number;

    gerenciaOrigen?: string;
    gerenciaDestino?: string;
    estado_actual_accion_adic?: number;
    orden?: number;
    orden_mod?: number;
    tipo_servicio? : string;

    trazas?: CreateTrazaTicketDto[];
}

