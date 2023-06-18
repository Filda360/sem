import React, { useState } from 'react';
import RevirSelect from "./RevirSelect";
import {RevirData} from "../data/RevirData";
import axios from "axios";
import Cookies from "universal-cookie";

const MistoForm = () => {
    const [formData, setFormData] = useState({
        nazev: '',
        cena: 500,
        maxPocetRybaru: 1,
        popis: '',
        adresaObrazku: '',
    });

    const [revir, setRevir] = useState<RevirData>();

    const cookies = new Cookies();

    function onRevirSelected(revir: RevirData){
        setRevir(revir);
        console.log(revir.id);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const ulozMisto = async () => {
        const backendUrl = "http://localhost:8080/mista";
        let res = null;
        try {
            res = await axios.post(backendUrl,
                {nazev: formData.nazev,
                    popis: formData.popis,
                    cena: formData.cena,
                    maxPocetRybaru: formData.maxPocetRybaru,
                    obrazek: formData.adresaObrazku,
                    revir: {id: revir?.id},
                },{headers: {'Authorization': "Bearer " + cookies.get("JWT")}}
            );
        } catch (e: any) {
            console.log("Error creating misto !");
        }
        if (res) {
            window.location.replace('http://localhost:5173/Mista');
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        ulozMisto();
    };



    return (
        <div className="col-md-5 mx-auto mt-4">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="nazev">Název</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nazev"
                        name="nazev"
                        value={formData.nazev}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="cena">Cena/Noc</label>
                    <input
                        type="number"
                        className="form-control"
                        id="cena"
                        name="cena"
                        onChange={handleChange}
                        defaultValue={500}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="maxPocetRybaru">Maximální počet rybářů</label>
                    <input
                        type="number"
                        className="form-control"
                        id="maxPocetRybaru"
                        name="maxPocetRybaru"
                        max={5}
                        min={1}
                        defaultValue={1}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="popis">Popis</label>
                    <textarea
                        className="form-control"
                        id="popis"
                        name="popis"
                        onChange={handleChange}
                        rows={3}
                        maxLength={200}
                        defaultValue={"Zde popište místo"}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="adresaObrazku">Adresa obrázku</label>
                    <input
                        type="text"
                        className="form-control"
                        id="adresaObrazku"
                        name="adresaObrazku"
                        value={formData.adresaObrazku}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="adresaObrazku">revír</label>
                    <RevirSelect onSelectRevir={onRevirSelected}/>
                </div>
                <button type="submit" className="btn btn-primary m-4">
                    Přidat
                </button>
            </form>
        </div>
    );
};

export default MistoForm;