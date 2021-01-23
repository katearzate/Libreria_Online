import React from 'react';
import {Container,Form, FormControl, FormLabel, Button, Alert, Row, Table} from 'react-bootstrap';
import '../../SCSS/otros.scss'
import Popup from 'reactjs-popup';

export default class Almacenes extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            registros: [],
            id_almacen: "",
            nombre: "",
            direccion: "",
            localidad: "",
            provincia: "",
            telefono: "",
            alerta: false,
            msgAlerta: "",
            tipoAlerta: "success",
            open: false,
        };
    }

    componentDidMount(){
        this.fetchRegistros()
    };

    handleChange = (evt) => {
        this.setState({
          [evt.target.name]: evt.target.value,
        });
    };

    fetchRegistros = () => {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        fetch("http://localhost:3001/almacenes", {
          method: "GET",
          headers: headers,
        })
          .then((respuesta) => respuesta.json())
          .then((resultado) => {
            console.log("resultado: ", resultado);
            this.setState({
              registros: resultado.response,
            });
        })
        .catch((error) => console.log("error: ", error));
    };

    addRegistro = () => {
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        var body = JSON.stringify({
            id_editorial: this.state.id_editorial,
            nombre: this.state.nombre,
            direccion: this.state.direccion,
            localidad: this.state.localidad,
            provincia: this.state.provincia,
            telefono: this.state.telefono,
        })
        fetch("http://localhost:3001/almacenes/insert", {        //revisar que efectivamente sea ../insert
            method: "POST",
            headers: headers,
            body: body
        }).then((respuesta) => respuesta.json())
            .then((resultado) => {
                console.log(resultado);     //para verificar que se haya recibido
                this.setState({
                    id_almacen: "",
                    nombre: "",
                    direccion: "",
                    localidad: "",
                    telefono: "",
                    alerta: true,
                    msgAlerta: resultado.response,
                    tipoAlerta: "success",
                });
                this.fetchRegistros();
            });
    };
    
    editRegistro(){

    }

    updateInput(){

    }

    eliminarRegistro() {

    }

/************************************************************************************************************************/

    render(){
      return(
          <div className="main">
            <Container>
            <h1 className="h1">Almacenes</h1>
              {
                this.state.alerta === true ? (
                  <Alert variant={this.state.tipoAlerta} onClose={() => {
                    this.setState({
                      alerta: false,
                    })
                  }} dismissible>
                    <Alert.Heading>{this.state.msgAlerta}</Alert.Heading>
                  </Alert>
                ) : null}
              <Row>
                <Table striped bordered hover size="sm" >
                  <thead>
                    <tr>
                      <th className="align-middle">Nombre</th>
                      <th className="align-middle">Dirección</th>
                      <th className="align-middle">Localidad</th>
                      <th className="align-middle">Provincia</th>
                      <th className="align-middle">Telefono</th>
                      <th className="align-middle" colSpan="2">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.registros.map((item) => {
                      return (
                        <tr onClickCapture={() => this.updateInput(item)} key={item.id_almacen}>
                          <td className="align-middle">{item.nombre}</td>
                          <td className="align-middle">{item.direccion}</td>
                          <td className="align-middle">{item.localidad}</td>
                          <td className="align-middle">{item.provincia}</td>
                          <td className="align-middle">{item.telefono}</td>
                          <td className="align-middle">
                            <Button onMouseEnter={() => {this.setState({hoverBtn1: true})}} 
                                    onMouseLeave={() => {this.setState({hoverBtn1: false})}}
                                    onClick={() => {this.editRegistro(item.id_almacen); this.setState({open: true,});}} variant="info">Actualizar</Button>
                          </td>
                          <td className="align-middle">
                            <Button onMouseEnter={() => {this.setState({hoverBtn1: true})}} 
                                    onMouseLeave={() => {this.setState({hoverBtn1: false})}} 
                                    onClick={() => {this.eliminarRegistro(item.id_almacen)}} variant="danger">Eliminar</Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Row>
            </Container>
            <Button variant="info" onClick={() => {this.setState({open: true,})}}>Añadir almacen</Button>
            <Popup open={this.state.open} onClose={() => {this.setState({open: false,});}} position="center center">
                    <Form onSubmit={this.addRegistro} action="http://localhost:3001/editoriales">
                        <h2>Registro de almacén</h2><hr></hr>
                        <Container className="contenedor-2">
                            <div className="largos">
                                <FormLabel>Nombre:</FormLabel>
                                <FormControl type="text" name="nombre" placeholder="Nombre." onChange={this.handleChange} value={this.state.nombre}  required={true}/>
                                <FormLabel>Dirección:</FormLabel>
                                <FormControl type="text" name="direccion" placeholder="Dirección." onChange={this.handleChange} value={this.state.direccion} />
                                <FormLabel>Teléfono:</FormLabel>
                                <FormControl type="tel" name="telefono" placeholder="Telefono (10 digitos)." onChange={this.handleChange} value={this.state.telefono}/>
                                <FormLabel>Provincia:</FormLabel>
                                <FormControl type="text" name="provincia" placeholder="Provincia" onChange={this.handleChange} value={this.state.provincia}/>
                                <FormLabel>Localidad:</FormLabel>
                                <FormControl type="text" name="localidad" placeholder="Localidad." onChange={this.handleChange} value={this.state.localidad}/>
                            </div>
                        </Container>
                        <Button type="submit" variant="primary" block>
                            Agregar editorial
                        </Button><br></br>
                    </Form>
                </Popup>
            </div>
        );
    }
}