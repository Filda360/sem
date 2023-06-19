import React, {useState} from 'react';
import Cookies from "universal-cookie";
import {UzivatelData} from "../data/UzivatelData";

interface Props {
    onSubmit: (data: UzivatelData) => void;
}
function UserForm(props: Props) {

    const cookies = new Cookies();

    const [formData, setFormData] = useState<UzivatelData>({
        id: 0,
        jmeno: cookies.get("user") ? cookies.get("user").jmeno: "",
        prijmeni: cookies.get("user") ? cookies.get("user").prijmeni: "",
        adresa: cookies.get("user") ? cookies.get("user").adresa: "",
        telefon: cookies.get("user") ? cookies.get("user").telefon: "",
        email: cookies.get("user") ? cookies.get("user").email: "",
        username: cookies.get("user") ? cookies.get("user").username: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        console.log(formData);
        e.preventDefault();
        props.onSubmit(formData);
    };


    return (
        <>
            <div className="col-md-5 mx-auto">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="firstName">Jméno</label>
                        <input
                            type="text"
                            className="form-control"
                            id="jmeno"
                            name="jmeno"
                            defaultValue={cookies.get("user")?.jmeno}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Příjmení</label>
                        <input
                            type="text"
                            className="form-control"
                            id="prijmeni"
                            name="prijmeni"
                            defaultValue={cookies.get("user")?.prijmeni}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Adresa</label>
                        <input
                            type="text"
                            className="form-control"
                            id="adresa"
                            name="adresa"
                            defaultValue={cookies.get("user")?.adresa}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Telefon</label>
                        <input
                            type="text"
                            className="form-control"
                            id="telefon"
                            name="telefon"
                            defaultValue={cookies.get("user")?.telefon}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">E-mail</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            defaultValue={cookies.get("user")?.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Uživatelské jméno</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            name="username"
                            defaultValue={cookies.get("user")?.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Heslo</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            defaultValue={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <br/>
                    <button type="submit" className="btn btn-success btn-block mb-4">{cookies.get("user") ? "Uložit" : "Zaregistrovat"}</button>
                </form>
            </div>
        </>
    );
};

export default UserForm;