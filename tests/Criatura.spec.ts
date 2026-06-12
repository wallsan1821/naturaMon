// Arquivo: tests/Criatura.spec.ts

import { Criatura } from '../src/Criatura';
import { TipoElemental, Habilidade } from '../src/Habilidade';

describe('Regras de Negócio: Classe Criatura', () => {
  
  test('O HP atual não pode ficar negativo ao receber dano letal', () => {
    const monstro = new Criatura('Infernus', TipoElemental.Fogo, 100, 40, 20, 30);
    monstro.receberDano(150);
    expect(monstro.hpAtual).toBe(0);
  });

  test('Uma criatura não pode aprender mais do que 4 habilidades', () => {
    // 1. Cenário
    const monstro = new Criatura('Aqua', TipoElemental.Agua, 100, 30, 30, 40);
    const soco = new Habilidade('Soco', 10, TipoElemental.Normal);

    // 2. Ação: Tentamos ensinar 5 habilidades
    monstro.aprenderHabilidade(soco);
    monstro.aprenderHabilidade(soco);
    monstro.aprenderHabilidade(soco);
    monstro.aprenderHabilidade(soco);
    monstro.aprenderHabilidade(soco); // Essa 5ª não deve entrar!

    // 3. Expectativa: A lista de habilidades deve ter tamanho 4
    expect(monstro.habilidades.length).toBe(4);
  });

});