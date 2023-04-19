import {EventHandler, useEffect, useState} from "react";
import {Revir} from "../data/Revir";
import axios from "axios";

interface Props{
    onSelectRevir: (revir: Revir) => void
}

function RevirSelect({onSelectRevir}:Props){

    const [reviry, setReviry] = useState<Revir[]>([]);
    const [selected, setSelected] = useState(reviry[0]);

    const getReviry = async () => {
        const backendUrl = "http://localhost:8080/reviry";
        let res = null;
        try{
            res = await axios.get(backendUrl);
        }catch (e: any){
            setReviry([]);
        }
        if (res){
            const reviry = await res.data;
            setReviry(reviry);
        }
    }

    useEffect(()=>{
        getReviry()
    }, [])

    const changeHandler = (event:  React.ChangeEvent<HTMLSelectElement>) => {
        console.log("Revir: " + reviry[parseInt(event.target.value)].nazev);
        onSelectRevir(reviry[parseInt(event.target.value)]);
    }

    return <>
        <h3>Revír</h3>
        <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example" onChange={changeHandler}>
            {reviry.map((revir, index) => (<option key={index} value={index}>{revir.nazev}</option>))}
        </select>
    </>
}

export default RevirSelect
