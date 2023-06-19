import UserForm from "../components/UserForm";
import React, {useState} from "react";
import bcrypt from "bcryptjs";
import {UzivatelData} from "../data/UzivatelData";
import axios from "axios";


function Registrace() {
    const [errorMessage, setErrorMessage] = useState("");
    const [successsMessage, setSuccessMessage] = useState("");

    const onFormSubmit = (data: UzivatelData) => {
        saveUser(data);
    }

    const saveUser = async (formData: UzivatelData) => {
        const backendUrl = "http://localhost:8080/uzivatele";
        let res = null;
        try {
            res = await axios.post(backendUrl,
                {
                    jmeno: formData.jmeno,
                    prijmeni: formData.prijmeni,
                    username: formData.username,
                    password: await encodeText(formData.password),
                    adresa: formData.adresa,
                    email: formData.email,
                    telefon: formData.telefon
                }
            );
        } catch (e: any) {
            setErrorMessage("Chyba při registraci. Uživatel se zadaným Přihlašovacím jménem již existuje !");
        }
        if (res) {
            setSuccessMessage("Registrace proběhla úspěšně !");
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

    return <>
        <br/>
        <div className="col-md-5 mx-auto">
            {errorMessage && (
                <div className="alert alert-danger" role="alert">
                    {errorMessage}
                </div>
            )}</div>
        <div className="col-md-5 mx-auto">
            {successsMessage && (
                <>
                    <div className="alert alert-success" role="alert">
                        {successsMessage}
                    </div>
                    <button type="submit" onClick={() => {window.location.replace("http://localhost:5173/Prihlaseni")}} className="btn btn-success btn-block mb-4">přihlásit se</button>
                </>
            )}</div>
        {successsMessage === "" &&(<>
            <h1>Registrace uživatele</h1>
            <UserForm onSubmit={onFormSubmit}/>
        </>)
        }
    </>
}

export default Registrace