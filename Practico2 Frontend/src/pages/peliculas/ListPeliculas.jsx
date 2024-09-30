import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Table,Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavAdminMenu from "../../components/AdminMenu";
import moment from "moment";
const ListPeliculas = () => {
    const [ListPeliculas, setPeliculas] = useState([]);
    useEffect(() => {
        getListPeliculas();
        document.title = "Lista de Peliculas";
    }, []);
    const getListPeliculas = async () => {
        axios.get("http://localhost:3000/pelicula")
        .then(res => {
            setPeliculas(res.data);
            
        }).catch(error => {
            console.log(error);
        });
    };
    const eliminarPelicula = (id) => {
        const confirm = window.confirm("¿Estás seguro de eliminar esta pelicula?");
        if (!confirm){
            return;
        }
        axios.delete(`http://localhost:3000/pelicula/${id}`)
        .then(res => {
            console.log(res.data);
            getListPeliculas();
        }).catch(error => {
            console.log(error);
        });
    }
    
    return(
        <>
            <NavAdminMenu />
            <Container className="mt-3 mb-3">
                <Row>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title>Lista de Peliculas</Card.Title>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Titulo</th>
                                            <th>Sinopsis</th>
                                            <th>fechaLanzamiento</th>
                                            <th>Calificacion</th>
                                            <th>Trailer</th>
                                            <th>Director</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ListPeliculas.map((pelicula) => (
                                            <tr key={pelicula.id}>
                                                <td>
                                                    <img src={"http://localhost:3000/pelicula/"+pelicula.id+"/foto" } alt={pelicula.nombre} width="100" ></img>
                                                </td>
                                                <td>{pelicula.nombre}</td>
                                                <td>{pelicula.sinopsis}</td>
                                                <td>{moment(pelicula.fechaLanzamiento).format('DD/MM/YYYY')}</td>
                                                <td>{pelicula.calificacion}</td>
                                                <td>{pelicula.trailerURL}</td>
                                                <td>{pelicula.director.nombre}</td>
                                                <td><Link className="btn btn-primary "  to={"/peliculas/formulario/" + pelicula.id}>Editar</Link></td>
                                                <td><Button variant="danger" onClick={() => { eliminarPelicula(pelicula.id) }}>Eliminar</Button></td>
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
    )

}
export default ListPeliculas;