import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import NavMainMenu from "../../../components/MainMenu";
import '../mainPage.css';

const RepartoDetail = () => {
    const { id } = useParams();
    const [reparto, setReparto] = useState({});
    const [peliculasDirigidas, setPeliculasDirigidas] = useState([]);
    const [peliculas, setPeliculas] = useState([]);

    useEffect(() => {
        getReparto();
        getPeliculas();
        getPeliculasDirigidas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const getReparto = async () => {
        axios.get(`http://localhost:3000/reparto/${id}`)
            .then(res => {
                setReparto(res.data);
            }).catch(error => {
                console.log(error);
            });
    };

    const getPeliculas = async () => {
        axios.get(`http://localhost:3000/pelicula/actor/${id}`)
            .then(res => {
                setPeliculas(res.data);
            }).catch(error => {
                console.log(error);
            });
    };

    const getPeliculasDirigidas = async () => {
        axios.get(`http://localhost:3000/pelicula/director/${id}`)
            .then(res => {
                setPeliculasDirigidas(res.data);
            }).catch(error => {
                console.log(error);
            });
    };

    return (
        <>
            <NavMainMenu />
            <Container fluid className="main-container">
                <h1 className="text-center mb-4">Detalle del Actor</h1>
                <Row className="mb-5">
                    <Col md={4}>
                        <Card className="custom-card">
                            <Card.Img 
                                variant="top" 
                                src={`http://localhost:3000/reparto/${id}/foto`} 
                                alt={reparto.nombre}
                                className="custom-img"  
                            />
                        </Card>
                    </Col>
                    <Col md={8}>
                        <h3>{reparto.nombre}</h3>
                        <p><strong>Fecha de Nacimiento:</strong> {new Date(reparto.fechaNacimiento).toLocaleDateString()}</p>
                        <p><strong>Nacionalidad:</strong> {reparto.nacionalidad}</p>
                    </Col>
                </Row>

                {/* Mostrar películas dirigidas si existen */}
                {peliculasDirigidas.length > 0 && (
                    <>
                        <h2 className="text-center mb-4">Películas Dirigidas</h2>
                        <Row>
                            {peliculasDirigidas.map(pelicula => (
                                <Col md={4} className="mb-3" key={pelicula.id}>
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
                                </Card.Body>
                            </Card>
                                </Col>
                            ))}
                        </Row>
                    </>
                )}

                {/* Mostrar películas actuadas */}
                <h2 className="text-center mb-4">Películas Actuadas</h2>
                <Row>
                    {peliculas.map(pelicula => (
                        <Col md={4} className="mb-3" key={pelicula.id}>
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
                                        <strong>Personaje:</strong> {pelicula.actuaciones[0].personaje}
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

export default RepartoDetail;
