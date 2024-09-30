import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import './RepartoList.css'; 
import NavMainMenu from "../../../components/MainMenu";

const RepartoList = () => {
    const [repartos, setRepartos] = useState([]);

    useEffect(() => {
        getRepartos();
        document.title = "Spoiled Tangerines";
    }, []);

    const getRepartos = async () => {
        axios.get("http://localhost:3000/reparto")
            .then(res => {
                setRepartos(res.data);
            }).catch(error => {
                console.log(error);
            });
    };

    return ( 
        <>
            <NavMainMenu />
            <Container fluid className="main-container">
                <h1 className="text-center mb-4">Lista de Actores</h1>
                <Row>
                    {repartos.map(actor => (
                        <Col md={3} className="mb-3" key={actor.id}>
                                <Card className="custom-card">
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
                                    </Card.Body>
                                </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
}

export default RepartoList;
