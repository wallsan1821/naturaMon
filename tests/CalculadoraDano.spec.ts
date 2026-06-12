// Arquivo: tests/CalculadoraDano.spec.ts

import { CalculadoraDano } from '../src/CalculadoraDano';
import { Criatura } from '../src/Criatura';
import { TipoElemental, Habilidade } from '../src/Habilidade';

describe('Regras de Negócio: Calculadora de Dano', () => {
  
  // Configurando os "atores" do nosso teste
  const monstroFogo = new Criatura('Infernus', TipoElemental.Fogo, 100, 50, 50, 30);
  const monstroTerra = new Criatura('Terrano', TipoElemental.Terra, 100, 50, 50, 30);
  const monstroAgua = new Criatura('Aqua', TipoElemental.Agua, 100, 50, 50, 30);
  
  const ataqueFogo = new Habilidade('Bola de Fogo', 40, TipoElemental.Fogo);

  test('Multiplicador deve ser 2x quando Fogo ataca Terra', () => {
    const mult = CalculadoraDano.obterMultiplicador(TipoElemental.Fogo, TipoElemental.Terra);
    expect(mult).toBe(2);
  });

  test('Multiplicador deve ser 0.5x quando Fogo ataca Água', () => {
    const mult = CalculadoraDano.obterMultiplicador(TipoElemental.Fogo, TipoElemental.Agua);
    expect(mult).toBe(0.5);
  });

  test('Cálculo final de dano aplica o multiplicador e a fórmula corretamente', () => {
    // Fórmula esperada: (Poder 40 * (Ataque 50 / Defesa 50)) * Multiplicador 2 = 80 de dano
    const danoFinal = CalculadoraDano.calcular(monstroFogo, monstroTerra, ataqueFogo);
    expect(danoFinal).toBe(80);
  });

});