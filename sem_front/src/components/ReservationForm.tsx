import React, {useEffect, useState} from 'react';
import DatePicker, {registerLocale} from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import cs from 'date-fns/locale/cs';
import {Alert} from "react-bootstrap";
import axios from "axios";
import Cookies from "universal-cookie";

registerLocale('cs', cs);

interface Props{
    idMista: number;
    nazevReviru: String;
    nazevMista: String;
    cenaZaNoc: number;
}

function ReservationForm(props: Props){
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [numberOfFishermen, setNumberOfFishermen] = useState<number>(0);
    const [note, setNote] = useState<string>('');
    const [showAlertSuccess, setShowAlertSuccess] = useState(false);
    const [occupiedDays, setOccupiedDays] = useState<string[]>([]);

    const cookies = new Cookies();

    useEffect(() => {
            getReservedDays();
        }, []
    )

    const handleDateChange = (dates: [Date, Date] | null) => {
        if (dates) {
            const [start, end] = dates;
            if (!isDateRangeOccupied(start, end)) {
                setStartDate(start);
                setEndDate(end);
            } else {
                setStartDate(null);
                setEndDate(null);
            }
        }
    };

    const isDateRangeOccupied = (start: Date, end: Date) => {
        const checkDate = new Date(start);
        while (checkDate <= end) {
            const dateString = checkDate.toISOString().split('T')[0];
            if (occupiedDays.includes(dateString)) {
                return true;
            }
            checkDate.setDate(checkDate.getDate() + 1);
        }
        return false;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(startDate, endDate, numberOfFishermen, note);
        saveReservation();
    };

    const saveReservation = async () => {
        const backendUrl = "http://localhost:8080/rezervace";
        axios.post(backendUrl, {
            zacatek: startDate?.toISOString(),
            konec: endDate?.toISOString(),
            pocet_rybaru: numberOfFishermen,
            poznamka: note,
            uzivatel: {id: cookies.get("user").id},
            misto: {id: props.idMista}
        }, {headers: {'Authorization': "Bearer " + cookies.get("JWT")}}
        )
            .then(function (response) {
                setShowAlertSuccess(true);
            })
            .catch(function (error) {
            });
    }

    const getReservedDays = async () => {
        const backendUrl = "http://localhost:8080/rezervace/misto";
        let res = null;
        try {
            res = await axios.get(backendUrl, {headers: {'Authorization': "Bearer " + cookies.get("JWT")}, params: {misto: props.nazevMista, revir: props.nazevReviru}});
        } catch (e: any) {
            console.log("Chyba pri nacteni obsazenych dni");
        }
        if (res) {
            setOccupiedDays(res.data);
        }
    }

    return (
        <div className="col-md-5 mx-auto">
            {showAlertSuccess && (
                <>
                    <br/>
                    <Alert variant="success">
                        Rezervace byla úspěšně odeslána!
                    </Alert>
                    <button type="submit" className="btn btn-success btn-block mb-4" onClick={() => window.location.replace('http://localhost:5173/MojeRezervace')}>Moje Rezervace</button>
                </>
            )}
            {!showAlertSuccess && (
                <>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <br/>
                            <h3>{props.nazevReviru}</h3>
                            <h3>{props.nazevMista} </h3>
                            <h4>{props.cenaZaNoc} Kč/ Noc</h4>
                        </div>
                        <div className="form-group">
                            <label>Počet rybářů:</label>
                            <input
                                type="number"
                                defaultValue={1}
                                min={1}
                                max={5}
                                onChange={(e) => setNumberOfFishermen(parseInt(e.target.value))}
                                required
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label>Poznámka:</label>
                            <textarea
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                rows={4}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label>Rozsah rezervace:</label>
                            <br/>
                            <DatePicker
                                selected={startDate}
                                onChange={(dates: any) => handleDateChange(dates)}
                                startDate={startDate}
                                endDate={endDate}
                                minDate={new Date()}
                                selectsRange
                                inline
                                required
                                locale="cs"
                                filterDate={(date: Date) => !occupiedDays.includes(date.toISOString().split('T')[0])}
                                className="form-control"
                            />
                        </div>
                        <button type="submit" className="btn btn-success btn-block mb-4">Potvrdit rezervaci</button>
                    </form>
                </>)
            }
        </div>
    );
};

export default ReservationForm;