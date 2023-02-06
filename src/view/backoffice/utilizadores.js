import axios from 'axios';
// import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import ip from '../../ip'
import authHeader from '../auth-header';
import { Link } from "react-router-dom"
import authService from '../auth.service';

export default function UtilizadoresComponent() {
    const [utilizadores, setUtilizadores] = useState([])
    const [totalClientes, setTotalClientes] = useState(0)
    const [filtroUtilizador, setFiltroUtilizador] = useState('id')
    const [ordemUtilizador, setOrdemUtilizador] = useState('ASC')



    useEffect(() => {

        axios.get('http://localhost:8000/user/list?ordem=' + ordemUtilizador + '&filtro=' + filtroUtilizador, authHeader())
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

    /*useEffect(() => {

        axios.get(ip + '/clientes/total', authHeader())
            .then(res => {
                setTotalClientes(res.data.data)
            });
    }, [])*/
    function handleFiltro(filtro, ordem, texto) {
        setFiltroUtilizador(filtro);
        setOrdemUtilizador(ordem);
        document.getElementById('dropdown-filtro').textContent = texto
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


    function LoadUtilizadores() {
        return (
            utilizadores.map(utilizador => {
                return (
                    <tr className='align-middle' key={utilizador.id} id={utilizador.id} data-estado={utilizador.estado} data-email={utilizador.email} style={{ backgroundColor: "#E9F3DE" }}>
                        {/* Cliente */}
                        <td className='text-start text-dark lh-sm'>
                            <span className='fw-semibold position-relative' style={{ fontSize: "15px" }}>
                                {utilizador.nome}
                            </span>
                            <br></br>
                            <span className='position-relative' style={{ fontSize: "14px" }}>
                                Nif: {utilizador.nif}
                            </span>

                        </td>
                        <td className='text-start text-dark lh-sm'>
                            <span className='position-relative'  style={{ fontSize: "13px" }}>
                                {utilizador.email}
                            </span>
                        </td>

                        <td className='text-center text-dark lh-sm'>
                            <span className='position-relative' style={{ fontSize: "13px" }}>
                                {(utilizador.id_role == 1) &&

                                    <span>Admin</span>

                                }
                                {(utilizador.id_role == 2) &&
                                    <span>Responsável</span>

                                }
                                {(utilizador.id_role == 3) &&

                                    <span>Agente</span>

                                }
                                {(utilizador.id_role == 4) &&

                                    <span>Utilizador</span>

                                }
                            </span>
                        </td>
                        <td className='text-center text-dark lh-sm'>
                            <span className='position-relative' style={{ fontSize: "11px" }}>
                                {(utilizador.estado == 1) &&
                                    <button
                                    className='btn-estado fw-semibold border-0' style={{width : '70px', borderRadius: '100px'}}
                                         onClick={() => { Estado(utilizador.id) }}>

                                        Ativa

                                    </button>
                                }
                                {(utilizador.estado == 0) &&
                                    <button
                                    className='btn-estado fw-semibold border-0' style={{width : '70px', borderRadius: '100px', backgroundColor:'red'}}
                                         onClick={() => { Estado(utilizador.id) }}>

                                        Desativa

                                    </button>
                                }
                            </span>


                        </td>
                        <td className='text-center text-dark lh-sm'>
                            <span className='position-relative' style={{ fontSize: "11px" }}>
                                {utilizador.pontos}
                            </span>
                        </td>
                        <td className='text-center text-dark lh-sm'>
                            <span className='position-relative' style={{ fontSize: "11px" }}>
                                {utilizador.data_nascimento}
                            </span>
                        </td>
                        <td className='text-start text-dark lh-sm'>
                            <span className='fs-5 fw-semibold  position-relative'>
                                <img className="photo" width={"85%"} height={"85%"} src={utilizador.fotografia} />
                            </span>
                        </td>
                        <td >
                            <Link to={'/backend/editarutilizador/' + utilizador.id}>
                            
                            <i class="bi bi-pencil-fill"></i></Link>
                        </td>
                        

                    </tr>
                )
            })
        )
    }
    return (

        <div className="col overflow-auto h-sm-100 px-5 pt-4" style={{ backgroundColor: "#46483C" }}>
            {/* Titulo */}
            <div className="mb-3 row">
                <div className='col-6'>
                    <span className='h2 fw-bold' style={{ color: "#D3D4A9" }}>
                        Utilizadores
                    </span>
                    <br />
                </div>


            </div>
            <br />
           
            <div className="mb-3 row">
                <div className='col d-flex justify-content-start align-items-center fs-6 fw-normal'>
                    <span className='me-2' style={{ color: "#D3D4A9" }}>
                        Ver na ordem de
                    </span>

                    <div className="dropdown bg-white rounded me-2">
                        <button className=" btn btn-sm btn-outline-dark dropdown-toggle" type="button" id="dropdown-filtro" data-bs-toggle="dropdown" aria-expanded="false">
                            <span className='me-2'></span>
                            Data de criação
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdown-filtro">
                            <li><button className="dropdown-item" onClick={e => { handleFiltro('nome', 'ASC', e.target.textContent) }} type='button'>Nome de utilizador (A-Z)</button></li>
                            <li><button className="dropdown-item" onClick={e => { handleFiltro('nome', 'DESC', e.target.textContent) }} type='button'>Nome de utilizador (Z-A)</button></li>
                            <li><button className="dropdown-item" onClick={e => { handleFiltro('id_role', 'ASC', e.target.textContent) }} type='button'>Role</button></li>
                            <li><button className="dropdown-item" onClick={e => { handleFiltro('estado', 'DESC', e.target.textContent) }} type='button'>Estado</button></li>
                        </ul>
                    </div>

                </div>
                <Link to='' className='btn-login fw-semibold border-0' style={{width : '200px' }}>
                
                Novo Utilizador
            </Link>
            </div>
        
            <div className="mb-3 row px-2">
                <div className='col p-3 rounded-4 border shadow' style={{ backgroundColor: "#E9F3DE" }}>
                    <table className='table' style={{ backgroundColor: "#E9F3DE" }}>
                        <thead>
                            <tr className=''>
                                <th className='text-start' style={{ width: '20%', fontSize: "14px" }}>Nome</th>
                                <th className='text-start' style={{ width: '20%', fontSize: "14px"  }}>Email</th>
                                <th className='text-center' style={{ width: '10%', fontSize: "14px"  }}>Role</th>
                                <th className='text-center' style={{ width: '10%', fontSize: "14px"  }}>Estado</th>
                                <th className='text-center' style={{ width: '10%', fontSize: "14px"  }}>Pontos</th>
                                <th className='text-center' style={{ width: '10%', fontSize: "13px"  }}>Data de Nascimento</th>
                                <th className='text-center' style={{ width: '10%', fontSize: "13px"  }}>Fotografia</th>
                                <th className='text-center' style={{ width: '20%' }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            <LoadUtilizadores />
                        </tbody>
                    </table>
                </div>
            </div>



        </div>
    )

}