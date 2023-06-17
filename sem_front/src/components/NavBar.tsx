import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import Cookies from "universal-cookie";

function NavBar() {

    const cookies = new Cookies();

    const onClickOdhlasit = () => {
        cookies.remove("JWT");
        cookies.remove("user");
    }

    return<>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">Domů</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/VytvoritRezervaci">Rezervace mist</Nav.Link>
                        { cookies.get("user") && (<Nav.Link href="/MojeRezervace">Moje rezervace</Nav.Link>)}
                    </Nav>
                    <Nav>
                        {cookies.get("JWT") ? (
                            <>
                                <Nav.Link href="/MojeUdaje">Moje udaje</Nav.Link>
                                <Nav.Link href="/" onClick={onClickOdhlasit}>Odhlásit</Nav.Link>
                            </>
                        ):(
                            <Nav.Link href="/Prihlaseni">Přihlásit se</Nav.Link>
                        )}

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </>
}

export default NavBar