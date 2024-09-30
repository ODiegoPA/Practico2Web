import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavMainMenu from "../../../components/MainMenu";
import { Container, Row, Col, Card } from "react-bootstrap";
import '../mainPage.css'; 

const PeliculaDetail = () => {
    const { id } = useParams();
    const [pelicula, setPelicula] = useState({});
    const [reparto, setReparto] = useState([]);

    useEffect(() => {
        getPelicula();
        getReparto();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getPelicula = async () => {
        axios.get(`http://localhost:3000/pelicula/${id}`)
            .then(res => {
                setPelicula(res.data);
            }).catch(error => {
                console.log(error);
            });
    };

    const getReparto = async () => {
        axios.get(`http://localhost:3000/actua/pelicula/${id}`)
            .then(res => {
                setReparto(res.data);
            }).catch(error => {
                console.log(error);
            });
    };

    return ( 
        <>
            <NavMainMenu />
            <Container fluid className="main-container">
                <Row>
                    <Col md={4} className="text-center">
                        <img 
                            src={`http://localhost:3000/pelicula/${pelicula.id}/foto`} 
                            alt={pelicula.nombre} 
                            className="img-fluid" 
                        />
                    </Col>
                    <Col md={8}>
                        <h2>{pelicula.nombre}</h2>
                        <p>{pelicula.sinopsis}</p>
                        <p>Calificación: {pelicula.calificacion} 🍊</p>
                        <p>Fecha de Lanzamiento: {new Date(pelicula.fechaLanzamiento).toLocaleDateString()}</p>
                        <h5>Trailer:</h5>
                        <iframe 
                            width="100%" 
                            height="395" 
                            src={pelicula.trailerURL} 
                            title="Trailer" 
                            frameBorder="0" 
                            allowFullScreen 
                        />
                        
                    </Col>
                </Row>

                <h3 className="mt-4">Director:</h3>
                <Row>
                    <Col>
                        <Card className="custom-card">
                            <a href={"/spoiledTangerines/reparto/"+pelicula.directorId}>
                            <Card.Img src={`http://localhost:3000/reparto/${pelicula.directorId}/foto`} 
                                alt={pelicula.director?.nombre} 
                                className="custom-card" />
                            </a>
                            <Card.Body>
                                <Card.Title>{pelicula.director?.nombre}</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                
                <h3 className="mt-4">Reparto:</h3>
                <Row >
                    {reparto.map(actor => (
                        <Col md={3} className="mb-3" key={actor.reparto.id}>
                            <Card className="custom-card">
                                <a href={"/spoiledTangerines/reparto/"+actor.reparto.id}>
                                    <Card.Img variant="top" src={`http://localhost:3000/reparto/${actor.reparto.id}/foto`} className="custom-img" />
                                </a>
                                <Card.Body>
                                    <Card.Title>{actor.reparto.nombre}</Card.Title>
                                    <Card.Text>
                                        <strong>Personaje:</strong> {actor.personaje}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
};

export default PeliculaDetail;
