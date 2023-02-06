import axios from 'axios';
// import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import ip from '../../ip'
import authHeader from '../auth-header';
import { Link } from "react-router-dom"
import authService from '../auth.service';
import { useParams } from "react-router-dom";

export default function EditarUtilizadorComponent() {
    const [campNome, setcampNome] = useState("");
    const [campEmail, setcampEmail] = useState("");
    const [campNif, setcampNif] = useState("");
    const [campPontos, setcampPontos] = useState("");
    const [campFotografia, setcampFotografia] = useState("");
    const [campData, setcampData] = useState("");
    const [campEstado, setcampEstado] = useState("");
    const [campRole, setcampRole] = useState("");
    const [campPass, setcampPass] = useState("");
    const [ponto, setPonto] = useState([])
    const [Utilizador, setUtilizador] = useState([])
    const [Roles, setRoles] = useState([])
    const [Role, setRole] = useState([])
    const { id } = useParams();
    const [RoleId, setRoleId] = useState("");
    const [RoleNome, setRoleNome] = useState("");
    useEffect(() => {

        axios.get('http://localhost:8000/user/utilizador?id=' + id, authHeader())
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    setUtilizador(data);
                    setcampFotografia(Utilizador.fotografia);
                    setcampPontos(Utilizador.pontos);
                    setcampNome(Utilizador.nome);
                    setcampEmail(Utilizador.email);
                    setcampNif(Utilizador.nif);
                    setcampData(Utilizador.data_nascimento);
                    setcampPass(Utilizador.password);
                    setRole(data.utilizadores_role);
                    setRoleId(Utilizador.id_role)
                } else {
                    alert("Error Web Service!");
                }
            })
            .catch(error => {
                alert(error)
            });
            axios.get('http://localhost:8000/user/roles', authHeader())
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    setRoles(data);

                } else {
                    alert("Error Web Service!");
                }
            })
            .catch(error => {
                alert(error)
            });


    }, [id])
    function URole(id, texto) {
        setRoleId(id)
        setRoleNome(texto)
        document.getElementById('dropdown-roles').textContent = texto
    }
    function LoadRoles() {
        return (
            Roles.map(Role => {
                return (
                    <li><button className="dropdown-item" onClick={e => { URole(Role.id, e.target.textContent) }} type='button'>{Role.role}</button></li>
                )
            })
        )
    }
    function Update(id) {
        const body = {
            nome: campNome,
            id: id,
            email: campEmail,
            nif: campNif,
            fotografia: campFotografia,
            pontos: parseInt(campPontos),
            id_role:  parseInt(RoleId),
            data_nascimento: campData,
            password: campPass
        }
        alert(body.id);
        alert(body.id_role);
        console.log(body);
        axios
            .put('http://localhost:8000/user/update', body, authHeader())




            .then(res => {
                if (res.data.success) {

                    alert("Utilizador editado!");
                    
                }
                else {
                    alert("Error Web Service!");
                }
            })
            .catch(error => { alert(error); })
    }
    function Estado(id) {
        const div1 = document.getElementById(id)
        const exampleAttr = div1.getAttribute('data-estado');
        if (exampleAttr == "false") {
            const body = {
                id: id,
                estado: 1
            }

            axios
                .put(
                    'http://localhost:8000/user/update_estado',
                    body,
                    authHeader()
                )
                .then(res => {
                    if (res.data.success) {
                        window.location.reload(false);
                    }
                    else {
                        alert("Error Web SeAArvice!");
                    }
                })
                .catch(error => { alert(error); })
        }
        else if (exampleAttr == "true") {
            const body = {
                id: id,
                estado: 0
            }

            axios
                .put(
                    'http://localhost:8000/user/update_estado',
                    body,
                    authHeader()
                )
                .then(res => {
                    if (res.data.success) {
                        window.location.reload(false);
                    }
                    else {
                        alert("Error Web SeAArvice!");
                    }
                })
                .catch(error => { alert(error); })
        }

    }

    return (

        <div className="col overflow-auto h-sm-100 px-5 pt-4" style={{ backgroundColor: "#46483C" }} id={Utilizador.id} data-estado={Utilizador.estado}>

            <div className="mb-3 row">
                <div className='col-6'>
                    
                    <span className='h5 fw-semibold' style={{ color: "#D3D4A9" }}>
                        Editar Utilizador
                    </span>
                    <br />
                    <br />
                    <span className='fw-semibold' style={{ color: "#D3D4A9", fontSize: "15px" }} >
                        Nome:
                    </span>
                    <input
                        className='form-control focus-warning text-dark w-50 rounded-3'
                        type='text'
                        placeholder={Utilizador.nome}
                        autoComplete='none'
                        autoCapitalize='words'
                        required
                        value={campNome}
                        onChange={e => { setcampNome(e.target.value) }}
                        onInput={e => {
                            if (!e.target.validity.valid) {
                                e.target.classList.add('focus-danger')

                                if (e.target.validity.valueMissing) {
                                    e.target.setCustomValidity('O email é de preenchimento obrigatório.')
                                    e.target.reportValidity()
                                } else {
                                    e.target.setCustomValidity('')
                                    e.target.classList.remove('focus-danger')
                                }
                            }
                        }}
                    />
                    <br />
                    <span className='fw-semibold' style={{ color: "#D3D4A9", fontSize: "15px" }} >
                        Email:
                    </span>
                    <input
                        className='form-control focus-warning text-dark w-50 rounded-3'
                        type='text'
                        placeholder={Utilizador.email}
                        autoComplete='none'
                        autoCapitalize='words'
                        required
                        value={campEmail}
                        onChange={e => { setcampEmail(e.target.value) }}
                        onInput={e => {
                            if (!e.target.validity.valid) {
                                e.target.classList.add('focus-danger')

                                if (e.target.validity.valueMissing) {
                                    e.target.setCustomValidity('O email é de preenchimento obrigatório.')
                                    e.target.reportValidity()
                                } else {
                                    e.target.setCustomValidity('')
                                    e.target.classList.remove('focus-danger')
                                }
                            }
                        }}
                    />
                    <br />
                    <span className='fw-semibold' style={{ color: "#D3D4A9", fontSize: "15px" }} >
                        NIF:
                    </span>
                    <input
                        className='form-control focus-warning text-dark w-50 rounded-3'
                        type='text'
                        placeholder={Utilizador.nif}
                        autoComplete='none'
                        autoCapitalize='words'
                        required
                        value={campNif}
                        onChange={e => { setcampNif(e.target.value) }}
                        onInput={e => {
                            if (!e.target.validity.valid) {
                                e.target.classList.add('focus-danger')

                                if (e.target.validity.valueMissing) {
                                    e.target.setCustomValidity('O email é de preenchimento obrigatório.')
                                    e.target.reportValidity()
                                } else {
                                    e.target.setCustomValidity('')
                                    e.target.classList.remove('focus-danger')
                                }
                            }
                        }}
                    />
                    <br />
                    <span className='fw-semibold' style={{ color: "#D3D4A9", fontSize: "15px" }} >
                        Data de Nascimento:
                    </span>
                    <input
                        className='form-control focus-warning text-dark w-50 rounded-3'
                        type='text'
                        placeholder={Utilizador.data_nascimento}
                        autoComplete='none'
                        autoCapitalize='words'
                        required
                        value={campData}
                        onChange={e => { setcampData(e.target.value) }}
                        onInput={e => {
                            if (!e.target.validity.valid) {
                                e.target.classList.add('focus-danger')

                                if (e.target.validity.valueMissing) {
                                    e.target.setCustomValidity('O email é de preenchimento obrigatório.')
                                    e.target.reportValidity()
                                } else {
                                    e.target.setCustomValidity('')
                                    e.target.classList.remove('focus-danger')
                                }
                            }
                        }}
                    />
                    <br />
                    <span className='fw-semibold' style={{ color: "#D3D4A9", fontSize: "15px" }} >
                        Estado:
                    </span>
                    <span className='position-relative' style={{ fontSize: "15px" }}>
                        {(Utilizador.estado == 1) &&
                            <button
                                className='btn-estado fw-semibold border-0' style={{ width: '90px', borderRadius: '100px' }}
                                onClick={() => { Estado(Utilizador.id) }}>

                                Ativa

                            </button>
                        }
                        {(Utilizador.estado == 0) &&
                            <button
                                className='btn-estado fw-semibold border-0' style={{ width: '90px', borderRadius: '100px', backgroundColor: 'red' }}
                                onClick={() => { Estado(Utilizador.id) }}>

                                Desativa

                            </button>
                        }
                    </span>
                    <br />
                    <span className='fw-semibold' style={{ color: "#D3D4A9", fontSize: "15px" }} >
                        Role:
                    </span>
                    <br />
                        <button className=" btn btn-sm bg-white dropdown-toggle" type="button" id="dropdown-roles" data-bs-toggle="dropdown" aria-expanded="false">
                            {Role.role}  
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdown-filtro">
                            <LoadRoles/>
                        </ul>
                    
                </div>
                <div className='col-6'>
                   
                    <br />
                    <br /><span className='fw-semibold' style={{ color: "#D3D4A9", fontSize: "15px" }} >
                        Password:
                    </span>
                    <input
                        className='form-control focus-warning text-dark w-50 rounded-3'
                        type='text'
                        placeholder={Utilizador.password}
                        autoComplete='none'
                        autoCapitalize='words'
                        required
                        value={campPass}
                        onChange={e => { setcampPass(e.target.value) }}
                        onInput={e => {
                            if (!e.target.validity.valid) {
                                e.target.classList.add('focus-danger')

                                if (e.target.validity.valueMissing) {
                                    e.target.setCustomValidity('O email é de preenchimento obrigatório.')
                                    e.target.reportValidity()
                                } else {
                                    e.target.setCustomValidity('')
                                    e.target.classList.remove('focus-danger')
                                }
                            }
                        }}
                    />
                    <br />
                    <span className='fw-semibold' style={{ color: "#D3D4A9", fontSize: "15px" }} >
                        Pontos:
                    </span>
                    <input
                        className='form-control focus-warning text-dark w-50 rounded-3'
                        type='text'
                        placeholder={Utilizador.pontos}
                        autoComplete='none'
                        autoCapitalize='words'
                        required
                        value={campPontos}
                        onChange={e => { setcampPontos(e.target.value) }}
                        onInput={e => {
                            if (!e.target.validity.valid) {
                                e.target.classList.add('focus-danger')

                                if (e.target.validity.valueMissing) {
                                    e.target.setCustomValidity('O email é de preenchimento obrigatório.')
                                    e.target.reportValidity()
                                } else {
                                    e.target.setCustomValidity('')
                                    e.target.classList.remove('focus-danger')
                                }
                            }
                        }}
                    />
                    <br />
                    <span className='fw-semibold' style={{ color: "#D3D4A9", fontSize: "15px" }} >
                        Fotografia:
                    </span>
                    <input 
                    // id='user-username-input'
                    className='form-control focus-warning text-dark w-100 rounded-3'
                    type='text'
                    
                    placeholder={Utilizador.fotografia}
                    autoComplete='none'
                    autoCapitalize='words'
                    required
                    value={campFotografia}
                    onChange={e => { setcampFotografia(e.target.value) }}
                    onInput={e => {
                        if (!e.target.validity.valid) {
                            e.target.classList.add('focus-danger')

                            if (e.target.validity.valueMissing) {
                                e.target.setCustomValidity('O stock é de preenchimento obrigatório.')
                                e.target.reportValidity()
                            } else {
                                e.target.setCustomValidity('')
                                e.target.classList.remove('focus-danger')
                            }
                        }
                    }}
                />
                <br></br> 
                <img className="photo" width={"25%"} height={"25%"} src={Utilizador.fotografia} />
                <br></br> 
                <br></br>
                <br></br>
                <br></br>
                <button

                className='btn btn-success w-20 fw-semibold'
                onClick={() => { Update(id); }}
            >
                Editar

            </button>
                </div>


            </div>


        </div>
    )

}