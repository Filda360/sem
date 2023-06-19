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
        jmeno: "",
        prijmeni: '',
        adresa: '',
        telefon: '',
        email: '',
        username: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const updatedData: UzivatelData = {
            ...formData
        };
        props.onSubmit(updatedData);
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
                            id="firstName"
                            name="firstName"
                            value={cookies.get("user")?.jmeno}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Příjmení</label>
                        <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            name="lastName"
                            value={cookies.get("user")?.prijmeni}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Adresa</label>
                        <input
                            type="text"
                            className="form-control"
                            id="address"
                            name="address"
                            value={cookies.get("user")?.adresa}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Telefon</label>
                        <input
                            type="text"
                            className="form-control"
                            id="phone"
                            name="phone"
                            value={cookies.get("user")?.telefon}
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
                            value={cookies.get("user")?.email}
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
                            value={cookies.get("user")?.username}
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
                            value={formData.password}
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