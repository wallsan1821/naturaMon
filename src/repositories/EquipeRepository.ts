import * as fs from 'fs';
import * as path from 'path';
import { Equipe } from '../Equipe';

interface EstadoCriatura {
    nome: string;
    hpAtual: number;
    estaComEscudo: boolean;
}


interface EstadoEquipe {
    indiceAtiva: number;
    criaturas: EstadoCriatura[];
    salvoEm: string;
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
        const indiceValido =
            estado.indiceAtiva >= 0 &&
            estado.indiceAtiva < equipe.criaturas.length;
        const criaturaSalvaEstaViva =
            indiceValido && equipe.criaturas[estado.indiceAtiva]!.hpAtual > 0;

        if (criaturaSalvaEstaViva) {
            equipe.indiceAtiva = estado.indiceAtiva;
        } else {
            const indicePrimeiraViva = equipe.criaturas.findIndex(
                (c) => c.hpAtual > 0
            );

            if (indicePrimeiraViva !== -1) {
                equipe.indiceAtiva = indicePrimeiraViva;
            }
        }

        return true;
    }

    public deletar(idEquipe: string): void {
        const caminho = this.caminhoArquivo(idEquipe);
        if (fs.existsSync(caminho)) {
            fs.unlinkSync(caminho);
        }
    }
}