import UserForm from "../components/UserForm";
import {UzivatelData} from "../data/UzivatelData";
import axios from "axios";
import bcrypt from "bcryptjs";
import Cookies from "universal-cookie";
import React from "react";

const onFormSubmit = (data: UzivatelData) => {
    updateUser(data);
}

const cookies = new Cookies();

const updateUser = async (formData: UzivatelData) => {
    const backendUrl = "http://localhost:8080/uzivatele";
    let res = null;
    try {
        res = await axios.put(backendUrl,
            {jmeno: formData.jmeno,
                prijmeni: formData.prijmeni,
                username: formData.username,
                password: await encodeText(formData.password),
                adresa: formData.adresa,
                email: formData.email,
                telefon: formData.telefon
            },
            {headers: {'Authorization': "Bearer " + cookies.get("JWT")}}
        );
    } catch (e: any) {
        console.log("Error upadting user !");
    }
    if (res) {
        cookies.remove("user");
        cookies.remove("JWT");
        window.location.replace('http://localhost:5173/Prihlaseni');
    }
}

const hashText = async (text: string): Promise<string> => {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(text, salt);
    return hash;
};

const encodeText = async (text: string) => {
    try {
        const encodedText = await hashText(text);
        return encodedText;
    } catch (error) {
        console.error('Chyba při zakódování textu:', error);
    }
};

function MojeUdaje(){
    return <>
        <br/>
        <h1>Údaje uživatele</h1>
        <UserForm onSubmit={onFormSubmit}/>
    </>
}

export default MojeUdaje