import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import './MainMenu.css';

const NavMainMenu = () => {
    return ( 
        <Navbar expand="lg" className="custom-navbar"> 
            <Container className="justify-content-center"> 
                <Navbar.Brand href="/spoiledTangerines" className="custom-navbar-brand">Spoiled Tangerines</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto"> 
                        <Link className="nav-link" to={"/spoiledTangerines/peliculas"}>Lista de Peliculas</Link>
                        <Link className="nav-link" to={"/spoiledTangerines/repartos"}>Lista de Reparto</Link>
                        <Link className="nav-link" to={"/peliculas"}>Modo Admin</Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavMainMenu;
