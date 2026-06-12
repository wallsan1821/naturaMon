import { Equipe } from '../src/Equipe';
import { Criatura } from '../src/Criatura';
import { TipoElemental } from '../src/Habilidade';

describe('Regras de Negócio: Equipe 3v3', () => {
  function criarCriatura(nome: string): Criatura {
    return new Criatura(nome, TipoElemental.Fogo, 100, 40, 20, 30);
  }

  test('Uma equipe deve ter exatamente 3 criaturas', () => {
    const c1 = criarCriatura('C1');
    const c2 = criarCriatura('C2');

    expect(() => new Equipe([c1, c2])).toThrow('Uma equipe deve ter exatamente 3 criaturas.');
  });

  test('A primeira criatura começa como ativa', () => {
    const c1 = criarCriatura('C1');
    const c2 = criarCriatura('C2');
    const c3 = criarCriatura('C3');

    const equipe = new Equipe([c1, c2, c3]);

    expect(equipe.criaturaAtiva).toBe(c1);
  });

  test('A equipe só é derrotada quando todas as criaturas chegam a 0 de HP', () => {
    const c1 = criarCriatura('C1');
    const c2 = criarCriatura('C2');
    const c3 = criarCriatura('C3');

    const equipe = new Equipe([c1, c2, c3]);

    c1.receberDano(999);
    c2.receberDano(999);

    expect(equipe.estaDerrotada()).toBe(false);

    c3.receberDano(999);

    expect(equipe.estaDerrotada()).toBe(true);
  });

  test('Pode trocar para uma criatura viva do banco', () => {
    const c1 = criarCriatura('C1');
    const c2 = criarCriatura('C2');
    const c3 = criarCriatura('C3');

    const equipe = new Equipe([c1, c2, c3]);

    equipe.trocarPara(1);

    expect(equipe.criaturaAtiva).toBe(c2);
  });

  test('Não pode trocar para uma criatura derrotada', () => {
    const c1 = criarCriatura('C1');
    const c2 = criarCriatura('C2');
    const c3 = criarCriatura('C3');

    const equipe = new Equipe([c1, c2, c3]);

    c2.receberDano(999);

    expect(() => equipe.trocarPara(1)).toThrow('Troca inválida.');
  });
});