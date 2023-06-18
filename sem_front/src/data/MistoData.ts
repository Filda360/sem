import {RevirData} from "./RevirData";

export interface MistoData {

    id: number
    nazev: string
    cena: number
    maxPocetRybaru: number

    popis: string

    obrazek: string;

    revir: RevirData;
}