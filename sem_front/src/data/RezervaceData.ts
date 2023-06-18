import {MistoData} from "./MistoData";

export interface RezervaceData{

    id: number;
    zacatek: Date;

    konec: Date;

    pocetRybaru: number;

    poznamka: String;

    stav_platby: boolean;

    misto: MistoData;
}