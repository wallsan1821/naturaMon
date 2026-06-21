import { Criatura } from '../Criatura';
import { Tank } from '../arquetipos/Tank';
import { Rapida } from '../arquetipos/Rapida';
import { Suporte } from '../arquetipos/Suporte';

export class CriaturaFactory{
    public static CriaCriatura(dados: any): Criatura{
        const {nome, tipo,hpMaximo, ataqueBase, defesaBase, velocidade} = dados;

        switch(dados.arquetipo){
            case 'TANK':
                return new Tank(nome,tipo,hpMaximo,ataqueBase,defesaBase,velocidade);

            case 'RAPIDA':
                return new Rapida(nome,tipo,hpMaximo,ataqueBase,defesaBase,velocidade);

            case 'SUPORTE':
                return new Suporte(nome,tipo,hpMaximo,ataqueBase,defesaBase,velocidade);

            default:
                throw new Error(`O arquétipo '${dados.arquetipo}' não é válido ou reconhecido.`);
                
        }
    }
}