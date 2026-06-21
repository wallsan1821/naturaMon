import { CriaturaFactory } from '../src/Factories/CriaturaFactory';
import { TipoElemental } from '../src/Habilidade';
import { Tank } from '../src/arquetipos/Tank';
import { Rapida } from '../src/arquetipos/Rapida';
import { Suporte } from '../src/arquetipos/Suporte';

describe('CriaturaFactory', () => {
  const dadosBase = {
    nome: 'Criatura Teste',
    tipo: TipoElemental.Fogo,
    hpMaximo: 100,
    ataqueBase: 30,
    defesaBase: 20,
    velocidade: 40,
  };

  test('cria uma instância de Tank quando o arquétipo é TANK', () => {
    const criatura = CriaturaFactory.CriaCriatura({
      ...dadosBase,
      arquetipo: 'TANK',
    });

    expect(criatura).toBeInstanceOf(Tank);
    expect(criatura.nome).toBe('Criatura Teste');
  });

  test('cria uma instância de Rapida quando o arquétipo é RAPIDA', () => {
    const criatura = CriaturaFactory.CriaCriatura({
      ...dadosBase,
      arquetipo: 'RAPIDA',
    });

    expect(criatura).toBeInstanceOf(Rapida);
    expect(criatura.nome).toBe('Criatura Teste');
  });

  test('cria uma instância de Suporte quando o arquétipo é SUPORTE', () => {
    const criatura = CriaturaFactory.CriaCriatura({
      ...dadosBase,
      arquetipo: 'SUPORTE',
    });

    expect(criatura).toBeInstanceOf(Suporte);
    expect(criatura.nome).toBe('Criatura Teste');
  });

  test('lança erro quando o arquétipo é inválido', () => {
    expect(() =>
      CriaturaFactory.CriaCriatura({
        ...dadosBase,
        arquetipo: 'INVALIDO',
      })
    ).toThrow('não é válido');
  });
});