import React, { useState, ChangeEvent, FormEvent } from 'react';

const ReservationForm = () => {
    const [reservationData, setReservationData] = useState({
        startDate: '',
        endDate: '',
    });

    const occupiedDays = ['2023-06-20', '2023-06-21', '2023-06-22']; // Seznam obsazených dní

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setReservationData({ ...reservationData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Zde můžete provést další akce s odeslanými daty rezervace, například je odeslat na server
        console.log(reservationData);
    };

    return (
        <div className="col-md-5 mx-auto">
            <h1>Formulář rezervace</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="startDate">Začátek rezervace:</label>
                    <input
                        type="date"
                        className="form-control"
                        id="startDate"
                        name="startDate"
                        value={reservationData.startDate}
                        onChange={handleChange}
                        min={new Date().toISOString().split('T')[0]} // Minimální datum je dnešní den
                        max={reservationData.endDate || undefined} // Maximální datum je konec rezervace
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="endDate">Konec rezervace:</label>
                    <input
                        type="date"
                        className="form-control"
                        id="endDate"
                        name="endDate"
                        value={reservationData.endDate}
                        onChange={handleChange}
                        min={reservationData.startDate || new Date().toISOString().split('T')[0]} // Minimální datum je začátek rezervace nebo dnešní den
                        disabled={!reservationData.startDate} // Zakáže pole, dokud není vyplněn začátek rezervace
                        required
                    />
                </div>
                <br/>
                <button type="submit" className="btn btn-success btn-block mb-4">Potvrdit rezervaci</button>
            </form>
        </div>
    );
};

export default ReservationForm;