import axios from 'axios';
// import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import ip from '../../ip'
import authHeader from '../auth-header';
import { Link } from "react-router-dom"
import authService from '../auth.service';
import { useParams } from "react-router-dom";

export default function EditarRecompensaComponent() {
    const [campRecompensa, setcampRecompensa] = useState("");
    const [campDescricao, setcampDescricao] = useState("");
    const [campFotografia, setcampFotografia] = useState("");
    const [campPontos, setcampPontos] = useState("");
    const [campValidade, setcampValidade] = useState("");
    const [campIdUtilizador, setcampIdUtilizador] = useState("");
    const [filtroUtilizador, setFiltroUtilizador] = useState('id')
    const [ordemUtilizador, setOrdemUtilizador] = useState('ASC')
    const [Utilizadores, setUtilizadores] = useState([])
    const [Utilizador, setUtilizador] = useState([])
    const [Recompensa, setRecompensa] = useState([])
    const { id } = useParams();
    useEffect(() => {
        axios.get('http://localhost:8000/recompensas/recompensa?id=' + id, authHeader())
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    setRecompensa(data);
                    setUtilizador(data.utilizadore);
                    setcampDescricao(Recompensa.descricao);
                        setcampPontos(Recompensa.num_pontos);
                        setcampRecompensa(Recompensa.recompensa);
                        setcampValidade(Recompensa.validade);
                    campIdUtilizador(Recompensa.id_utilizador);
                    campFotografia(Recompensa.fotografia);
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



    function Update(id) {
        if((campRecompensa == "") || (campDescricao == "") || (campFotografia == "") || (campIdUtilizador == "") || (campPontos == "") || (campValidade == ""))
        {
            alert("Preenche todos os campos.");
        }
        else
        {
            const body = {
                recompensa: campRecompensa,
                descricao: campDescricao,
                id: id,
                fotografia: campFotografia,
                num_pontos: parseInt(campPontos),
                id_utilizador: parseInt(campIdUtilizador),
                validade: parseInt(campValidade)
            }
            alert("id" + id);
            alert(body.recompensa);
            alert(body.id_utilizador);
            alert(campDescricao);
            alert(campPontos);
            alert(campValidade);
            axios
                .put('http://localhost:8000/recompensas/update', body, authHeader())
                .then(res => {
                    if (res.data.success) {
    
                        alert("Recompensa Editada!");
                        setcampDescricao("");
                        setcampPontos("");
                        setcampRecompensa("");
                        setcampValidade("");
                        window.location.reload(false);
    
                    }
                    else {
                        alert("Error Web Service!");
                    }
                })
                .catch(error => { alert("errou:" + body.recompensa); alert(error); })
        }
        
    }
    return (

        <div className="col overflow-auto h-sm-100 px-5 pt-4" style={{ backgroundColor: "#46483C" }}>

            <div className="mb-3 row">
                <div className='col-6'>

                    <span className='h5 fw-semibold' style={{ color: "#D3D4A9" }}>
                        Editar Recompensa
                    </span>
                    <br />
                    <br />
                    <span className='fw-semibold' style={{ color: "#D3D4A9", fontSize: "15px" }} >
                        Nome:
                    </span>
                    <input
                        className='form-control focus-warning text-dark w-50 rounded-3'
                        type='text'
                        placeholder={Recompensa.recompensa}
                        autoComplete='none'
                        autoCapitalize='words'
                        required
                        value={campRecompensa}
                        onChange={e => { setcampRecompensa(e.target.value) }}
                        onInput={e => {
                            if (!e.target.validity.valid) {
                                e.target.classList.add('focus-danger')

                                if (e.target.validity.valueMissing) {
                                    e.target.setCustomValidity('O nome ?? de preenchimento obrigat??rio.')
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
                        Descri????o:
                    </span>
                    <input
                        // id='user-username-input'
                        className='form-control focus-warning text-dark w-100 rounded-3'
                        type='text'
                        placeholder={Recompensa.descricao}
                        autoComplete='none'
                        autoCapitalize='words'
                        required
                        value={campDescricao}
                        onChange={e => { setcampDescricao(e.target.value) }}
                        onInput={e => {
                            if (!e.target.validity.valid) {
                                e.target.classList.add('focus-danger')
                                if (e.target.validity.valueMissing) {
                                    e.target.setCustomValidity('O stock ?? de preenchimento obrigat??rio.')
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
                        placeholder={Recompensa.num_pontos}
                        autoComplete='none'
                        autoCapitalize='words'
                        required
                        value={campPontos}
                        onChange={e => { setcampPontos(e.target.value) }}
                        onInput={e => {
                            if (!e.target.validity.valid) {
                                e.target.classList.add('focus-danger')
                                if (e.target.validity.valueMissing) {
                                    e.target.setCustomValidity('O stock ?? de preenchimento obrigat??rio.')
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
                        Validade em dias:
                    </span>
                    <input
                        // id='user-username-input'
                        className='form-control focus-warning text-dark w-100 rounded-3'
                        type='text'
                        placeholder={Recompensa.validade}
                        autoComplete='none'
                        autoCapitalize='words'
                        required
                        value={campValidade}
                        onChange={e => { setcampValidade(e.target.value) }}
                        onInput={e => {
                            if (!e.target.validity.valid) {
                                e.target.classList.add('focus-danger')
                                if (e.target.validity.valueMissing) {
                                    e.target.setCustomValidity('O stock ?? de preenchimento obrigat??rio.')
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
                        Respons??vel:
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
                    <br></br>
                    <br></br>
                    <button className='btn btn-success w-20 fw-semibold' onClick={() => { Update(id); }}>Editar</button>
                    </div>
                <div className='col-6'>
                <br />
                    <br></br>
                    <span className='fw-semibold' style={{ color: "#D3D4A9", fontSize: "15px" }} >
                        Fotografia:
                    </span>
                    <input
                        // id='user-username-input'
                        className='form-control focus-warning text-dark w-100 rounded-3'
                        type='text'
                        autoComplete='none'
                        placeholder={Recompensa.fotografia}
                        autoCapitalize='words'
                        required
                        value={campFotografia}
                        onChange={e => { setcampFotografia(e.target.value) }}
                        onInput={e => {
                            if (!e.target.validity.valid) {
                                e.target.classList.add('focus-danger')
                                if (e.target.validity.valueMissing) {
                                    e.target.setCustomValidity('O stock ?? de preenchimento obrigat??rio.')
                                    e.target.reportValidity()
                                } else {
                                    e.target.setCustomValidity('')
                                    e.target.classList.remove('focus-danger')
                                }
                            }
                        }}
                    />
                    <br></br>
                    <img className="photo" width={"25%"} height={"25%"} src={campFotografia} placeholder={Recompensa.fotografia} />
                </div>
                
            </div>
        </div>
    )

}