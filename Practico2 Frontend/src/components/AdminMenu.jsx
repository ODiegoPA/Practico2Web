import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavAdminMenu = () => {
    return(
        <Navbar bg="light" expand="lg">
        <Container>
        <Navbar.Brand href="/spoiledTangerines">Spoiled Tangerines</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <NavDropdown title="Peliculas" id="peliculas-nav-dropdown">
                    <Link className="dropdown-item" to={"/peliculas"}>Lista de Peliculas</Link>
                    <Link className="dropdown-item" to={"/peliculas/formulario"}>Crear Pelicula</Link>
                </NavDropdown>
                <NavDropdown title="Reparto" id="actores-nav-dropdown">
                    <Link className="dropdown-item" to={"/reparto"}>Lista de Reparto</Link>
                    <Link className="dropdown-item" to={"/reparto/formulario"}>Crear Reparto</Link>
                </NavDropdown>
                <NavDropdown title="Actuaciones" id="actuaciones-nav-dropdown">
                    <Link className="dropdown-item" to={"/actuaciones"}>Lista de Actuaciones</Link>
                    <Link className="dropdown-item" to={"/actuaciones/formulario"}>Crear Actuacion</Link>
                </NavDropdown>
                <Nav className="ml-auto"> 
                        <Link className="nav-link" to={"/spoiledTangerines"}>Modo User</Link>
                </Nav>
            </Nav>
        </Navbar.Collapse>
        
        </Container>
    </Navbar>
    );
}

export default NavAdminMenu;
