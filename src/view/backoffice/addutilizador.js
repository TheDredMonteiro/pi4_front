import axios from 'axios';
// import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import ip from '../../ip'
import authHeader from '../auth-header';
import { Link } from "react-router-dom"
import authService from '../auth.service';
import { useParams } from "react-router-dom";

export default function AddUtilizadorComponent() {
    const [campNome, setcampNome] = useState("");
    const [campEmail, setcampEmail] = useState("");
    const [campNif, setcampNif] = useState("");
    const [campPontos, setcampPontos] = useState("");
    const [campFotografia, setcampFotografia] = useState("");
    const [campData, setcampData] = useState("");
    const [campPass, setcampPass] = useState("");
    const [Utilizador, setUtilizador] = useState([])
    const [Roles, setRoles] = useState([])
    const [Role, setRole] = useState([])
    const [RoleId, setRoleId] = useState("");
    const [RoleNome, setRoleNome] = useState("");
    useEffect(() => {



    },)
    function URole(id, texto) {
        setRoleId(id);
        setRoleNome(texto);
        alert("id_role1: " + RoleId);
        alert("id_role2: " + id);
        alert("id_role2: " + RoleNome);
        document.getElementById('dropdown-roles').textContent = texto
    }

    function Add() {
        const body = {
            nome: campNome,
            email: campEmail,
            nif: campNif,
            estado: 1,
            fotografia: campFotografia,
            id_role: parseInt(RoleId),
            data_nascimento: campData + 'T00:00:00.000Z',
            password: campPass
        }
        alert("id_role:" + RoleNome);
        alert("id_role2:" + body.id_role);
        console.log(body);
        axios
            .post('http://localhost:8000/user/add', body, authHeader())
            .then(res => {
                if (res.data.success) {

                    alert("Utilizador Criado!");
                    setcampFotografia("");
                    setcampNome("");
                    setcampEmail("");
                    setcampNif("");
                    setcampData("");
                    setcampPass("");

                }
                else {
                    alert("Error Web Service!");
                }
            })
            .catch(error => { alert(error + "rererererererererer"); })
    }
    return (

        <div className="col overflow-auto h-sm-100 px-5 pt-4" style={{ backgroundColor: "#46483C" }}>

            <div className="mb-3 row">
                <div className='col-6'>

                    <span className='h5 fw-semibold' style={{ color: "#D3D4A9" }}>
                        Criar Utilizador
                    </span>
                    <br />
                    <br />
                    <span className='fw-semibold' style={{ color: "#D3D4A9", fontSize: "15px" }} >
                        Nome:
                    </span>
                    <input
                        className='form-control focus-warning text-dark w-50 rounded-3'
                        type='text'
                        autoComplete='none'
                        autoCapitalize='words'
                        required
                        value={campNome}
                        onChange={e => { setcampNome(e.target.value) }}
                        onInput={e => {
                            if (!e.target.validity.valid) {
                                e.target.classList.add('focus-danger')

                                if (e.target.validity.valueMissing) {
                                    e.target.setCustomValidity('O nome é de preenchimento obrigatório.')
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
                        className='form-control focus-warning text-dark w-75 rounded-3'
                        type='text'
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
                        autoComplete='none'
                        autoCapitalize='words'
                        required
                        value={campNif}
                        onChange={e => { setcampNif(e.target.value) }}
                        onInput={e => {
                            if (!e.target.validity.valid) {
                                e.target.classList.add('focus-danger')

                                if (e.target.validity.valueMissing) {
                                    e.target.setCustomValidity('O nif é de preenchimento obrigatório.')
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
                        placeholder='AAAA-MM-DD'
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
                        Role:
                    </span>
                    <br />
                    <button className=" btn btn-sm bg-white dropdown-toggle" type="button" id="dropdown-roles" data-bs-toggle="dropdown" aria-expanded="false">
                        Utilizador
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdown-filtro">
                        <li><button className="dropdown-item" onClick={e => { URole(1, e.target.textContent); setRoleId(1) }} type='button'>Admin</button></li>
                        <li><button className="dropdown-item" onClick={e => { URole(2, e.target.textContent); setRoleId(2) }} type='button'>Responsável</button></li>
                        <li><button className="dropdown-item" onClick={e => { URole(3, e.target.textContent); setRoleId(3) }} type='button'>Agente</button></li>
                        <li><button className="dropdown-item" onClick={e => { URole(4, e.target.textContent); setRoleId(4) }} type='button'>Utilizador</button></li>
                    </ul>
                    <br />
                    <br /><span className='fw-semibold' style={{ color: "#D3D4A9", fontSize: "15px" }} >
                        Password:
                    </span>
                    <input
                        className='form-control focus-warning text-dark w-50 rounded-3'
                        type='text'

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

                </div>
                <div className='col-6'>

                    <br />
                    <br />
                    <span className='fw-semibold' style={{ color: "#D3D4A9", fontSize: "15px" }} >
                        Fotografia:
                    </span>
                    <input
                        // id='user-username-input'
                        className='form-control focus-warning text-dark w-100 rounded-3'
                        type='text'
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
                    <img className="photo" width={"50%"} height={"50%"} src={Utilizador.fotografia} />
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <button className='btn btn-success w-20 fw-semibold' onClick={() => { Add(); }}>Criar</button>
                </div>
            </div>
        </div>
    )

}