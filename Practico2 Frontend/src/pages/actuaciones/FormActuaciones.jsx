import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import NavAdminMenu from "../../components/AdminMenu";

const FormActuaciones = () => {
    const navigate = useNavigate();
    const { repartoId, peliculaId } = useParams();
    const [personaje, setPersonaje] = useState('');
    const [actorId, setActorId] = useState('');
    const [peliculaIdSeleccionado, setPeliculaIdSeleccionado] = useState('');
    const [listaActores, setListaActores] = useState([]);
    const [listaPeliculas, setListaPeliculas] = useState([]);
    const [isEditMode, setIsEditMode] = useState(false);
    useEffect(() => {
        getListaActores();
        getListaPeliculas();
        if (repartoId && peliculaId) {
            setIsEditMode(true);
            getActuacionById();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [repartoId, peliculaId]);

    const getActuacionById = () => {
        axios.get(`http://localhost:3000/actua/${repartoId}/${peliculaId}`)
        .then((res) => {
            const actuacion = res.data;
            setPersonaje(actuacion.personaje);
            setActorId(actuacion.repartoId);
            setPeliculaIdSeleccionado(actuacion.peliculaId);
        })
        .catch(error => {
            console.log(error);
        });
    };

    const getListaActores = () => {
        axios.get(`http://localhost:3000/reparto`)
        .then((res) => {
            setListaActores(res.data);
        })
        .catch(error => {
            console.log(error);
        });
    };

    const getListaPeliculas = () => {
        axios.get(`http://localhost:3000/pelicula`)
        .then((res) => {
            setListaPeliculas(res.data);
        })
        .catch(error => {
            console.log(error);
        });
    };

    const guardarActuacion = (e) => {
        e.preventDefault();
        const actuacionData = {
            personaje: personaje,
            repartoId: actorId,
            peliculaId: peliculaIdSeleccionado
        };

        if (isEditMode) {
            axios.put(`http://localhost:3000/actua/${repartoId}/${peliculaId}`, actuacionData)
            .then(res => {
                console.log(res.data);
                navigate('/actuaciones');
            })
            .catch(error => {
                console.log(error);
            });
        } else {
            axios.post('http://localhost:3000/actua/', actuacionData)
            .then(res => {
                console.log(res.data);
                navigate('/actuaciones');
            })
            .catch(error => {
                console.log(error);
            });
        }
    };

    return (
        <>
            <NavAdminMenu />
            <Container>
                <Row>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title>Formulario de Actuaciones</Card.Title>
                                <Form onSubmit={guardarActuacion}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Personaje</Form.Label>
                                        <Form.Control 
                                            required 
                                            type="text" 
                                            value={personaje} 
                                            onChange={(e) => setPersonaje(e.target.value)} 
                                        />
                                    </Form.Group>
                                    {!isEditMode && (
                                        <>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Actor</Form.Label>
                                                <Form.Select 
                                                    required 
                                                    value={actorId} 
                                                    onChange={(e) => setActorId(e.target.value)}
                                                >
                                                    <option value="">Selecciona un actor</option>
                                                    {listaActores.map((actor) => (
                                                        <option key={actor.id} value={actor.id}>
                                                            {actor.nombre}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Pelicula</Form.Label>
                                                <Form.Select 
                                                    required 
                                                    value={peliculaIdSeleccionado} 
                                                    onChange={(e) => setPeliculaIdSeleccionado(e.target.value)}
                                                >
                                                    <option value="">Selecciona una película</option>
                                                    {listaPeliculas.map((pelicula) => (
                                                        <option key={pelicula.id} value={pelicula.id}>
                                                            {pelicula.nombre}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                            </Form.Group>
                                        </>
                                    )}

                                    <Button variant="primary" type="submit">Guardar</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default FormActuaciones;
