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
    const [campRecompensa, setcampRecompensa] = useState("");
    const [campDescricao, setcampDescricao] = useState("");
    const [campPontos, setcampPontos] = useState("");
    const [campValidade, setcampValidade] = useState("");
    useEffect(() => {
        
},)



    function Add() {
        if((campRecompensa == "") || (campDescricao == "") || (campPontos == "") || (campValidade == ""))
        {
            alert("Preenche todos os campos.");
        }
        else
        {
            const body = {
                recompensa: campRecompensa,
                decricao: campDescricao,
                num_pontos: parseInt(campPontos),
                validade: parseInt(campValidade)
            }
            alert(body.recompensa);
            alert(campDescricao);
            alert(campPontos);
            alert(campValidade);
            axios
                .post('http://localhost:8000/recompensas/add', body, authHeader())
                .then(res => {
                    if (res.data.success) {
    
                        alert("Recompensa Criada!");
                        setcampDescricao("");
                        setcampPontos("");
                        setcampRecompensa("");
                        setcampValidade("");
    
                    }
                    else {
                        alert("Error Web Service!");
                    }
                })
                .catch(error => { alert(error); })
        }
        
    }
    return (

        <div className="col overflow-auto h-sm-100 px-5 pt-4" style={{ backgroundColor: "#46483C" }}>

            <div className="mb-3 row">
                <div className='col-6'>

                    <span className='h5 fw-semibold' style={{ color: "#D3D4A9" }}>
                        Criar Recompensa
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
                        value={campRecompensa}
                        onChange={e => { setcampRecompensa(e.target.value) }}
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
                        Descrição:
                    </span>
                    <input
                        // id='user-username-input'
                        className='form-control focus-warning text-dark w-100 rounded-3'
                        type='text'
                        autoComplete='none'
                        autoCapitalize='words'
                        required
                        value={campDescricao}
                        onChange={e => { setcampDescricao(e.target.value) }}
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
                    <span className='fw-semibold' style={{ color: "#D3D4A9", fontSize: "15px" }} >
                        Pontos:
                    </span>
                    <input
                        // id='user-username-input'
                        className='form-control focus-warning text-dark w-100 rounded-3'
                        type='text'
                        autoComplete='none'
                        autoCapitalize='words'
                        required
                        value={campPontos}
                        onChange={e => { setcampPontos(e.target.value) }}
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
                    <span className='fw-semibold' style={{ color: "#D3D4A9", fontSize: "15px" }} >
                        Validade:
                    </span>
                    <input
                        // id='user-username-input'
                        className='form-control focus-warning text-dark w-100 rounded-3'
                        type='text'
                        autoComplete='none'
                        autoCapitalize='words'
                        required
                        value={campValidade}
                        onChange={e => { setcampValidade(e.target.value) }}
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