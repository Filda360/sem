import {MistoData} from "./MistoData";

export interface RezervaceData{

    id: number;
    zacatek: Date;

    konec: Date;

    pocetRybaru: number;

    poznamka: String;

    stavPlatby: boolean;

    misto: MistoData;
}