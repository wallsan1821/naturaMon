import * as fs from 'fs';
import * as path from 'path';
import { Equipe } from '../Equipe';

/** Formato serializado de uma criatura dentro do save. */
interface EstadoCriatura {
    nome: string;
    hpAtual: number;
    estaComEscudo: boolean;
}

/** Formato do arquivo de save de uma equipe. */
interface EstadoEquipe {
    indiceAtiva: number;
    criaturas: EstadoCriatura[];
    salvoEm: string; // ISO 8601
}

export class EquipeRepository {
    private diretorioSaves = path.join(__dirname, '../../data/saves');

    private garantirDiretorio(): void {
        if (!fs.existsSync(this.diretorioSaves)) {
            fs.mkdirSync(this.diretorioSaves, { recursive: true });
        }
    }

    private caminhoArquivo(idEquipe: string): string {
        const idSanitizado = idEquipe.replace(/[^a-zA-Z0-9_-]/g, '_');
        return path.join(this.diretorioSaves, `equipe_${idSanitizado}.json`);
    }

    /**
     * Passo 4: Salva o estado atual de uma equipe (HP, escudo e índice ativo).
     * Os stats base (ataque, defesa, velocidade etc.) não são salvos aqui —
     * eles continuam vindo do criaturas_base.json via Factory.
     *
     * @param idEquipe Identificador único para o save (ex: "jogador1")
     * @param equipe   Instância da Equipe a ser persistida
     */
    public salvar(idEquipe: string, equipe: Equipe): void {
        this.garantirDiretorio();

        const estado: EstadoEquipe = {
            indiceAtiva: equipe.indiceAtiva,
            criaturas: equipe.criaturas.map((c) => ({
                nome: c.nome,
                hpAtual: c.hpAtual,
                estaComEscudo: c.estaComEscudo,
            })),
            salvoEm: new Date().toISOString(),
        };

        const caminho = this.caminhoArquivo(idEquipe);
        fs.writeFileSync(caminho, JSON.stringify(estado, null, 2), 'utf-8');
    }

    /**
     * Restaura o estado salvo aplicando hpAtual, estaComEscudo e indiceAtiva
     * a uma Equipe já instanciada (cujas criaturas vieram da Factory).
     *
     * Fluxo correto: CriaturaFactory cria -> Equipe é montada -> este método
     * restaura o estado salvo por cima.
     *
     * @param idEquipe Identificador do save
     * @param equipe   Equipe já montada, que receberá o estado salvo
     * @returns true se um save foi encontrado e aplicado, false caso contrário
     */
    public carregar(idEquipe: string, equipe: Equipe): boolean {
        const caminho = this.caminhoArquivo(idEquipe);

        if (!fs.existsSync(caminho)) {
            return false;
        }

        const conteudo = fs.readFileSync(caminho, 'utf-8');
        const estado: EstadoEquipe = JSON.parse(conteudo);

        for (const estadoCriatura of estado.criaturas) {
            const instancia = equipe.criaturas.find(
                (c) => c.nome === estadoCriatura.nome
            );

            if (instancia) {
                instancia.hpAtual = estadoCriatura.hpAtual;
                instancia.estaComEscudo = estadoCriatura.estaComEscudo;
            }
        }

        // Caso ideal: o índice salvo é válido e a criatura ali ainda está viva.
        const indiceValido =
            estado.indiceAtiva >= 0 &&
            estado.indiceAtiva < equipe.criaturas.length;
        const criaturaSalvaEstaViva =
            indiceValido && equipe.criaturas[estado.indiceAtiva]!.hpAtual > 0;

        if (criaturaSalvaEstaViva) {
            equipe.indiceAtiva = estado.indiceAtiva;
        } else {
            // Fallback: a criatura que estava ativa no momento do save morreu
            // (ou o índice salvo é inválido). Como ela não pode voltar a ser
            // a ativa, procuramos a primeira criatura viva da equipe.
            const indicePrimeiraViva = equipe.criaturas.findIndex(
                (c) => c.hpAtual > 0
            );

            if (indicePrimeiraViva !== -1) {
                equipe.indiceAtiva = indicePrimeiraViva;
            }
            // Se nenhuma criatura estiver viva, a equipe está derrotada —
            // isso é tratado por equipe.estaDerrotada() em outra parte do jogo.
        }

        return true;
    }

    /** Remove o save de uma equipe (ex: ao fim da partida). */
    public deletar(idEquipe: string): void {
        const caminho = this.caminhoArquivo(idEquipe);
        if (fs.existsSync(caminho)) {
            fs.unlinkSync(caminho);
        }
    }
}