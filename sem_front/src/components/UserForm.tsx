import React, {useState} from 'react';
import Cookies from "universal-cookie";
import bcrypt from 'bcryptjs';
import axios from "axios";
import {UzivatelData} from "../data/UzivatelData";

interface Props {
    onSubmit: (data: UzivatelData) => void;
}
function UserForm(props: Props) {

    const cookies = new Cookies();

    const [formData, setFormData] = useState<UzivatelData>({
        firstName: cookies.get("user")?.jmeno,
        lastName: cookies.get("user")?.prijmeni,
        address: cookies.get("user")?.adresa,
        phone: cookies.get("user")?.telefon,
        email: cookies.get("user")?.email,
        username: cookies.get("user")?.username,
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
                            value={formData.firstName}
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
                            value={formData.lastName}
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
                            value={formData.address}
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
                            value={formData.phone}
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
                            value={formData.email}
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
                            value={formData.username}
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