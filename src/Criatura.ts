// Arquivo: src/Criatura

import { TipoElemental, Habilidade } from './Habilidade';

export class Criatura {
  public hpAtual: number;
  public habilidades: Habilidade[] = []; 

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
    this.hpAtual -= dano;
    if (this.hpAtual < 0) {
      this.hpAtual = 0; 
    }
  }
}