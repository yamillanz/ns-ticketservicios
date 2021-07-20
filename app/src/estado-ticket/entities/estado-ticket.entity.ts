import { TrazaTicket } from './../../traza-ticket/entities/traza-ticket.entity';
import {AutoIncrement, Column, CreatedAt, Default, PrimaryKey, Table, UpdatedAt, Model, BelongsTo} from "sequelize-typescript"


@Table({
    tableName: `ts_estados_ticket`
})
export class EstadoTicket extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    idEstadoTicket: number;

    @CreatedAt
    @Column
	fechaAlta?: Date ;
	
    @Column
    nombre : string; 
	
    @Column
    descripcion: string; 
	
    @Column
    idGerencia: number; 

	@Column
    orden: number;
    
    @Default(0)
    @Column
	accion_adicional?: number;

    @UpdatedAt
	updateAt?:  Date;

    // @BelongsTo(() => TrazaTicket) traza: TrazaTicket;
}
