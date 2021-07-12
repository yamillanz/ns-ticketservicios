import { BelongsTo } from 'sequelize-typescript';
import { ForeignKey, HasOne } from 'sequelize-typescript';
import { AutoIncrement, Column, CreatedAt, Default, PrimaryKey, Table, UpdatedAt,Model } from 'sequelize-typescript';
import { Pregunta } from './pregunta.entity';

@Table({
    tableName: `gen_respuestas_valoracion`
})
export class Respuesta extends Model<Respuesta>{
    @PrimaryKey
	@AutoIncrement
	@Column
	idRespuesta?: number;

	@Column
    idSegUsuario?: number;

	@ForeignKey(() => Pregunta)
	@Column
    idPregunta?: number;
	
	@Column
    valoracion?: number;

	@Column
    valoracion_text?: string;

	@Column
    idRefServicio?: number;

    @CreatedAt
	@Column
	fechaAlta?: Date;

	@Column
	@UpdatedAt
	updateAt?: Date;

	@Default(1)
    @Column
    estatus?: number;

	
	// @HasOne(() => Pregunta)
	@BelongsTo(() => Pregunta)
	pregunta: Pregunta;
}
