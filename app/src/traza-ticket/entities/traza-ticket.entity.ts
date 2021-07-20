import { EstadoTicket } from './../../estado-ticket/entities/estado-ticket.entity';
import { Ticket } from './../../ticket/entities/ticket.entity';
import { AutoIncrement, Column, PrimaryKey, CreatedAt, UpdatedAt, Model, ForeignKey, BelongsTo, Table, HasOne, Default } from "sequelize-typescript"


@Table({
    tableName: 'ts_traza_ticket_servicio'
})
export class TrazaTicket extends Model{
    
    
    @AutoIncrement
    @PrimaryKey
    @Column
    idTrazaTicket?: number;

    @CreatedAt
    @Column
    fechaAlta?: Date;

    @Column
    justificacion?: string;

    @ForeignKey(() => Ticket)
    @Column
    idTicketServicio: number;
    @BelongsTo(() => Ticket) ticket: Ticket;
    
    
    @ForeignKey(() => EstadoTicket)
    @Column
    idEstadoTicket: number;
    
    @BelongsTo(() => EstadoTicket) estado: EstadoTicket;
    
    @Column
    idSegUsuario: number;

    @Column
    estadoAnterior?: string;

    @UpdatedAt
    updateAt?: Date;

    @Default(1)
    @Column
    estatus?: number;

    // @HasOne(() => EstadoTicket)
    // estadoTicket: EstadoTicket
}
