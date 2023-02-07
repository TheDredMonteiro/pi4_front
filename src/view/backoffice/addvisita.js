import axios from 'axios';
// import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import ip from '../../ip'
import authHeader from '../auth-header';
import { Link } from "react-router-dom"
import authService from '../auth.service';
import { useParams } from "react-router-dom";

export default function AddRegiaoComponent() {
    const [campData, setcampData] = useState("");
    const [campHora, setcampHora] = useState("");
    const [campVagas, setcampVagas] = useState("");
    const { id } = useParams();

    const [Utilizadores, setUtilizadores] = useState([])
    useEffect(() => {
        
}, )


    
    function Add() {
        if((campData == "") || (campHora == "") || (campVagas == ""))
        {
            alert("Preenche todos os campos.");
        }
        else
        {
            const body = {
                data_visita: campData + "T" + campHora + ":00.000Z",
                id_ponto_interesse: parseInt(id),
                vagas: campVagas
            }
            axios
                .post('http://localhost:8000/pontos/addvisita', body, authHeader())
                .then(res => {
                    if (res.data.success) {
    
                        alert("Visita Criada!");
                        setcampData("");
                        setcampHora("");
                        setcampVagas("");
    
                    }
                    else {
                        alert("Error Web Service!");
                    }
                })
                .catch(error => { alert(error + "sdasdasda"); })
        }
        
    }
    return (

        <div className="col overflow-auto h-sm-100 px-5 pt-4" style={{ backgroundColor: "#46483C" }}>

            <div className="mb-3 row">
                <div className='col-6'>

                    <span className='h5 fw-semibold' style={{ color: "#D3D4A9" }}>
                        Criar Visita
                    </span>
                    <br />
                    <br />
                    <span className='fw-semibold' style={{ color: "#D3D4A9", fontSize: "15px" }} >
                        Data (AAAA-MM-DD):
                    </span>
                    <input
                        className='form-control focus-warning text-dark w-50 rounded-3'
                        type='text'
                        autoComplete='none'
                        autoCapitalize='words'
                        required
                        value={campData}
                        onChange={e => { setcampData(e.target.value) }}
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
                        Hora:
                    </span>
                    <input
                        className='form-control focus-warning text-dark w-50 rounded-3'
                        type='text'
                        autoComplete='none'
                        autoCapitalize='words'
                        required
                        value={campHora}
                        onChange={e => { setcampHora(e.target.value) }}
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
                    
                    <br></br>
                    <span className='fw-semibold' style={{ color: "#D3D4A9", fontSize: "15px" }} >
                        Vagas:
                    </span>
                    <input
                        // id='user-username-input'
                        className='form-control focus-warning text-dark w-100 rounded-3'
                        type='text'
                        autoComplete='none'
                        autoCapitalize='words'
                        required
                        value={campVagas}
                        onChange={e => { setcampVagas(e.target.value) }}
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
                    <br></br>
                    <br></br>
                    <button className='btn btn-success w-20 fw-semibold' onClick={() => { Add(); }}>Criar</button>

                </div>
                
            </div>
        </div>
    )

}