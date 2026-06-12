// Arquivo: src/arquetipos/Suporte.ts

import { Criatura } from '../Criatura';
import { TipoElemental } from '../Habilidade';

export class Suporte extends Criatura {
  constructor(
    nome: string,
    tipo: TipoElemental,
    hpMaximo: number,
    ataqueBase: number,
    defesaBase: number,
    velocidade: number
  ) {
    super(nome, tipo, hpMaximo, ataqueBase, defesaBase, velocidade);
  }

  public override aoSairDaArena(
    criaturaEntrando: Criatura,
    _criaturaAdversaria: Criatura
  ): void {
    const cura = Math.floor(criaturaEntrando.hpMaximo * 0.2);
    criaturaEntrando.curar(cura);
  }
}