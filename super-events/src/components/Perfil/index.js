import React, { Component } from 'react';
import firebase from '../../firebase';
import { tsImportEqualsDeclaration } from '@babel/types';
import { FaFileUpload, FaThumbsDown } from "react-icons/fa";
import { Container, Row, Col, Button, Input, Label, Progress } from 'reactstrap'
import { FaRegImage } from "react-icons/fa";
class Perfil extends Component {

    constructor(props) {
        super(props);
        this.state = {
            foto: null,
            nome: '',
            cpf: '',
            fotoOld: '',
            nomeOld: '',
            cpfOld: '',
            email: firebase.getCurrent(),
            uid: firebase.getCurrentUid()
        }
        this.alterar = this.alterar.bind(this)
        this.salvar = this.salvar.bind(this)
        this.cancelar = this.cancelar.bind(this)
        this.controlaTela = this.controlaTela.bind(this)
        this.update = this.update.bind(this)
        this.handleFile = this.handleFile.bind(this)
        this.handleUpload = this.handleUpload.bind(this)
    }

    async componentDidMount() {

        let elements = document.getElementsByClassName('edit')
        elements[0].disabled = true //Input Name
        elements[1].disabled = true //Input CPF
        elements[2].disabled = true //Button Salvar
        elements[3].disabled = true //Button Cancelar

        firebase.getUserName((info) => {
            localStorage.nome = info.val().nome
            localStorage.cpf = info.val().cpf
            localStorage.foto = info.val().foto
            this.setState({ nome: localStorage.nome, foto: localStorage.foto, cpf: localStorage.cpf })
        })
    }

    update = async () => {
        let users = firebase.app.ref('usuarios');

        try {
            await users.child(this.state.uid).update({
                nome: this.state.nome,
                cpf: this.state.cpf
            })
            this.setState(this.state)
            alert("Seus dados foram salvos com sucesso!")
        } catch (error) {
            alert("Ocorreu um erro ao alterar seus dados!")
        }
    }

    salvar(e) {
        this.controlaTela(e)
        this.update()
    }

    cancelar(e) {
        this.controlaTela(e)
        this.setState({
            nome: this.state.nomeOld,
            cpf: this.state.cpfOld
        })
    }

    alterar(e) {
        this.controlaTela(e)
        this.state.nomeOld = this.state.nome
        this.state.cpfOld = this.state.cpf
        this.state.fotoOld = this.state.foto
    }

    controlaTela(cond) {
        let elements = document.getElementsByClassName('edit')
        elements[0].disabled = !cond //Input Nome
        elements[1].disabled = !cond //Input CPF
        elements[2].disabled = !cond //Button Salvar
        elements[3].disabled = !cond //Button Cancelar
        elements[4].disabled = cond  //Button Alterar
    }


    handleFile = async (e) => {

        if (e.target.files[0]) {
            const image = e.target.files[0];

            if (image.type === "image/png" || image.type === "image/jpeg") {
                await this.setState({ imagem: image });
                this.handleUpload();
            } else {
                alert('Envie uma imagem do tipo PNG ou JPEG');
                this.setState({ imagem: null });
                return null;
            }
        }
    }

    handleUpload = async () => {
        const { imagem } = this.state;
        const currentUid = firebase.getCurrentUid();
        const uploadTask = firebase.storage
            .ref(`images/${currentUid}/${imagem.name}`)
            .put(imagem);

        await uploadTask.on('state_changed',
            (snapshot) => {
                //Progress
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                this.setState({ progress: progress });
            },
            (error) => {
                //Error
                console.log('Error imagem: ' + error);
            },
            () => {
                //Sucessful
                firebase.storage.ref(`images/${currentUid}`)
                    .child(imagem.name)
                    .getDownloadURL()
                    .then(url => {
                        this.setState({ foto: url });
                    })

            })
    }

    render() {

        return (
            <div>
                <Container className="mx-auto">
                    <Row className="mt-5">
                        <Col xs='12' sm='12' md='12' lg='12'>
                            <h5 id="title">Meu Perfil</h5>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs='12' sm='12' md='12' lg='12'>
                            <Row>
                                <img className='rounded-circle my-1 mx-auto' width='200px' height='200px' src={this.state.foto} />
                            </Row>
                            <Row>
                                <Button className="mx-auto rounded-circle"
                                    onClick={this.handleFile}  type="file">
                                    <FaRegImage />
                                </Button>
                                    <Progress animated color="success" value={this.state.progress} max="100" />
                            </Row>
                            <Row>
                                {/* <Label for='nome' className='w-10'>Nome</Label> */}
                                <Input id='nome' type='text' className='w-50 my-1 mx-auto edit' value={this.state.nome} onChange={(e) => this.setState({ nome: e.target.value })} />
                            </Row>
                            <Row>
                                {/* <Label for='cpf'>CPF</Label> */}
                                <Input id='cpf' type='text' className='w-50 my-1 mx-auto edit' value={this.state.cpf} onChange={(e) => this.setState({ cpf: e.target.value })} />
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs='12' sm='12' md='12' lg='12' className="text-center my-3">
                            <Button color="success" className="mx-3 edit"
                                onClick={(e) => (this.salvar(false))}>Salvar</Button>

                            <Button color="danger" className="mx-3 edit"
                                onClick={(e) => { this.cancelar(false) }}>Cancelar</Button>

                            <Button color="warning" className='mx-3 edit'
                                onClick={(e) => (this.alterar(true))}>Alterar</Button>
                        </Col>
                    </Row>

                </Container>
            </div>
        );
    }
}

export default Perfil;