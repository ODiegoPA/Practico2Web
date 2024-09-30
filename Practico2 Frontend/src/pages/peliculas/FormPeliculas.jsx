import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import NavAdminMenu from "../../components/AdminMenu";
import moment from "moment";

const FormPersona = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [nombre, setNombre] = useState('');
    const [sinopsis, setSinopsis] = useState('');
    const [fechaLanzamiento, setFechaLanzamiento] = useState('');
    const [calificacion, setCalificacion] = useState('');
    const [trailerURL, setTrailer] = useState('');
    const [directorId, setDirectorId] = useState('');
    const [photo, setPhoto] = useState(null);  
    const [listaDirectores, setListaDirectores] = useState([]);

    const onChangePhoto = (e) => {
        setPhoto(e.target.files[0]);  // Asigna el archivo seleccionado al estado "photo"
    };

    useEffect(() => {
        if(!id) return;
        getPeliculaById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        getListaDirectores();
    }, []);

    const getPeliculaById = () => {
        axios.get(`http://localhost:3000/pelicula/${id}`)
        .then((res) => {
            const pelicula = res.data;
            setNombre(pelicula.nombre);
            setSinopsis(pelicula.sinopsis);
            setFechaLanzamiento(moment.utc(pelicula.fechaLanzamiento).format('YYYY-MM-DD'));
            setCalificacion(pelicula.calificacion);
            setTrailer(pelicula.trailerURL);
            setDirectorId(pelicula.director.id);
        });
    };

    const getListaDirectores = () => {
        axios.get(`http://localhost:3000/reparto`)
        .then((res) => {
            setListaDirectores(res.data);
        })
        .catch(error => {
            console.log(error);
        });
    };

    const guardarPelicula = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("nombre", nombre);
        formData.append("sinopsis", sinopsis);
        formData.append("fechaLanzamiento", fechaLanzamiento);
        formData.append("calificacion", calificacion);
        formData.append("trailerURL", trailerURL);
        formData.append("directorId", directorId);
    
        if (photo) {  
            formData.append("photo", photo); 
        }

        if (id) {
            axios.put(`http://localhost:3000/pelicula/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(() => {
                navigate('/peliculas');
            })
            .catch(error => {
                console.error(error);
            });
        } else {
            axios.post(`http://localhost:3000/pelicula`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(() => {
                navigate('/peliculas');
            })
            .catch(error => {
                console.error(error);
            });
        }
    };
    
    return (
        <>
            <NavAdminMenu />
            <Container>
                <Row className="mt-3 mb-3">
                    <Col md={6}>
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    <h2>Formulario Peliculas</h2>
                                </Card.Title>
                                <Form onSubmit={guardarPelicula}>
                                    <Form.Group className="mb-3" controlId="nombre">
                                        <Form.Label>Titulo</Form.Label>
                                        <Form.Control required value={nombre} type="text" onChange={(e) => {
                                                setNombre(e.target.value);
                                            }} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="sinopsis">
                                        <Form.Label>Sinopsis</Form.Label>
                                        <Form.Control required value={sinopsis} as="textarea" onChange={(e) => {
                                                setSinopsis(e.target.value);
                                            }} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="fechaLanzamiento">
                                        <Form.Label>Fecha de Lanzamiento</Form.Label>
                                        <Form.Control required value={fechaLanzamiento} type="date" onChange={(e) => {
                                                setFechaLanzamiento(e.target.value);
                                            }} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="calificacion">
                                        <Form.Label>Calificacion</Form.Label>
                                        <Form.Control required value={calificacion} type="number" onChange={(e) => {
                                                setCalificacion(e.target.value);
                                            }} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="trailer">
                                        <Form.Label>Trailer</Form.Label>
                                        <Form.Control required value={trailerURL} type="text" onChange={(e) => {
                                                setTrailer(e.target.value);
                                            }} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="photo">
                                        <Form.Label>Seleccione una imagen:</Form.Label>
                                        <Form.Control type="file" onChange={onChangePhoto} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="directorId">
                                        <Form.Label>Director</Form.Label>
                                        <Form.Control required value={directorId} as="select" onChange={(e) => {
                                                setDirectorId(e.target.value);
                                            }}>
                                            <option value="">Seleccione un director</option>
                                            {listaDirectores.map((director) => (
                                                <option key={director.id} value={director.id}>{director.nombre}</option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group className="mt-3">
                                        <Button type="submit">Guardar Datos</Button>
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default FormPersona;
