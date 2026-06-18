import { Equipe } from '../src/Equipe';
import { Criatura } from '../src/Criatura';
import { TipoElemental } from '../src/Habilidade';
import { Suporte } from '../src/arquetipos/Suporte';
import { Rapida } from '../src/arquetipos/Rapida';
import { Tank } from '../src/arquetipos/Tank';

describe('Regras de Negócio: Troca de Criaturas', () => {
  test('Equipe troca a criatura ativa corretamente', () => {
    const c1 = new Criatura('C1', TipoElemental.Fogo, 100, 30, 20, 30);
    const c2 = new Criatura('C2', TipoElemental.Agua, 100, 30, 20, 30);
    const c3 = new Criatura('C3', TipoElemental.Terra, 100, 30, 20, 30);
    const adversario = new Criatura('Inimigo', TipoElemental.Fogo, 100, 30, 20, 30);

    const equipe = new Equipe([c1, c2, c3]);

    equipe.trocarPara(1, adversario);

    expect(equipe.criaturaAtiva).toBe(c2);
  });

  test('Troca com Suporte cura a criatura que entra', () => {
    const suporte = new Suporte('Suporte', TipoElemental.Agua, 100, 20, 20, 30);
    const entrando = new Criatura('Aliado', TipoElemental.Fogo, 100, 30, 20, 30);
    const reserva = new Criatura('Reserva', TipoElemental.Terra, 100, 30, 20, 30);
    const adversario = new Criatura('Inimigo', TipoElemental.Fogo, 100, 30, 20, 30);

    entrando.receberDano(50);

    const equipe = new Equipe([suporte, entrando, reserva]);

    equipe.trocarPara(1, adversario);

    expect(equipe.criaturaAtiva).toBe(entrando);
    expect(entrando.hpAtual).toBe(70);
  });

  test('Troca com Rapida causa dano no adversário antes de sair', () => {
    const rapida = new Rapida('Rapida', TipoElemental.Fogo, 100, 30, 20, 60);
    const entrando = new Criatura('Aliado', TipoElemental.Agua, 100, 30, 20, 30);
    const reserva = new Criatura('Reserva', TipoElemental.Terra, 100, 30, 20, 30);
    const adversario = new Criatura('Inimigo', TipoElemental.Terra, 100, 30, 20, 30);

    const equipe = new Equipe([rapida, entrando, reserva]);

    equipe.trocarPara(1, adversario);

    expect(equipe.criaturaAtiva).toBe(entrando);
    expect(adversario.hpAtual).toBe(70);
  });

  test('Troca com Tank aplica escudo na criatura que entra', () => {
    const tank = new Tank('Tank', TipoElemental.Terra, 100, 20, 40, 30);
    const entrando = new Criatura('Aliado', TipoElemental.Agua, 100, 30, 20, 30);
    const reserva = new Criatura('Reserva', TipoElemental.Fogo, 100, 30, 20, 30);
    const adversario = new Criatura('Inimigo', TipoElemental.Fogo, 100, 30, 20, 30);

    const equipe = new Equipe([tank, entrando, reserva]);

    equipe.trocarPara(1, adversario);

    expect(equipe.criaturaAtiva).toBe(entrando);
    expect(entrando.estaComEscudo).toBe(true);

    entrando.receberDano(50);

    expect(entrando.hpAtual).toBe(100);
    expect(entrando.estaComEscudo).toBe(false);
  });

  test('Não pode trocar para uma criatura derrotada', () => {
    const c1 = new Criatura('C1', TipoElemental.Fogo, 100, 30, 20, 30);
    const c2 = new Criatura('C2', TipoElemental.Agua, 100, 30, 20, 30);
    const c3 = new Criatura('C3', TipoElemental.Terra, 100, 30, 20, 30);
    const adversario = new Criatura('Inimigo', TipoElemental.Fogo, 100, 30, 20, 30);

    const equipe = new Equipe([c1, c2, c3]);

    c2.receberDano(999);

    expect(() => equipe.trocarPara(1, adversario)).toThrow('Troca inválida.');
  });

  test('Não pode trocar para a própria criatura ativa', () => {
    const c1 = new Criatura('C1', TipoElemental.Fogo, 100, 30, 20, 30);
    const c2 = new Criatura('C2', TipoElemental.Agua, 100, 30, 20, 30);
    const c3 = new Criatura('C3', TipoElemental.Terra, 100, 30, 20, 30);
    const adversario = new Criatura('Inimigo', TipoElemental.Fogo, 100, 30, 20, 30);

    const equipe = new Equipe([c1, c2, c3]);

    expect(() => equipe.trocarPara(0, adversario)).toThrow('Troca inválida.');
  });

  test('Não pode trocar para índice inválido', () => {
    const c1 = new Criatura('C1', TipoElemental.Fogo, 100, 30, 20, 30);
    const c2 = new Criatura('C2', TipoElemental.Agua, 100, 30, 20, 30);
    const c3 = new Criatura('C3', TipoElemental.Terra, 100, 30, 20, 30);
    const adversario = new Criatura('Inimigo', TipoElemental.Fogo, 100, 30, 20, 30);

    const equipe = new Equipe([c1, c2, c3]);

    expect(() => equipe.trocarPara(5, adversario)).toThrow('Troca inválida.');
  });
});