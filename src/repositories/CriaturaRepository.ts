import * as fs from 'fs';
import * as path from 'path';
import { Criatura } from '../Criatura';
import { CriaturaFactory } from '../Factories/CriaturaFactory';

export class CriaturaRepository {
    private caminhoBase = path.join(__dirname, '../../data/criaturas_base.json');

    public carregarCriaturasBase(): Criatura[] {
        if (!fs.existsSync(this.caminhoBase)) {
            throw new Error(`Ficheiro de criaturas base não encontrado em: ${this.caminhoBase}`);
        }

        const conteudoTexto = fs.readFileSync(this.caminhoBase, 'utf-8');
        const dadosBrutos = JSON.parse(conteudoTexto);
        const criaturasProntas: Criatura[] = dadosBrutos.map((item: any) => {
            return CriaturaFactory.CriaCriatura(item);
        });

        return criaturasProntas;
    }

    
    public buscarPorNome(nome: string): Criatura | undefined {
        return this.carregarCriaturasBase().find(
            (c) => c.nome.toLowerCase() === nome.toLowerCase()
        );
    }

    public buscarPorTipo(tipo: string): Criatura[] {
        return this.carregarCriaturasBase().filter(
            (c) => c.tipo.toLowerCase() === tipo.toLowerCase()
        );
    }
}