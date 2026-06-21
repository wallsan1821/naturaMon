import { CriaturaRepository } from './repositories/CriaturaRepository';
import { EquipeRepository } from './repositories/EquipeRepository';
import { Equipe } from './Equipe';
import { Habilidade, TipoElemental } from './Habilidade';
import { CalculadoraDano } from './CalculadoraDano';

function mostrarEquipe(nome: string, equipe: Equipe): void {
  console.log(`\n${nome}`);

  equipe.criaturas.forEach((criatura, indice) => {
    const marcador = indice === equipe.indiceAtiva ? '[ATIVA]' : '[BANCO]';

    console.log(
      `${marcador} ${criatura.nome} | Tipo: ${criatura.tipo} | HP: ${criatura.hpAtual}/${criatura.hpMaximo} | Escudo: ${criatura.estaComEscudo}`
    );
  });
}

function atacar(
  atacante: Equipe,
  defensor: Equipe,
  habilidade: Habilidade
): void {
  const criaturaAtacante = atacante.criaturaAtiva;
  const criaturaDefensora = defensor.criaturaAtiva;

  const dano = CalculadoraDano.calcular(
    criaturaAtacante,
    criaturaDefensora,
    habilidade
  );

  criaturaDefensora.receberDano(dano);

  console.log(
    `\n${criaturaAtacante.nome} usou ${habilidade.nome} em ${criaturaDefensora.nome}.`
  );
  console.log(`Dano causado: ${dano}`);
  console.log(
    `HP de ${criaturaDefensora.nome}: ${criaturaDefensora.hpAtual}/${criaturaDefensora.hpMaximo}`
  );
}

console.log('=== DEMO NATURAMON ===');

const criaturaRepository = new CriaturaRepository();
const equipeRepository = new EquipeRepository();

console.log('\nCarregando criaturas do arquivo criaturas_base.json...');

const aquary = criaturaRepository.buscarPorNome('Aquary');
const flamix = criaturaRepository.buscarPorNome('Flamix');
const terron = criaturaRepository.buscarPorNome('Terron');

const hestia = criaturaRepository.buscarPorNome('Hestia');
const perceus = criaturaRepository.buscarPorNome('Perceus');
const vulcanon = criaturaRepository.buscarPorNome('Vulcanon');

if (!aquary || !flamix || !terron || !hestia || !perceus || !vulcanon) {
  throw new Error('Erro ao carregar criaturas da base.');
}

const equipeJogador = new Equipe([aquary, flamix, terron]);
const equipeInimiga = new Equipe([hestia, perceus, vulcanon]);

mostrarEquipe('Equipe do Jogador:', equipeJogador);
mostrarEquipe('Equipe Inimiga:', equipeInimiga);

console.log('\n=== Ataque elemental ===');

const jatoDeAgua = new Habilidade('Jato de Água', 10, TipoElemental.Agua);

atacar(equipeJogador, equipeInimiga, jatoDeAgua);

console.log('\n=== Troca com passiva de Suporte ===');
console.log('Aquary é Suporte. Ao sair, cura a criatura que entra.');

flamix.receberDano(30);
console.log(`Antes da troca, HP de Flamix: ${flamix.hpAtual}/${flamix.hpMaximo}`);

equipeJogador.trocarPara(1, equipeInimiga.criaturaAtiva);

console.log(`Depois da troca, HP de Flamix: ${flamix.hpAtual}/${flamix.hpMaximo}`);
mostrarEquipe('Equipe do Jogador após troca:', equipeJogador);

console.log('\n=== Troca com passiva de Rápida ===');
console.log('Flamix é Rápida. Ao sair, ataca o adversário antes de trocar.');

console.log(
  `Antes da troca, HP de ${equipeInimiga.criaturaAtiva.nome}: ${equipeInimiga.criaturaAtiva.hpAtual}/${equipeInimiga.criaturaAtiva.hpMaximo}`
);

equipeJogador.trocarPara(2, equipeInimiga.criaturaAtiva);

console.log(
  `Depois da troca, HP de ${equipeInimiga.criaturaAtiva.nome}: ${equipeInimiga.criaturaAtiva.hpAtual}/${equipeInimiga.criaturaAtiva.hpMaximo}`
);

mostrarEquipe('Equipe do Jogador após troca:', equipeJogador);

console.log('\n=== Troca com passiva de Tank ===');
console.log('Terron é Tank. Ao sair, aplica escudo na criatura que entra.');

equipeJogador.trocarPara(0, equipeInimiga.criaturaAtiva);

console.log(`Aquary está com escudo? ${aquary.estaComEscudo}`);

console.log('\nInimigo tenta atacar Aquary.');
const golpeDeFogo = new Habilidade('Golpe de Fogo', 10, TipoElemental.Fogo);

atacar(equipeInimiga, equipeJogador, golpeDeFogo);

console.log(
  `Depois do ataque, HP de Aquary: ${aquary.hpAtual}/${aquary.hpMaximo}`
);
console.log(`Aquary ainda está com escudo? ${aquary.estaComEscudo}`);

console.log('\n=== Condição de vitória ===');
console.log('Derrotando todas as criaturas da equipe inimiga...');

equipeInimiga.criaturas.forEach((criatura) => {
  criatura.receberDano(9999);
});

mostrarEquipe('Equipe Inimiga derrotada:', equipeInimiga);

console.log(`Equipe inimiga derrotada? ${equipeInimiga.estaDerrotada()}`);

console.log('\n=== Salvamento ===');

equipeRepository.salvar('jogador_demo', equipeJogador);

console.log('Estado da equipe do jogador salvo em data/saves.');
console.log('\n=== FIM DA DEMO ===');