import { IsNumberString } from "class-validator";

export class LastCommentParams {
    @IsNumberString()
    idSegUsuario : number;

    @IsNumberString()
    idTicketServicio : number;
}