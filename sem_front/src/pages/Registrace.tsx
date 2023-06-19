import UserForm from "../components/UserForm";
import React from "react";
import bcrypt from "bcryptjs";
import {UzivatelData} from "../data/UzivatelData";
import axios from "axios";

const onFormSubmit = (data: UzivatelData) => {
    saveUser(data);
}

const saveUser = async (formData: UzivatelData) => {
    const backendUrl = "http://localhost:8080/uzivatele";
    let res = null;
    try {
        res = await axios.post(backendUrl,
            {jmeno: formData.jmeno,
                prijmeni: formData.prijmeni,
                username: formData.username,
                password: await encodeText(formData.password),
                adresa: formData.adresa,
                email: formData.email,
                telefon: formData.telefon
            }
        );
    } catch (e: any) {
        console.log("Error creating user !");
    }
    if (res) {
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

function Registrace(){
    return <>
            <br/>
        <h1>Registrace uživatele</h1>
    <UserForm onSubmit={onFormSubmit}/>
    </>
}

export default Registrace