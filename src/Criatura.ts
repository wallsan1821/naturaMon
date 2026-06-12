// Arquivo: src/Criatura.ts

import { TipoElemental, Habilidade } from './Habilidade';

export class Criatura {
  public hpAtual: number;
  public habilidades: Habilidade[] = [];
  public estaComEscudo: boolean = false;

  constructor(
    public nome: string,
    public tipo: TipoElemental,
    public hpMaximo: number,
    public ataqueBase: number,
    public defesaBase: number,
    public velocidade: number
  ) {
    this.hpAtual = hpMaximo;
  }

  public aprenderHabilidade(novaHabilidade: Habilidade): void {
    if (this.habilidades.length < 4) {
      this.habilidades.push(novaHabilidade);
    }
  }

  public receberDano(dano: number): void {
    if (this.estaComEscudo) {
      this.estaComEscudo = false;
      return;
    }

    this.hpAtual -= dano;

    if (this.hpAtual < 0) {
      this.hpAtual = 0;
    }
  }

  public curar(quantidade: number): void {
    this.hpAtual += quantidade;

    if (this.hpAtual > this.hpMaximo) {
      this.hpAtual = this.hpMaximo;
    }
  }

  public aplicarEscudo(): void {
    this.estaComEscudo = true;
  }

  public aoSairDaArena(
    _criaturaEntrando: Criatura,
    _criaturaAdversaria: Criatura
  ): void {
    // Criatura comum não possui passiva ao sair.
  }
}