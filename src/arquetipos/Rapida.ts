// Arquivo: src/arquetipos/Rapida.ts

import { Criatura } from '../Criatura';
import { TipoElemental } from '../Habilidade';

export class Rapida extends Criatura {
  constructor(
    nome: string,
    tipo: TipoElemental,
    hpMaximo: number,
    ataqueBase: number,
    defesaBase: number,
    velocidade: number
  ) {
    super(nome, tipo, hpMaximo, ataqueBase, defesaBase, velocidade + 30);
  }

  public override aoSairDaArena(
    _criaturaEntrando: Criatura,
    criaturaAdversaria: Criatura
  ): void {
    criaturaAdversaria.receberDano(this.ataqueBase);
  }
}