import {MistoData} from "./MistoData";

export interface RezervaceData{
    zacatek: Date;

    konec: Date;

    pocetRybaru: number;

    poznamka: String;

    stav_platby: Boolean;

    misto: MistoData;
}