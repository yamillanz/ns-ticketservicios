import { Ticket } from './../../ticket/entities/ticket.entity';
import { AutoIncrement, BelongsTo, Column, CreatedAt, Default, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
	tableName: `comentarios_ts`
})
export class Comentario extends Model<Comentario>{
	@PrimaryKey
	@AutoIncrement
	@Column
	idComentario?: number;

	@CreatedAt
	@Column
	fechaAlta?: Date;

	@Column
	descripcion?: string;

	@ForeignKey(() => Ticket)
	@Column
	idReferencia?: number;

	@Default(1)
	@Column
	estatus?: number;

	@Column
	updatedAt?: Date;

	@Column
	idSegUsuario?: number;

	@BelongsTo(() => Ticket)
	ticket?: Ticket;

}
