import axios from 'axios';
// import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import ip from '../../ip'
import authHeader from '../auth-header';
import { Link } from "react-router-dom"
import authService from '../auth.service';

export default function RegioesComponent() {
    const [regioes, setRegioes] = useState([])
    const [filtroCliente, setFiltroCliente] = useState('id')
    const [ordemCliente, setOrdemCliente] = useState('ASC')

    useEffect(() => {

        axios.get('http://localhost:8000/regioes/list?ordem=' + ordemCliente + '&filtro=' + filtroCliente, authHeader())
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    setRegioes(data);

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
    
    



    function LoadRegioes() {
        return (
            regioes.map(regiao => {
                return (
                    <tr className='align-middle' key={regiao.id} id={regiao.id} style={{ backgroundColor: "#E9F3DE" }}>
                        
                        <td className='text-start text-dark lh-sm'>
                            <span className='fw-semibold position-relative' style={{ fontSize: "14px" }}>
                                {regiao.regiao}
                            </span>
                        </td>
                        <td className='text-center text-dark lh-sm'>
                            <span className='position-relative' style={{ fontSize: "13px" }}>
                                {regiao.utilizadore.nome}
                            </span>
                        </td>
                        <td className='text-center text-dark lh-sm'>
                            <span className='fs-5 fw-semibold  position-relative'>
                                <img className="photo" width={"65%"} height={"65%"} src={regiao.fotografia_1} />
                            </span>
                        </td>
                        <td >
                            <Link to=''>
                            
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
                        Regiões
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
                            <li><button className="dropdown-item" onClick={e => { handleFiltro('id_utilizador', 'ASC', e.target.textContent) }} type='button'>Responsável</button></li>

                        </ul>
                    </div>

                </div>
                <Link to='' className='btn-login fw-semibold border-0' style={{ width: '250px' }}>

                    Nova Região
                </Link>
            </div>

            <div className="mb-3 row px-2">
                <div className='col p-3 rounded-4 border shadow' style={{ backgroundColor: "#E9F3DE" }}>
                    <table className='table' style={{ backgroundColor: "#E9F3DE" }}>
                        <thead>
                            <tr className=''>
                                <th className='text-start' style={{ width: '30%', fontSize: "14px" }}>Região</th>
                                <th className='text-center' style={{ width: '30%', fontSize: "14px" }}>Responsável</th>
                                <th className='text-center' style={{ width: '30%', fontSize: "14px" }}>Fotografia</th>
                                <th className='text-center' style={{ width: '10%' }}></th>
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