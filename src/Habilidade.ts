export enum TipoElemental {
  Fogo = 'Fogo',
  Agua = 'Agua',
  Terra = 'Terra',
  Normal = 'Normal',
}

export interface IHabilidade {
  nome: string;
  poderBase: number;
  tipo: TipoElemental;
}
export class Habilidade implements IHabilidade {
  constructor(
    public nome: string,
    public poderBase: number,
    public tipo: TipoElemental
  ) {}
}