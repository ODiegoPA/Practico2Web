import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import './PeliculaDetail.css'; 
import NavMainMenu from "../../../components/MainMenu";

const PeliculaList = () => {
    const [peliculas, setPeliculas] = useState([]);

    useEffect(() => {
        getPeliculas();
        document.title = "Spoiled Tangerines";
    }, []);

    const getPeliculas = async () => {
        axios.get("http://localhost:3000/pelicula")
            .then(res => {
                setPeliculas(res.data);
            }).catch(error => {
                console.log(error);
            });
    };

    return ( 
        <>
            <NavMainMenu />
            <Container fluid className="main-container">
                <h1 className="text-center mb-4">Lista de Películas</h1>
                <Row>
                    {peliculas.map(pelicula => (
                        <Col md={3} className="mb-3" key={pelicula.id}>
                                <Card className="custom-card">
                                    <a href={"/spoiledTangerines/pelicula/"+pelicula.id}>
                                    <Card.Img 
                                        variant="top" 
                                        src={`http://localhost:3000/pelicula/${pelicula.id}/foto`} 
                                        alt={pelicula.nombre} 
                                        className="custom-img" 
                                    />
                                    </a>
                                    <Card.Body>
                                        <Card.Title>{pelicula.nombre}</Card.Title>
                                        <Card.Text>
                                            <strong>Director:</strong> {pelicula.director?.nombre}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
}

export default PeliculaList;
