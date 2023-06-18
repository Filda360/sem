import React, {useEffect, useState} from "react";
import axios from "axios";
import {RezervaceData} from "../data/RezervaceData";
import Cookies from "universal-cookie";
import {Form} from "react-bootstrap";


function ReservationsList() {
    const cookies = new Cookies();

    const [rezervace, setRezervace] = useState<RezervaceData[]>([]);
    const [backendUrl, setBackendUrl] = useState("http://localhost:8080/rezervace/user");
    const [username, setUserName] = useState("");

    const getRezervace = async (backendUrl: string) => {
        let res = null;
        try {
            res = await axios.get(backendUrl, {headers: {'Authorization': "Bearer " + cookies.get("JWT")}});
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
            getRezervace(backendUrl);
            console.log(backendUrl);
        }, [backendUrl]
    )

    const deleteReservation = async (backendUrl: string, index: number) => {
        let res = null;
        try {
            let url = "";
            if(cookies.get("user").role === "ADMIN"){
                url = "http://localhost:8080/rezervace";
            }else{
                url = "http://localhost:8080/rezervace/user";
            }
            url = url + "/" + `${rezervace[index].id}`;
            res = await axios.delete(url, {headers: {'Authorization': "Bearer " + cookies.get("JWT")}});
        } catch (e: any) {
            console.log("Error deleting reservation")
        }
        if (res) {
            window.location.replace("http://localhost:5173/MojeRezervace");
        }
    }


    function onDeleteReservation(index: number) {
        deleteReservation(backendUrl, index);
    }

    function handleChange(username: string) {
        setUserName(username);
    }

    function handleSubmit() {
        setBackendUrl("http://localhost:8080/rezervace?username=" + username);
    }

    function handleCheckboxChange(index: number) {

    }

    return <>
        {cookies.get("user").role === "ADMIN" &&
            <>
                <div className="form-group col-md-2 mx-auto mt-2">
                    <input
                        type="text"
                        className="form-control"
                        id="nazev"
                        name="nazev"
                        defaultValue={cookies.get("user").username}
                        onChange={(e) => handleChange(e.target.value)}
                        required
                    />
                </div>
                <button onClick={handleSubmit} type="submit" className="btn btn-success btn-block m-2">
                    Vyhledat rezervace uzivatele
                </button>
            </>
        }
        <div className="list-group">
            {rezervace && rezervace.map((rez, index) => (<a href="#" className="list-group-item list-group-item-action" key={index}>
                <h5>
                    {rez.misto.revir.nazev} | {rez.misto.nazev}
                </h5>
                <h5>
                    identifkační číslo: {rez.id}
                </h5>
                <h5>
                    od: {new Date(Date.parse(rez.zacatek.toString())).toLocaleDateString()}
                </h5>
                <h5>
                    do: {new Date(Date.parse(rez.konec.toString())).toLocaleDateString()}
                </h5>
                {
                    cookies.get("user").role === "USER" &&
                    <h5>
                        { rez.stav_platby ? "ZAPLACENO" : "NEZAPLACENO"}
                    </h5>
                }
                {
                    cookies.get("user").role === "ADMIN" &&
                    <input type="checkbox" checked={rez.stav_platby} onChange={() => handleCheckboxChange(index)} />
                }
                <div>
                    <button className="btn btn-danger m-1" onClick={() => onDeleteReservation(index)}>Zrušit</button>
                </div>

            </a>))}
        </div>
    </>
}

export default ReservationsList