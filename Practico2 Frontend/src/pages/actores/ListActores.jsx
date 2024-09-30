import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Table,Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavAdminMenu from "../../components/AdminMenu";
import moment from "moment";

const ListActores = () => {
    const [actores, setActores] = useState([]);
    useEffect(() => {
        getActores();
        document.title = "Lista de Reparto";
    }, []);
    const getActores = async () => {
        axios.get("http://localhost:3000/reparto")
        .then(res => {
            setActores(res.data);
        }).catch(error => {
            console.log(error);
        });
    };
    const eliminarActor = (id) => {
        const confirm = window.confirm("¿Estás seguro de eliminar este actor?");
        if (!confirm){
            return;
        }
        axios.delete(`http://localhost:3000/reparto/${id}`)
        .then(res => {
            console.log(res.data);
            getActores();
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
                                <Card.Title>Lista de Reparto</Card.Title>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Nombre</th>
                                            <th>Fecha de Nacimiento</th>
                                            <th>Nacionalidad</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {actores.map((actor) => (
                                            <tr key={actor.id}>
                                                <td>
                                                <img src={"http://localhost:3000/reparto/" + actor.id+"/foto"} alt={actor.nombre} width="50" />
                                                </td>
                                                <td>{actor.nombre}</td>
                                                <td>{moment(actor.fechaNacimiento).format('DD/MM/YYYY')}</td>
                                                <td>{actor.nacionalidad}</td>
                                                <td><Link className="btn btn-primary" to={"/reparto/formulario/"+actor.id}>Editar</Link></td>
                                                <td><Button variant="danger" onClick={() => eliminarActor(actor.id)}>Eliminar</Button></td>
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
 
export default ListActores;