import { Options } from '@nestjs/common';
import { AutoIncrement, Column, CreatedAt, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';

@Table({
	tableName: 'ts_ticket_servicio'
})
export class Ticket extends Model<Ticket>{
	@PrimaryKey
	@AutoIncrement
	@Column
	idTicketServicio: number;

	@CreatedAt
	@Column
	fechaAlta: Date;
	
	@UpdatedAt
	updateAt:  Date;

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
	fechaEstadoActual: Date;

	@Column
	justificacionEstadoActual: string;

	@Column
	idGerenciaOrigen: number;
	@Column
	idGerenciaDestino: number;
	@Column
	idSegUsuario: number
	@Column
	idServiciosGerencias: number
	@Column
	idAssets: number;
	@Column
	idSegUsuarioOrigen: number;
	@Column
	idEnlace: number;
	@Column
	idSegUsuarioAsignado: number;
	@Column
	idSolpedCompras: number;
}
