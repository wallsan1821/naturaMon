// Arquivo: tests/Arquetipos.spec.ts

import { Criatura } from '../src/Criatura';
import { TipoElemental } from '../src/Habilidade';
import { Suporte } from '../src/arquetipos/Suporte';
import { Rapida } from '../src/arquetipos/Rapida';
import { Tank } from '../src/arquetipos/Tank';

describe('Regras de Negócio: Arquétipos e Passivas', () => {
  test('Suporte cura a criatura que entra ao sair da arena', () => {
    const suporte = new Suporte('Curandeiro', TipoElemental.Agua, 100, 20, 20, 30);
    const entrando = new Criatura('Aliado', TipoElemental.Fogo, 100, 30, 20, 30);
    const adversario = new Criatura('Inimigo', TipoElemental.Terra, 100, 30, 20, 30);

    entrando.receberDano(50);

    suporte.aoSairDaArena(entrando, adversario);

    expect(entrando.hpAtual).toBe(70);
  });

  test('Suporte não cura acima do HP máximo', () => {
    const suporte = new Suporte('Curandeiro', TipoElemental.Agua, 100, 20, 20, 30);
    const entrando = new Criatura('Aliado', TipoElemental.Fogo, 100, 30, 20, 30);
    const adversario = new Criatura('Inimigo', TipoElemental.Terra, 100, 30, 20, 30);

    entrando.receberDano(10);

    suporte.aoSairDaArena(entrando, adversario);

    expect(entrando.hpAtual).toBe(100);
  });

  test('Rápida causa dano ao adversário ao sair da arena', () => {
    const rapida = new Rapida('Veloz', TipoElemental.Fogo, 100, 30, 20, 60);
    const entrando = new Criatura('Aliado', TipoElemental.Agua, 100, 30, 20, 30);
    const adversario = new Criatura('Inimigo', TipoElemental.Terra, 100, 30, 20, 30);

    rapida.aoSairDaArena(entrando, adversario);

    expect(adversario.hpAtual).toBe(70);
  });

  test('Tank aplica escudo na criatura que entra ao sair da arena', () => {
    const tank = new Tank('Defensor', TipoElemental.Terra, 100, 20, 40, 30);
    const entrando = new Criatura('Aliado', TipoElemental.Agua, 100, 30, 20, 30);
    const adversario = new Criatura('Inimigo', TipoElemental.Fogo, 100, 30, 20, 30);

    tank.aoSairDaArena(entrando, adversario);

    entrando.receberDano(50);

    expect(entrando.hpAtual).toBe(100);
    expect(entrando.estaComEscudo).toBe(false);
  });

  test('Tank possui HP e defesa maiores, mas velocidade menor', () => {
    const tank = new Tank('Defensor', TipoElemental.Terra, 100, 20, 40, 30);

    expect(tank.hpMaximo).toBe(150);
    expect(tank.defesaBase).toBe(60);
    expect(tank.velocidade).toBe(10);
  });

  test('Rápida possui velocidade aumentada', () => {
    const rapida = new Rapida('Veloz', TipoElemental.Fogo, 100, 30, 20, 60);

    expect(rapida.velocidade).toBe(90);
  });
});