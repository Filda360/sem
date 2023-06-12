import React, {useState} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import {Col, Row} from "react-bootstrap";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from 'date-fns';
import { subDays } from 'date-fns';

function Home(){
    const [show, setShow] = useState(false);
    const [startDate, setStartDate] = useState(new Date());

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
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