import React, { Component } from 'react';
import firebase from '../../firebase';
import { tsImportEqualsDeclaration } from '@babel/types';
import { FaFileUpload, FaThumbsDown } from "react-icons/fa";
import { Container, Row, Col, Button, Input, Label, Progress, Form, FormGroup } from 'reactstrap'
import { FaRegImage } from "react-icons/fa";
import InputMask from 'react-input-mask';
class Perfil extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mask: '999.999.999-99',
            foto: null,
            nome: '',
            cpf: '',
            fotoOld: '',
            nomeOld: '',
            cpfOld: '',
            email: firebase.getCurrent(),
            uid: firebase.getCurrentUid(),
            progress: 0
        }
        this.alterar = this.alterar.bind(this)
        this.salvar = this.salvar.bind(this)
        this.cancelar = this.cancelar.bind(this)
        this.controlaTela = this.controlaTela.bind(this)
        this.update = this.update.bind(this)
        this.handleFile = this.handleFile.bind(this)
        this.handleUpload = this.handleUpload.bind(this)
        this.validarCPF = this.validarCPF.bind(this)
    }

    async componentDidMount() {

        let elements = document.getElementsByClassName('edit')
        elements[0].disabled = true //Input File
        elements[1].disabled = true //Input Name
        elements[2].disabled = true //Input CPF
        elements[3].disabled = true //Button Salvar
        elements[4].disabled = true //Button Cancelar
        console.log(elements)

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
                foto: this.state.foto,
                nome: this.state.nome,
                cpf: this.state.cpf
            })
            this.setState(this.state)
            // alert("Seus dados foram salvos com sucesso!")
            window.location.reload();
        } catch (error) {
            alert("Ocorreu um erro ao alterar seus dados!")
        }
    }

    salvar(e) {
        this.controlaTela(e)
        if (this.validarCPF(this.state.cpf)) {
            this.update()
        }
        else {
            alert("CPF Inválido!")
            this.setState({
                foto: this.state.fotoOld,
                nome: this.state.nomeOld,
                cpf: this.state.cpfOld
            })
        }
    }

    cancelar(e) {
        this.setState({progress: 0})

        this.controlaTela(e)
        this.setState({
            foto: this.state.fotoOld,
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
        elements[0].disabled = !cond //Input File
        elements[1].disabled = !cond //Input Nome
        elements[2].disabled = !cond //Input CPF
        elements[3].disabled = !cond //Button Salvar
        elements[4].disabled = !cond //Button Cancelar
        elements[5].disabled = cond  //Button Alterar
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

    onChange = (event) => {
        var value = event.target.value;
        var newState = {
            mask: '999.999.999-99',
            value: value
        };
        if (/^3[47]/.test(value)) {
            newState.mask = '999.999.999-99';
        }
        this.setState(newState);
        this.setState({ cpf: event.target.value });
    }

    validarCPF(cpf) {
        cpf = cpf.replace(/[^\d]+/g, '');
        let rev;
        let add;

        if (cpf == '') return false;

        if (cpf.length != 11 ||
            cpf == "00000000000" ||
            cpf == "11111111111" ||
            cpf == "22222222222" ||
            cpf == "33333333333" ||
            cpf == "44444444444" ||
            cpf == "55555555555" ||
            cpf == "66666666666" ||
            cpf == "77777777777" ||
            cpf == "88888888888" ||
            cpf == "99999999999")
            return false;

        add = 0;
        for (let i = 0; i < 9; i++)
            add += parseInt(cpf.charAt(i)) * (10 - i);
        rev = 11 - (add % 11);
        if (rev == 10 || rev == 11)
            rev = 0;
        if (rev != parseInt(cpf.charAt(9)))
            return false;

        add = 0;
        for (let i = 0; i < 10; i++)
            add += parseInt(cpf.charAt(i)) * (11 - i);
        rev = 11 - (add % 11);
        if (rev == 10 || rev == 11)
            rev = 0;
        if (rev != parseInt(cpf.charAt(10)))
            return false;
        return true;
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
                        <Col md='12' lg='12'>
                            <Form className="my-2">
                                <FormGroup className="d-flex justify-content-center">
                                    <img className='rounded-circle my-1' width='200px' height='200px' src={this.state.foto} />
                                </FormGroup>

                                <FormGroup>
                                    <Input type="file" className="edit mx-auto w-50 my-3" onChange={this.handleFile} />

                                    <Progress id='progress' color="success" className="w-50 mx-auto" value={this.state.progress} max="100" />
                                </FormGroup>

                                <FormGroup>
                                    {/* <Label for="nome">Nome</Label> */}
                                    <Input id='nome' type='text' className='w-50 my-1 mx-auto edit' value={this.state.nome} onChange={(e) => this.setState({ nome: e.target.value })} />
                                </FormGroup>

                                <FormGroup>
                                    <InputMask id='cpf' className="form-control w-50 my-1 mx-auto edit" {...this.state} onChange={this.onChange} id="cpf" value={this.state.cpf}
                                        autoComplete="off" placeholder="000.000.000-00" required />
                                </FormGroup>

                                <FormGroup>
                                    <Col xs='12' sm='12' md='12' lg='12' className="text-center my-3">
                                        <Button color="success" className="mx-3 edit"
                                            onClick={(e) => (this.salvar(false))}>Salvar</Button>

                                        <Button color="danger" className="mx-3 edit"
                                            onClick={(e) => { this.cancelar(false) }}>Cancelar</Button>

                                        <Button color="warning" className='mx-3 edit'
                                            onClick={(e) => (this.alterar(true))}>Alterar</Button>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Perfil;