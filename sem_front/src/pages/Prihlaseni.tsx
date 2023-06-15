import React, {useState} from "react";
import Cookies from 'universal-cookie';
import axios from "axios";

function Prihlaseni() {

    const cookies = new Cookies();

    const [formData, setFormData] = useState({username: "", password: ""})


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const getJWT = async () => {
        const backendUrl = "http://localhost:8080/login";
        axios.post(backendUrl, {
            userName: formData.username,
            password: formData.password
        })
            .then(function (response) {
                cookies.set("JWT", response.data.token);
                getUser();
            })
            .catch(function (error) {
            });
    }

    const getUser = async () => {
        const backendUrl = "http://localhost:8080/login/userinfo";
        let res = null;
        try {
            res = await axios.get(backendUrl, {headers: {'Authorization': "Bearer " + cookies.get("JWT")}});
        } catch (e: any) {
            console.log("Error loading user !");
        }
        if (res) {
            const user = await res.data;
            cookies.set("user", user);
            window.location.replace('http://localhost:5173/Home');
        }
    }


    return <>
        <br/>
        <div className="col-md-5 mx-auto">
            <form>
                <div className="form-outline mb-4">
                    <input name="username" onChange={handleChange} type="input" id="form2Example1"
                           className="form-control"/>
                    <label className="form-label" htmlFor="form2Example1">Přihlašovací jméno</label>
                </div>

                <div className="form-outline mb-4">
                    <input name="password" onChange={handleChange} type="password" id="form2Example2"
                           className="form-control"/>
                    <label className="form-label" htmlFor="form2Example2">Heslo</label>
                </div>
                <button type="button" onClick={getJWT} className="btn btn-primary btn-block mb-4">Přihlásit se</button>
            </form>
        </div>
    </>
}

export default Prihlaseni