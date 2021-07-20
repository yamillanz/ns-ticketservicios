import { EstadoTicket } from './../../estado-ticket/entities/estado-ticket.entity';

import { TrazaTicket } from './../../traza-ticket/entities/traza-ticket.entity';
import { AutoIncrement, BelongsTo, BelongsToMany, Column, CreatedAt, Default, HasMany, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';

@Table({
	tableName: 'ts_ticket_servicio'
})
export class Ticket extends Model {
	@PrimaryKey
	@AutoIncrement
	@Column
	idTicketServicio?: number;

	@CreatedAt
	@Column
	fechaAlta?: Date;

	@UpdatedAt
	updateAt?: Date;

	@Column
	descripcion: string;

	@Column
	fechaRequerida: Date;

	@Column
	fechaEstimada: Date;

	@Column
	idEstadoActual: number;

	@Column
	estadoActual: string;

	@Column
	fechaEstadoActual?: Date;

	@Column
	justificacionEstadoActual: string;

	@Column
	idGerenciaOrigen: number;
	@Column
	idGerenciaDestino: number;
	@Column
	idSegUsuario: number
	@Column
	idServiciosGerencias?: number
	@Column
	idAssets?: number;
	@Column
	idSegUsuarioOrigen: number;



	@Column
	idSegUsuarioAsignado?: number;
	@Column
	idSolpedCompras?: number;

	@Default(1)
	@Column
	estatus: number


	@HasMany(() => TrazaTicket)
	trazas: TrazaTicket[];

}
