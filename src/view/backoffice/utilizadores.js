import axios from 'axios';
// import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import React, { useEffect, useState } from 'react';

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
        if(exampleAttr == 2)
        {
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
        else if(exampleAttr == 1)
        {
            const body = {
                id: id,
                estado: 2
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
                    <tr className='align-middle' key={utilizador.id} id={utilizador.id}  data-estado={utilizador.estado} data-email={utilizador.email}>
                        {/* Cliente */}
                        <td className='text-start text-dark lh-sm'>
                            <span className='fs-5 fw-semibold position-relative'>
                                {utilizador.nome}
                            </span>
                            
                            
                        </td>
                        <td className='text-start text-dark lh-sm'>
                            <span className='fs-5 fw-semibold  position-relative'>
                                {utilizador.email}
                            </span>
                        </td>
                        
                        <td className='text-start text-dark lh-sm'>
                            <span className='fs-5 fw-semibold  position-relative'>
                                {utilizador.nif}
                            </span>
                        </td>
                        <td className='text-start text-dark lh-sm'>
                            <span className='fs-5 fw-semibold  position-relative'>
                                {utilizador.id_role}
                            </span>
                        </td>
                        <td className='text-start text-dark lh-sm'>
                            <span className='fs-5 fw-semibold position-relative'>
                                {(utilizador.estado == 1)&&
                                <button
                                
                                className='btn btn-warning w-100 fw-semibold' onClick={() => {Estado(utilizador.id)}}>
                                
                                Pendente
                                
                            </button>
                                }
                                {(utilizador.estado == 2)&&
                                <button
                                
                                className='btn btn-success w-100 fw-semibold' onClick={() => {Estado(utilizador.id)}}>
                                
                                Aceite
                                
                            </button>
                                }
                            </span>
                            
                            
                        </td>
                        <td className='text-start text-dark lh-sm'>
                            <span className='fs-5 fw-semibold  position-relative'>
                                {utilizador.data_nascimento}
                            </span>
                        </td>
                        <td className='text-start text-dark lh-sm'>
                            <span className='fs-5 fw-semibold  position-relative'>
                                {utilizador.fotografia}
                            </span>
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

                    <div className="dropdown bg-white me-2">
                        <button className=" btn btn-sm  dropdown-toggle" type="button" id="dropdown-filtro" data-bs-toggle="dropdown" aria-expanded="false">
                            <span className='me-2'></span>
                            Data de criação
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdown-filtro">
                            <li><button className="dropdown-item" onClick={e => { handleFiltro('nome', 'ASC', e.target.textContent) }} type='button'>Nome de cliente (A-Z)</button></li>
                            <li><button className="dropdown-item" onClick={e => { handleFiltro('nome', 'DESC', e.target.textContent) }} type='button'>Nome de cliente (Z-A)</button></li>
                        </ul>
                    </div>

                </div>
            </div>
            <div className="mb-3 row px-2">
                <div className='col p-3 bg-white rounded-4 border shadow'>
                    <table className='table'>
                        <thead>
                            <tr className=''>
                                <th className='text-start' style={{ width: '10%' }}>Nome</th>
                                <th className='text-start' style={{ width: '10%' }}>Email</th>
                                <th className='text-start' style={{ width: '10%' }}>NIF</th>
                                <th className='text-center' style={{ width: '10%' }}>Role</th>
                                <th className='text-center' style={{ width: '10%' }}>Estado</th>
                                <th className='text-center' style={{ width: '10%' }}>Data de Nascimento</th>
                                <th className='text-center' style={{ width: '10%' }}>Fotografia</th>
                                <th className='text-center' style={{ width: '30%' }} colSpan={1}></th>
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