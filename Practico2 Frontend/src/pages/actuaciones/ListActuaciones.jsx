import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Table,Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavAdminMenu from "../../components/AdminMenu";

const ListActuaciones = () => {
    const [actuaciones, setActuaciones] = useState([]);
    useEffect(() => {
        getActuaciones();
        document.title = "Lista de Actuaciones";
    }, []);
    const getActuaciones = async () => {
        axios.get("http://localhost:3000/actua")
        .then(res => {
            setActuaciones(res.data);
        }).catch(error => {
            console.log(error);
        });
    };
    const eliminarActuacion = (repartoId, peliculaId) => {
        const confirm = window.confirm("¿Estás seguro de eliminar esta actuacion?");
        if (!confirm){
            return;
        }
        axios.delete(`http://localhost:3000/actua/${repartoId}/${peliculaId}`)
        .then(res => {
            console.log(res.data);
            getActuaciones();
        }).catch(error => {
            console.log(error);
        });
    }
    return ( 
        <>
            <NavAdminMenu/>
            <Container className="mt-3 mb-3">
                <Row>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title>Lista de Actuaciones</Card.Title>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Personaje</th>
                                            <th>Actor</th>
                                            <th>Pelicula</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {actuaciones.map((actuacion) => (
                                            <tr key={actuacion.repartoId + actuacion.peliculaId}>
                                                <td>{actuacion.personaje}</td>
                                                <td>{actuacion.reparto.nombre}</td>
                                                <td>{actuacion.pelicula.nombre}</td>
                                                <td>
                                                    <Link to={`/actuaciones/formulario/${actuacion.repartoId}/${actuacion.peliculaId}`} className="btn btn-primary">Editar</Link>
                                                </td>
                                                <td>
                                                    <Button variant="danger" onClick={() => eliminarActuacion(actuacion.repartoId, actuacion.peliculaId)}>Eliminar</Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
     );
}
 
export default ListActuaciones;