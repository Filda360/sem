import {RevirData} from "./RevirData";

export interface MistoData {

    id: number
    nazev: String
    cena: number
    maxPocetRybaru: number

    popis: String

    obrazek: String;

    revir: RevirData;
}