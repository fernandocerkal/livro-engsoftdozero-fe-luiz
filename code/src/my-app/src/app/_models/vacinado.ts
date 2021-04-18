import { Dose } from './dose';

export class Vacinado {
    identificador: number;    
    cpf: string;
    rg: string;
    dataHora: Date;
    dose: Dose;
}