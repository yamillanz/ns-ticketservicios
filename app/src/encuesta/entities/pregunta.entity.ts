import { Respuesta } from './respuesta.entity';
import { AutoIncrement, Column, CreatedAt, Default, PrimaryKey, Table, UpdatedAt, Model, ForeignKey } from 'sequelize-typescript';

@Table({
    tableName: `gen_preguntas_gerencias`
})
export class Pregunta extends Model<Pregunta>{
    @PrimaryKey
    @AutoIncrement
    @Column
    idPregunta?: number;

    @Column
    descripcion?: string;

    @Column
    idConfigGerencia?: number;

    @CreatedAt
    @Column
    fechaAlta?: Date;

    @ForeignKey(() => Respuesta)
    idRespuesta?: number

    @Column
    @UpdatedAt
    updateAt?: Date;
    
    @Default(1)
    @Column
    estatus?: number;
}
