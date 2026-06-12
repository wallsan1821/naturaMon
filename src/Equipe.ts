import { Criatura } from './Criatura';

export class Equipe {
  public criaturas: Criatura[];
  public indiceAtiva: number;

  constructor(criaturas: Criatura[]) {
    if (criaturas.length !== 3) {
      throw new Error('Uma equipe deve ter exatamente 3 criaturas.');
    }

    this.criaturas = criaturas;
    this.indiceAtiva = 0;
  }

  public get criaturaAtiva(): Criatura {
    return this.criaturas[this.indiceAtiva]!;
  }

  public estaDerrotada(): boolean {
    return this.criaturas.every(criatura => criatura.hpAtual === 0);
  }

  public podeTrocarPara(indice: number): boolean {
    if (indice < 0 || indice >= this.criaturas.length) {
      return false;
    }

    if (indice === this.indiceAtiva) {
      return false;
    }

    if (this.criaturas[indice]!.hpAtual === 0) {
      return false;
    }

    return true;
  }

  public trocarPara(indice: number): void {
    if (!this.podeTrocarPara(indice)) {
      throw new Error('Troca inválida.');
    }

    this.indiceAtiva = indice;
  }
}