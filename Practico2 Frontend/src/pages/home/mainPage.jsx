import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import './MainPage.css'; 
import NavMainMenu from "../../components/MainMenu";

const MainPage = () => {
    const [peliculas, setPeliculas] = useState([]);
    const [reparto, setReparto] = useState([]);

    useEffect(() => {
        getPeliculas();
        getReparto();
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

    const getReparto = async () => {
        axios.get("http://localhost:3000/reparto")
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
            <h2>Mejores Calificadas</h2>
            <Link to="/spoiledTangerines/peliculas">
                <Button variant="primary">Ver todas las películas</Button>
            </Link>
            <Row>
                {peliculas.slice(0, 5).map((pelicula) => (
                    <Col key={pelicula.id}className="mt-3">
                        <Card className=" mb-4 custom-card">
                            <a href={"/spoiledTangerines/pelicula/"+pelicula.id}   >
                            <Card.Img 
                                variant="top" 
                                src={"http://localhost:3000/pelicula/"+pelicula.id+"/foto"} 
                                alt={pelicula.nombre} 
                                className="custom-img" 
                            />
                            </a>
                            <Card.Body>
                                <Card.Title>{pelicula.nombre}</Card.Title>
                                <Card.Text>
                                    Director: {pelicula.director.nombre} <br />
                                    Calificación: {pelicula.calificacion}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            

            <h2 className="mt-5">Actores</h2>
            <Link to="/spoiledTangerines/repartos">
                <Button variant="primary">Ver todos los actores</Button>
            </Link>
            <Row>
                {reparto.slice(0, 5).map((actor) => (
                    <Col key={actor.id} className="mt-3" >
                        <Card className="mb-4 custom-card">
                        <a href={"/spoiledTangerines/reparto/"+actor.id}>
                                    <Card.Img 
                                        variant="top" 
                                        src={`http://localhost:3000/reparto/${actor.id}/foto`} 
                                        alt={actor.nombre} 
                                        className="custom-img" 
                                    />
                                    </a>
                            <Card.Body>
                                <Card.Title>{actor.nombre}</Card.Title>
                                <Card.Text>
                                    Nacionalidad: {actor.nacionalidad}
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

export default MainPage;
