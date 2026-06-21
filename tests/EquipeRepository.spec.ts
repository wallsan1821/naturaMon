import * as fs from 'fs';
import * as path from 'path';
import { EquipeRepository } from '../src/repositories/EquipeRepository';
import { Equipe } from '../src/Equipe';
import { Criatura } from '../src/Criatura';
import { TipoElemental } from '../src/Habilidade';

describe('EquipeRepository: persistência do estado da equipe', () => {
  const repo = new EquipeRepository();
  const idTeste = 'jest-teste';

  // Caminho real do arquivo de save, usado só para inspeção nos testes
  const caminhoSave = path.join(
    __dirname,
    '../data/saves',
    `equipe_${idTeste}.json`
  );

  function criarCriatura(nome: string): Criatura {
    return new Criatura(nome, TipoElemental.Fogo, 100, 40, 20, 30);
  }

  function montarEquipe(): Equipe {
    return new Equipe([
      criarCriatura('C1'),
      criarCriatura('C2'),
      criarCriatura('C3'),
    ]);
  }

  // Garante que não sobra save de uma execução anterior
  beforeEach(() => {
    repo.deletar(idTeste);
  });

  afterEach(() => {
    repo.deletar(idTeste);
  });

  test('salvar() cria o arquivo de save no disco', () => {
    const equipe = montarEquipe();

    repo.salvar(idTeste, equipe);

    expect(fs.existsSync(caminhoSave)).toBe(true);
  });

  test('carregar() restaura o hpAtual salvo', () => {
    const equipe = montarEquipe();
    equipe.criaturas[0]!.receberDano(35);

    repo.salvar(idTeste, equipe);

    const equipeRecarregada = montarEquipe(); // HP cheio de novo
    const sucesso = repo.carregar(idTeste, equipeRecarregada);

    expect(sucesso).toBe(true);
    expect(equipeRecarregada.criaturas[0]!.hpAtual).toBe(65);
  });

  test('carregar() restaura o estaComEscudo salvo', () => {
    const equipe = montarEquipe();
    equipe.criaturas[1]!.aplicarEscudo();

    repo.salvar(idTeste, equipe);

    const equipeRecarregada = montarEquipe();
    repo.carregar(idTeste, equipeRecarregada);

    expect(equipeRecarregada.criaturas[1]!.estaComEscudo).toBe(true);
  });

  test('carregar() restaura o indiceAtiva salvo', () => {
    const equipe = montarEquipe();
    equipe.trocarPara(2);

    repo.salvar(idTeste, equipe);

    const equipeRecarregada = montarEquipe();
    repo.carregar(idTeste, equipeRecarregada);

    expect(equipeRecarregada.indiceAtiva).toBe(2);
  });

  test('carregar() NÃO reativa uma criatura que estava nocauteada no save', () => {
    const equipe = montarEquipe();
    equipe.criaturas[0]!.receberDano(999); // C1 morre, indiceAtiva continua 0

    repo.salvar(idTeste, equipe);

    const equipeRecarregada = montarEquipe();
    repo.carregar(idTeste, equipeRecarregada);

    // A criatura no índice 0 está com hpAtual 0 -> não pode ser a ativa
    expect(equipeRecarregada.criaturas[0]!.hpAtual).toBe(0);
    expect(equipeRecarregada.indiceAtiva).not.toBe(0);
  });

  test('carregar() retorna false quando não existe save para o id', () => {
    const equipe = montarEquipe();

    const sucesso = repo.carregar('id-inexistente-12345', equipe);

    expect(sucesso).toBe(false);
  });

  test('deletar() remove o arquivo de save do disco', () => {
    const equipe = montarEquipe();
    repo.salvar(idTeste, equipe);
    expect(fs.existsSync(caminhoSave)).toBe(true);

    repo.deletar(idTeste);

    expect(fs.existsSync(caminhoSave)).toBe(false);
  });
});