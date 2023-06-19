import {useEffect, useState} from "react";
import {RevirData} from "../data/RevirData";
import axios from "axios";

interface Props {
    onSelectRevir: (revir: RevirData) => void
}

function RevirSelect({ onSelectRevir }: Props) {
    const [reviry, setReviry] = useState<RevirData[]>([]);

    const getReviry = async () => {
        const backendUrl = "http://localhost:8080/reviry";
        try {
            const res = await axios.get(backendUrl);
            const reviry = res.data;
            setReviry(reviry);
            onSelectRevir(reviry[0]); // Zavolat onSelectRevir s prvním revírem po načtení
        } catch (e: any) {
            setReviry([]);
        }
    }

    useEffect(() => {
        getReviry();
    }, []);

    const changeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onSelectRevir(reviry[parseInt(event.target.value)]);
    }

    return (
        <>
            <select className="form-select form-select-lg mb-4" aria-label=".form-select-lg example"
                    onChange={changeHandler} defaultChecked={true} defaultValue={0}>
                {reviry.map((revir, index) => (<option key={index} value={index}>Revír: {revir.nazev}</option>))}
            </select>
        </>
    );
}

export default RevirSelect;