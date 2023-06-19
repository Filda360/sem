import {RevirData} from "../data/RevirData";
import {MistoData} from "../data/MistoData";
import axios from "axios";
import React, {useEffect, useState} from "react";
import Cookies from "universal-cookie";
import {useNavigate} from "react-router-dom";
import {Pagination} from "react-bootstrap";

interface Props {
    revir: RevirData | undefined
}

function MistaList({revir}: Props) {
    const [mista, setMista] = useState<MistoData[]>([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [totalPageNumber, setTotalPageNumber] = useState(0);
    const [sorting, setSorting] = useState("nazev");

    const cookies = new Cookies();

    const navigate = useNavigate();

    const getMista = async (pageNumber: number) => {
        var backendUrl = ""
        if (revir === undefined) {
            backendUrl = "http://localhost:8080/mista";
        } else {
            backendUrl = "http://localhost:8080/mista?revir=" + revir?.nazev + "&page=" + pageNumber + "&sort=" + sorting;
        }
        let res = null;
        try {
            res = await axios.get(backendUrl);
        } catch (e: any) {
            setMista([]);
            setTotalPageNumber(0);
        }
        if (res) {
            const mista = await res.data.mista;
            setMista(mista);
            setTotalPageNumber(res.data.totalPages);
        }
    }

    useEffect(() => {
        getMista(pageNumber);
    }, [pageNumber]);

    useEffect(() => {
        setPageNumber(0);
        getMista(0);
    }, [revir]);

    useEffect(() => {
        setPageNumber(0);
        getMista(0);
    }, [sorting]);

    const clickRezervovatHandler = (index: number) => {
        console.log(mista[index].nazev);
        if (cookies.get("user")) {
            navigate('NovaRezervace', {
                state: {
                    idMista: mista[index].id,
                    nazevMista: mista[index].nazev,
                    cenaZaNoc: mista[index].cena,
                    nazevReviru: mista[index].revir.nazev
                }
            });
        } else {
            window.location.replace('http://localhost:5173/Prihlaseni');
        }

    }

    const handlePreviousPage = () => {
        setPageNumber(prevPageNumber => prevPageNumber - 1);
    };

    const handleNextPage = () => {
        setPageNumber(prevPageNumber => prevPageNumber + 1);
    };

    function changeOrderingHandler(event: React.ChangeEvent<HTMLSelectElement>) {
        setPageNumber(0);
        setSorting(event.target.value);
    }

    function clickSmazatHandler(index: number) {
        deleteReservation(mista[index].id);
    }

    const deleteReservation = async (id: number) => {
        let res = null;
        try {
            const url = "http://localhost:8080/mista" + "/" + `${id}`;
            res = await axios.delete(url, { headers: { 'Authorization': "Bearer " + cookies.get("JWT") } });
        } catch (e: any) {
            console.log("Error deleting misto")
        }
        if (res) {
            window.location.replace("http://localhost:5173/VytvoritRezervaci");
        }
    }

    return <>
        <div>
            <select className="form-select form-select-lg mb-4 w-auto mx-auto" onChange={changeOrderingHandler} aria-label=".form-select-lg example" defaultValue={0}>
                <option key={0} value={"nazev"}>název</option>
                <option key={1} value={"cena"}>cena</option>
                <option key={2} value={"maxPocetRybaru"}>max počet rybářů</option>
            </select>
        </div>
        <div className="row row-cols-1 row-cols-md-2 g-4">
            {mista.map((misto, index) => (
                <div className="col" key={index}>
                    <div className="card h-100">
                        <img src={"https://drive.google.com/uc?export=view&id=" + misto.obrazek}
                             className="card-img-top h-50 rounded-2" alt="obrázek místa"/>
                        <div className="card-body">
                            <h4 className="card-title">{misto.nazev}</h4>
                            <p className="card-text">{misto.popis}</p>
                            <h6 className="card-title">ideálně pro {misto.maxPocetRybaru} rybáře</h6>
                            <h5 className="card-title">{misto.cena} Kč/den</h5>
                        </div>
                        <div className="card-footer">
                            <button className="btn btn-success m-1"
                                    onClick={() => clickRezervovatHandler(index)}>Rezervovat
                            </button>
                            {
                                cookies.get("user")?.role === "ADMIN" &&
                                <button className="btn btn-danger m-1"
                                        onClick={() => clickSmazatHandler(index)}>Ostranit
                                </button>
                            }
                        </div>
                    </div>
                </div>
            ))}
        </div>
        <div className="col-md-1 mx-auto p-4">
            <Pagination>
                <Pagination.Prev onClick={handlePreviousPage} disabled={pageNumber === 0}/>
                <Pagination.Next onClick={handleNextPage}
                                 disabled={pageNumber === totalPageNumber - 1}/> {/* na predposledni strance je tlacitko disabled*/}
            </Pagination>
        </div>
    </>
}

export default MistaList