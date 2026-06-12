// Arquivo: src/arquetipos/Tank.ts

import { Criatura } from '../Criatura';
import { TipoElemental } from '../Habilidade';

export class Tank extends Criatura {
  constructor(
    nome: string,
    tipo: TipoElemental,
    hpMaximo: number,
    ataqueBase: number,
    defesaBase: number,
    velocidade: number
  ) {
    super(
      nome,
      tipo,
      Math.floor(hpMaximo * 1.5),
      ataqueBase,
      Math.floor(defesaBase * 1.5),
      velocidade - 20
    );
  }

  public override aoSairDaArena(
    criaturaEntrando: Criatura,
    _criaturaAdversaria: Criatura
  ): void {
    criaturaEntrando.aplicarEscudo();
  }
}