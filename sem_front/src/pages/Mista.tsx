import ReservationsOffer from "../components/ReservationsOffer";
import Cookies from "universal-cookie";
import React from "react";


function Mista(){
    const cookies = new Cookies();

    return <>
        {cookies.get("user")?.role === "ADMIN" &&
            <button type="submit" onClick={() => {window.location.replace("http://localhost:5173/PridatMisto")}} className="btn btn-success btn-block m-4">Přidat místo</button>
        }
    <ReservationsOffer/>
    </>
}

export default Mista