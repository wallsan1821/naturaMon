// Arquivo: src/CalculadoraDano.ts

import { TipoElemental, Habilidade } from './Habilidade';
import { Criatura } from './Criatura';

export class CalculadoraDano {
  
  public static obterMultiplicador(tipoAtaque: TipoElemental, tipoDefesa: TipoElemental): number {
    if (tipoAtaque === TipoElemental.Agua && tipoDefesa === TipoElemental.Fogo) return 2;
    if (tipoAtaque === TipoElemental.Fogo && tipoDefesa === TipoElemental.Terra) return 2;
    if (tipoAtaque === TipoElemental.Terra && tipoDefesa === TipoElemental.Agua) return 2;

    if (tipoAtaque === TipoElemental.Fogo && tipoDefesa === TipoElemental.Agua) return 0.5;
    if (tipoAtaque === TipoElemental.Terra && tipoDefesa === TipoElemental.Fogo) return 0.5;
    if (tipoAtaque === TipoElemental.Agua && tipoDefesa === TipoElemental.Terra) return 0.5;

    return 1;
  }

  public static calcular(atacante: Criatura, defensor: Criatura, habilidade: Habilidade): number {
    const multiplicador = this.obterMultiplicador(habilidade.tipo, defensor.tipo);
    
    const danoBruto = (habilidade.poderBase * atacante.ataqueBase) / defensor.defesaBase;
    
    return Math.floor(danoBruto * multiplicador); 
  }
}