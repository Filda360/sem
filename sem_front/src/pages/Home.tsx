
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from 'date-fns';
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';

function Home() {
    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
                <div className="text-center pb-5">
                    <h2>Vítejte na našich stránkách</h2>
                    <p className="lead">
                        Prostředí okolo soukromého revíru rybník Velké Hrázky nabízí naprostý klid a pohodu. Okolo rybníku roste hustá vegetace, která rybářům poskytuje ty nejlepší podmínky pro odpočinek a pohodový rybolov. Navíc břehy okolo soukromého revíru rybník Velké Hrázky jsou příjemně travnaté a je z nich velice dobrý přístup až k vodě.
                    </p>
                    <p className="lead">
                        Na soukromém revíru rybník Velké Hrázky si mohou rybáři zachytat za velice příznivé ceny. Na revíru rybník Velké Hrázky mohou rybáři lovit 24 hodin. Návštěvníci tohoto soukromého revíru jistě ocení i řadu dalších příjemných služeb, které zpohodlní celý lov.
                    </p>
                    <p className="lead">
                        Rybník Velké Hrázky je velice dobře zarybněný. Rybáři tady mohou ulovit celou řadu rybích druhů nejrůznějších velikostí. Na tomto revíru pochopitelně nechybí ani kapitální ryby. Rybáři tady mohou ulovit například nádherné kapry, amury nebo jesetery. Takže už na nic nečekejte a přijeďte si sem zachytat!
                    </p>
                </div>
                <Image src="https://drive.google.com/uc?export=view&id=1OBRSBjmVTaA61HilhwBiWOsZVg6EUj_a" alt="Rybník" fluid className="mb-4" />
            </div>
        </>
    );
}

export default Home;