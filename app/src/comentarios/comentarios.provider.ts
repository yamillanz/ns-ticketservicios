import { Comentario } from "./entities/comentario.entity";

export const comentarioProviders = [
    {
        provide: 'COMENTARIO_REPOSITORY',
        useValue: Comentario
    },
];