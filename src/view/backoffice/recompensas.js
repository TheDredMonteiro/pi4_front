import axios from 'axios';
// import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import ip from '../../ip'
import authHeader from '../auth-header';
import { Link, useNavigate } from "react-router-dom"
import authService from '../auth.service';
import { useParams } from "react-router-dom";
export default function RecompensasComponent() {
    const [recompensas, setRecompensas] = useState([])
    const [filtroCliente, setFiltroCliente] = useState('id')
    const [ordemCliente, setOrdemCliente] = useState('ASC')
    const [userrole, setUserrole] = useState('')
    const navigate = useNavigate()
    const { role } = useParams();
    useEffect(() => {

        if((role != 2) && (role != 1))
        {
            authService.logout(); navigate('/');
        }
        
        axios.get('http://localhost:8000/recompensas/list?ordem=' + ordemCliente + '&filtro=' + filtroCliente, authHeader())
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    setRecompensas(data);

                } else {
                    alert("Error Web Service!");
                }
            })
            .catch(error => {
                alert(error)
            });
            
        

    }, [filtroCliente, ordemCliente])

    /*useEffect(() => {

        axios.get(ip + '/clientes/total', authHeader())
            .then(res => {
                setTotalClientes(res.data.data)
            });
    }, [])*/
    function handleFiltro(filtro, ordem, texto) {
        setFiltroCliente(filtro);
        setOrdemCliente(ordem);
        document.getElementById('dropdown-filtro').textContent = texto
    }
    
    
    function Estado(id) {
        const div1 = document.getElementById(id)
        const exampleAttr = div1.getAttribute('data-estado');
        if (exampleAttr == "false") {
            const body = {
                id: id,
                disponivel: 1
            }

            axios
                .put(
                    'http://localhost:8000/recompensas/update_disponivel',
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
                disponivel: 0
            }

            axios
                .put(
                    'http://localhost:8000/recompensas/update_disponivel',
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


    function LoadRegioes() {
        return (
            recompensas.map(recompensa => {
                return (
                    <tr className='align-middle' key={recompensa.id} id={recompensa.id} data-estado={recompensa.disponivel } style={{ backgroundColor: "#E9F3DE" }}>
                        
                        <td className='text-start text-dark lh-sm'>
                            <span className='fw-semibold position-relative' style={{ fontSize: "14px" }}>
                                {recompensa.recompensa}
                            </span>
                        </td>
                        <td className='text-center text-dark lh-sm'>
                            <span className='position-relative' style={{ fontSize: "13px" }}>
                                {recompensa.descricao}
                            </span>
                        </td>
                        <td className='text-center text-dark lh-sm'>
                        <span className='position-relative' style={{ fontSize: "13px" }}>
                                {recompensa.num_pontos} Pontos
                            </span>
                        </td>
                        <td className='text-center text-dark lh-sm'>
                            <span className='position-relative' style={{ fontSize: "11px" }}>
                                {(recompensa.disponivel == 1) &&
                                    <button
                                    className='btn-estado fw-semibold border-0' style={{width : '70px', borderRadius: '100px'}}
                                         onClick={() => { Estado(recompensa.id) }}>

                                        Ativa

                                    </button>
                                }
                                {(recompensa.disponivel == 0) &&
                                    <button
                                    className='btn-estado fw-semibold border-0' style={{width : '70px', borderRadius: '100px', backgroundColor:'red'}}
                                         onClick={() => { Estado(recompensa.id) }}>

                                        Desativa

                                    </button>
                                }
                            </span>


                        </td>
                        <td className='text-center text-dark lh-sm'>
                        <span className='position-relative' style={{ fontSize: "13px" }}>
                                {recompensa.validade} Dias
                            </span>
                        </td>
                        <td >
                            <Link to={'/backend/editarregiao/' + recompensa.id}>
                            
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
                        Recompensas
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
                            <li><button className="dropdown-item" onClick={e => { handleFiltro('regiao', 'ASC', e.target.textContent) }} type='button'>Nome da região (A-Z)</button></li>
                            <li><button className="dropdown-item" onClick={e => { handleFiltro('regiao', 'DESC', e.target.textContent) }} type='button'>Nome de região (Z-A)</button></li>
                            <li><button className="dropdown-item" onClick={e => { handleFiltro('num_pontos', 'ASC', e.target.textContent) }} type='button'>Pontos</button></li>

                        </ul>
                    </div>

                </div>
                <Link to='/backend/addrecompensa' className='btn-login fw-semibold border-0' style={{ width: '250px' }}>

                    Nova Recompensa
                </Link>
            </div>

            <div className="mb-3 row px-2">
                <div className='col p-3 rounded-4 border shadow' style={{ backgroundColor: "#E9F3DE" }}>
                    <table className='table' style={{ backgroundColor: "#E9F3DE" }}>
                        <thead>
                            <tr className=''>
                                <th className='text-start' style={{ width: '20%', fontSize: "14px" }}>Recompensa</th>
                                <th className='text-center' style={{ width: '40%', fontSize: "14px" }}>Descrição</th>
                                <th className='text-center' style={{ width: '10%', fontSize: "14px" }}>Pontos</th>
                                <th className='text-start' style={{ width: '15%', fontSize: "14px" }}>Disponibilidade</th>
                                <th className='text-center' style={{ width: '10%', fontSize: "14px" }}>Validade</th>
                                <th className='text-center' style={{ width: '50%' }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            <LoadRegioes />
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )

}