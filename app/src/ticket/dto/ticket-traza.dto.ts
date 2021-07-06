import { CreateTrazaTicketDto } from './../../traza-ticket/dto/create-traza-ticket.dto';
import { PartialType } from "@nestjs/mapped-types";
import { IsAlphanumeric, IsBoolean, IsDate, IsEmpty, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { CreateTicketDto } from "./create-ticket.dto";

export class TicketTrazaDto  extends PartialType(CreateTicketDto) {

	@IsNumber()
	idTicketServicio: number;

	trazas?: CreateTrazaTicketDto[];

}

