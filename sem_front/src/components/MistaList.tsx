import {RevirData} from "../data/RevirData";
import {MistoData} from "../data/MistoData";
import axios from "axios";
import {useEffect, useState} from "react";

interface Props {
    revir: RevirData | undefined
}

function MistaList({revir}: Props) {
    const [mista, setMista] = useState<MistoData[]>([]);

    const getMista = async () => {
        var backendUrl = ""
        if (revir === undefined) {
            backendUrl = "http://localhost:8080/mista";
        } else {
            backendUrl = "http://localhost:8080/mista?revir=" + revir?.nazev;
        }
        let res = null;
        try {
            res = await axios.get(backendUrl);
        } catch (e: any) {
            setMista([]);
        }
        if (res) {
            const mista = await res.data;
            setMista(mista);
        }
    }

    useEffect(
        () => {
            getMista();
        }, [revir]
    )

    const clickRezervovatHandler = (index: number) => {
        console.log(mista[index].nazev);
    }

    return <>
        <div className="row row-cols-1 row-cols-md-2 g-4">
            {mista.map((misto, index) => (
                <div className="col" key={index}>
                    <div className="card h-100">
                        <img src={"https://drive.google.com/uc?export=view&id=" + misto.obrazek} className="card-img-top" alt="obrázek místa"/>
                        <div className="card-body">
                            <h4 className="card-title">{misto.nazev}</h4>
                            <p className="card-text">{misto.popis}</p>
                            <h5 className="card-title">{misto.cena} Kč/den</h5>
                        </div>
                        <div className="card-footer">
                            <button className="btn btn-success" onClick={() => clickRezervovatHandler(index)}>Rezervovat</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>

    </>
}

export default MistaList