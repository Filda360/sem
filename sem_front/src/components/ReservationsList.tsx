import {useEffect, useState} from "react";
import {MistoData} from "../data/MistoData";
import axios from "axios";
import {RezervaceData} from "../data/RezervaceData";

function ReservationsList(){
    const [rezervace, setRezervace] = useState<RezervaceData[]>([]);
    const getRezervace = async () => {
        const backendUrl = "http://localhost:8080/rezervace";
        let res = null;
        try {
            res = await axios.get(backendUrl);
        } catch (e: any) {
            setRezervace([]);
        }
        if (res) {
            const rezervace = await res.data;
            setRezervace(rezervace);
        }
    }

    useEffect(
        () => {
            getRezervace();
        }, []
    )


    return<>
        <div className="list-group">
            {rezervace.map((rez, index) => (<a href="#" className="list-group-item list-group-item-action" key={index}>
                <h5>
                    {rez.misto.revir.nazev} | {rez.misto.nazev}
                </h5>
                <h5>
                    od: {new Date(Date.parse(rez.zacatek.toString())).toLocaleDateString()}
                </h5>
                <h5>
                    do: {new Date(Date.parse(rez.konec.toString())).toLocaleDateString()}
                </h5>
                <button className="btn btn-danger">Zrušit</button>
                </a>))}
        </div>
    </>
}

export default ReservationsList