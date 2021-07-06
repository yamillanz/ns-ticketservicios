import { AutoIncrement, Column, CreatedAt, Default, PrimaryKey, Table, UpdatedAt,Model } from 'sequelize-typescript';

@Table({
	tableName: `ts_imgs_ticket_servicio`
})
export class FilesTicket extends Model<FilesTicket> {
	@PrimaryKey
	@AutoIncrement
	@Column
	idTsImgsTickets?: number;

	@Column
	nombre_imagen?: string;

	@Column
	direccion?: string;

	@Column
	idTicketServicio?: number;

	@Column
	img?: number;

	@Default(1)
	@Column
	estatus?: number;

	@CreatedAt
	@Column
	fechaAlta?: Date;

	@Column
	@UpdatedAt
	updateAt?: Date;

	@Column
	nombre_original?: string;
}
