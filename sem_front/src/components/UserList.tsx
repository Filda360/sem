import React, {useEffect, useState} from "react";
import {UzivatelData} from "../data/UzivatelData";
import axios from "axios";
import Cookies from "universal-cookie";


function UserList(){
    const [uzivatele, setUzivatele] = useState<UzivatelData[]>([]);

    const cookies = new Cookies();

    useEffect(
        () => {
            getUzivatele();
        }, []
    )

    const getUzivatele = async () => {
        let res = null;
        try {
            const url = "http://localhost:8080/uzivatele";
            res = await axios.get(url, {headers: {'Authorization': "Bearer " + cookies.get("JWT")}});
        } catch (e: any) {
            setUzivatele([]);
        }
        if (res) {
            const uz = await res.data;
            setUzivatele(uz);
        }
    }

    const deleteUzivatel = async (id: number) => {
        let res = null;
        try {
            let url = "http://localhost:8080/uzivatele";
            url = url + "/" + `${id}`;
            res = await axios.delete(url, {headers: {'Authorization': "Bearer " + cookies.get("JWT")}});
        } catch (e: any) {
            console.log("Error deleting reservation")
        }
        if (res) {
            window.location.replace("http://localhost:5173/Uzivatele");
        }
    }

    function onDeleteUser(index: number) {
        deleteUzivatel(uzivatele[index].id);
    }

    return<>
        <div className="list-group pt-2">
            {uzivatele && uzivatele.map((uzivatel, index) => (<a href="#" className="list-group-item list-group-item-action" key={index}>
                <h5>
                    identifikator: {uzivatel.id}
                </h5>
                <h5>
                    {uzivatel.username}
                </h5>
                <div>
                    <button className="btn btn-danger m-1" onClick={() => onDeleteUser(index)}>Zrušit</button>
                </div>
            </a>))}
        </div>
    </>
}

export default UserList