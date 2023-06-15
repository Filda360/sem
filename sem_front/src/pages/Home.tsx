import React, {useState} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import {Col, Row} from "react-bootstrap";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from 'date-fns';
import { subDays } from 'date-fns';
import Cookies from "universal-cookie";

function Home(){
    const cookies = new Cookies();

    const [show, setShow] = useState(false);
    const [startDate, setStartDate] = useState(new Date());

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <p>Prostředí okolo soukromého revíru rybník Velké Hrázky nabízí naprostý klid a pohodu. Okolo rybníku roste hustá vegetace, která rybářům poskytuje ty nejlepší podmínky pro odpočinek a pohodový rybolov. Navíc břehy okolo soukromého revíru rybník Velké Hrázky jsou příjemně travnaté a je z nich velice dobrý přístup až k vodě.

                Na soukromém revíru rybník Velké Hrázky si mohou rybáři zachytat za velice příznivé ceny. Na revíru rybník Velké Hrázky mohou rybáři lovit 24 hodin. Návštěvníci tohoto soukromého revíru jistě ocení i řadu dalších příjemných služeb, které zpohodlní celý lov.

                Rybník Velké Hrázky je velice dobře zarybněný. Rybáři tady mohou ulovit celou řadu rybích druhů nejrůznějších velikostí. Na tomto revíru pochopitelně nechybí ani kapitální ryby. Rybáři tady mohou ulovit například nádherné kapry, amury nebo jesetery. Takže už na nic nečekejte a přijeďte si sem zachytat!
            </p>


            <DatePicker
                onChange={(date: Date) => setStartDate(date)}
                excludeDateIntervals={[{start: subDays(new Date(), 5), end: addDays(new Date(), 5) }]}
            />


            <Button variant="primary" onClick={handleShow}>
                Show calendar
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <label>od</label>
                        </Col>
                        <Col>
                            <input type="date" className="form-control"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <label>do</label>
                        </Col>
                        <Col>
                            <input type="date" className="form-control"/>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Home