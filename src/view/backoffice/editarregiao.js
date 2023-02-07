import axios from 'axios';
// import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import ip from '../../ip'
import authHeader from '../auth-header';
import { Link, useNavigate } from "react-router-dom"
import authService from '../auth.service';
import { useParams } from "react-router-dom";

export default function AddRegiaoComponent() {
    const [campRegiao, setcampRegiao] = useState("");
    const [campIdUtilizador, setcampIdUtilizador] = useState("");
    const [filtroUtilizador, setFiltroUtilizador] = useState('id')
    const [ordemUtilizador, setOrdemUtilizador] = useState('ASC')
    const [campFotografia_1, setcampFotografia_1] = useState("");
    const [Utilizador, setUtilizador] = useState([])
    const [Regiao, setRegiao] = useState([])
    const { id } = useParams();

    const [Utilizadores, setUtilizadores] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8000/regioes/regiao?id=' + id, authHeader())
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    setRegiao(data);
                    setUtilizador(data.utilizadore);
                    campRegiao(Regiao.regiao);
                    campIdUtilizador(Regiao.id_utilizador);
                    campFotografia_1(Regiao.fotografia_1);
                } else {
                    alert("Error Web Service!");
                }
            })
            .catch(error => {
                alert(error)
            });
        axios.get('http://localhost:8000/user/listrespo?ordem=' + ordemUtilizador + '&filtro=' + filtroUtilizador, authHeader())
        .then(res => {
            if (res.data.success) {
                const data = res.data.data;
                setUtilizadores(data);

            } else {
                alert("Error Web Service!");
            }
        })
        .catch(error => {
            alert(error)
        });
}, [filtroUtilizador, ordemUtilizador])

function LoadUtilizadores() {
    return (
        Utilizadores.map(utilizador => {
            return (
                <li><button className="dropdown-item" onClick={e => { mudarUtilizadores(utilizador.id, e.target.textContent); setcampIdUtilizador(utilizador.id) }} type='button'>{utilizador.nome}</button></li>
            )
        })
    )
}
    function mudarUtilizadores(id, texto) {
        setcampIdUtilizador(id);
        document.getElementById('dropdown-roles').textContent = texto
    }

    function Update(id)  {
        if((campFotografia_1 == "") || (campIdUtilizador == "") || (campRegiao == ""))
        {
            alert("Preenche todos os campos.");
        }
        else
        {
            const body = {
                id: id,
                regiao: campRegiao,
                id_utilizador: parseInt(campIdUtilizador),
                fotografia_1: campFotografia_1
            }
            axios
                .put('http://localhost:8000/regioes/update', body, authHeader())
                .then(res => {
                    if (res.data.success) {
    
                        alert("Região Editada!");
                        setcampFotografia_1("");
                        setcampRegiao("");
                        window.location.reload(false);
    
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
                        Editar Região
                    </span>
                    <br />
                    <br />
                    <span className='fw-semibold' style={{ color: "#D3D4A9", fontSize: "15px" }} >
                        Nome:
                    </span>
                    <input
                        className='form-control focus-warning text-dark w-50 rounded-3'
                        type='text'
                        placeholder={Regiao.regiao}
                        autoComplete='none'
                        autoCapitalize='words'
                        required
                        value={campRegiao}
                        onChange={e => { setcampRegiao(e.target.value) }}
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
                        Responsável:
                    </span>
                    <br />
                    <button className=" btn btn-sm bg-white dropdown-toggle" type="button" id="dropdown-roles" data-bs-toggle="dropdown" aria-expanded="false">
                    {Utilizador.nome}
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdown-filtro">
                    <LoadUtilizadores/>
                    </ul>
                    <br />
                    <br></br>
                    <span className='fw-semibold' style={{ color: "#D3D4A9", fontSize: "15px" }} >
                        Fotografia:
                    </span>
                    <input
                        // id='user-username-input'
                        className='form-control focus-warning text-dark w-100 rounded-3'
                        type='text'
                        placeholder={Regiao.fotografia_1}
                        autoComplete='none'
                        autoCapitalize='words'
                        required
                        value={campFotografia_1}
                        onChange={e => { setcampFotografia_1(e.target.value) }}
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
                    <img className="photo" width={"25%"} height={"25%"} src={Regiao.fotografia_1} />
                    
                    <br></br>
                    <br></br>
                    <br></br>
                    <button className='btn btn-success w-20 fw-semibold' onClick={() => { Update(id); }}>Editar</button>
                </div>   
            </div>
        </div>
    )

}