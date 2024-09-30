import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import NavAdminMenu from "../../components/AdminMenu";
import moment from "moment";

const FormActores = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [nombre, setNombre] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [nacionalidad, setNacionalidad] = useState('');
    const [photo, setPhoto] = useState(null);
    const onChangePhoto = (e) => {
        setPhoto(e.target.files[0]); 
    };

    useEffect(() => {
        if(!id) return;
        getActorById();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const getActorById = () => {
        axios.get(`http://localhost:3000/reparto/${id}`)
        .then((res) => {
            const actor = res.data;
            setNombre(actor.nombre);
            setFechaNacimiento(moment(actor.fechaNacimiento).format('YYYY-MM-DD'));
            setNacionalidad(actor.nacionalidad);
        });
    };

    const guardarActor = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("nombre", nombre);
        formData.append("fechaNacimiento", fechaNacimiento);
        formData.append("nacionalidad", nacionalidad);

        if(photo){
            formData.append("photo", photo);
        }

        if(id){
            axios.put(`http://localhost:3000/reparto/${id}`, formData)
            .then(res => {
                console.log(res.data);
                navigate('/reparto');
            })
            .catch(error => {
                console.log(error);
            });
        } else {
            axios.post('http://localhost:3000/reparto', formData)
            .then(res => {
                console.log(res.data);
                navigate('/reparto');
            })
            .catch(error => {
                console.log(error);
            });
        }
    }

    return ( 
        <>
            <NavAdminMenu/>
            <Container className="mt-3">
                <Row>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title>Formulario de Actores</Card.Title>
                                <Form onSubmit={guardarActor}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Nombre</Form.Label>
                                        <Form.Control required type="text" placeholder="Nombre del actor" value={nombre} onChange={(e) => setNombre(e.target.value)}/>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Fecha de Nacimiento</Form.Label>
                                        <Form.Control required type="date" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)}/>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Nacionalidad</Form.Label>
                                        <Form.Control required type="text" placeholder="Nacionalidad del actor" value={nacionalidad} onChange={(e) => setNacionalidad(e.target.value)}/>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Foto</Form.Label>
                                        <Form.Control type="file" onChange={onChangePhoto}/>
                                    </Form.Group>
                                    <Button variant="primary" type="submit">Guardar</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
     );
};

export default FormActores;
