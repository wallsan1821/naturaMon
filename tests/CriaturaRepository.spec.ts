import { CriaturaRepository } from '../src/repositories/CriaturaRepository';
import { TipoElemental } from '../src/Habilidade';
import { Tank } from '../src/arquetipos/Tank';
import { Rapida } from '../src/arquetipos/Rapida';
import { Suporte } from '../src/arquetipos/Suporte';

describe('CriaturaRepository', () => {
  const repository = new CriaturaRepository();

  test('carregarCriaturasBase() carrega as 9 criaturas do JSON', () => {
    const criaturas = repository.carregarCriaturasBase();

    expect(criaturas).toHaveLength(9);
  });

  test('buscarPorNome() encontra uma criatura pelo nome', () => {
    const criatura = repository.buscarPorNome('Flamix');

    expect(criatura).toBeDefined();
    expect(criatura!.nome).toBe('Flamix');
  });

  test('buscarPorNome() ignora diferença entre maiúsculas e minúsculas', () => {
    const criatura = repository.buscarPorNome('flamix');

    expect(criatura).toBeDefined();
    expect(criatura!.nome).toBe('Flamix');
  });

  test('buscarPorTipo() retorna as criaturas do tipo Fogo', () => {
    const criaturasDeFogo = repository.buscarPorTipo('Fogo');

    expect(criaturasDeFogo).toHaveLength(3);
    expect(
      criaturasDeFogo.every(criatura => criatura.tipo === TipoElemental.Fogo)
    ).toBe(true);
  });

  test('as criaturas carregadas são instâncias dos arquétipos corretos', () => {
    const aquary = repository.buscarPorNome('Aquary');
    const flamix = repository.buscarPorNome('Flamix');
    const terron = repository.buscarPorNome('Terron');

    expect(aquary).toBeInstanceOf(Suporte);
    expect(flamix).toBeInstanceOf(Rapida);
    expect(terron).toBeInstanceOf(Tank);
  });
});