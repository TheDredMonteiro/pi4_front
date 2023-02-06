import axios from 'axios';
// import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import ip from '../../ip'
import authHeader from '../auth-header';
import { Link } from "react-router-dom"
import authService from '../auth.service';

export default function PontosInteresseComponent() {
    const [pontos, setPontos] = useState([])
    const [regioes, setRegioes] = useState([])
    const [totalClientes, setTotalClientes] = useState(0)
    const [filtroCliente, setFiltroCliente] = useState('id')
    const [ordemCliente, setOrdemCliente] = useState('ASC')
    const [filtroUtilizador, setFiltroUtilizador] = useState('id')
    const [ordemUtilizador, setOrdemUtilizador] = useState('ASC')
    const [filtroTipo, setFiltroTipo] = useState('id')
    const [ordemTipo, setOrdemTipo] = useState('ASC')
    const [tipos, setTipos] = useState([])
    const [agente, setAgente] = useState([])
    const [regiao, setRegiao] = useState([])

    useEffect(() => {

        axios.get('http://localhost:8000/pontos/list?ordem=' + ordemCliente + '&filtro=' + filtroCliente, authHeader())
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    setPontos(data);

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
    function Regiao(id_regiao, id_utilizador) {
        useEffect(() => {

            axios.get('http://localhost:8000/pontos/regiao2?id=' + id_regiao, authHeader())
                .then(res => {
                    if (res.data.success) {
                        const data = res.data.data;
                        setRegiao(data);
    
                    } else {
                        alert("Error Web Service!");
                    }
                })
                .catch(error => {
                    alert(error)
                });
                axios.get('http://localhost:8000/user/agente?id=' + id_utilizador, authHeader())
                .then(res => {
                    if (res.data.success) {
                        const data = res.data.data;
                        setAgente(data);
    
                    } else {
                        alert("Error Web Service!");
                    }
                })
                .catch(error => {
                    alert(error)
                });
                
                
    
        },)
    }



    function LoadPontos() {
        return (
            pontos.map(ponto => {
                return (
                    <tr className='align-middle' key={ponto.id} id={ponto.id} style={{ backgroundColor: "#E9F3DE" }}>
                        
                        <td className='text-start text-dark lh-sm'>
                            <span className='fw-semibold position-relative' style={{ fontSize: "14px" }}>
                                {ponto.ponto_interesse}
                            </span>
                        </td>
                        <td className='text-start text-dark lh-sm'>
                            <span className='position-relative' style={{ fontSize: "13px" }}>
                                {ponto.descricao}
                            </span>
                        </td>
                        <td className='text-center text-dark lh-sm'>
                            <span className='position-relative' style={{ fontSize: "13px" }}>
                                {ponto.morada}
                            </span>
                        </td>
                        <td className='text-center text-dark lh-sm'>
                            <span className='position-relative' style={{ fontSize: "13px" }}>
                            {ponto.tipos_pontos_interesse.tipo_ponto_interesse}
                                
                            </span>
                        </td>
                        <td className='text-center text-dark lh-sm'>
                            <span className='position-relative' style={{ fontSize: "13px" }}>
                                {ponto.utilizadore.nome}
                            </span>
                        </td>
                        <td className='text-center text-dark lh-sm'>
                            <span className='position-relative' style={{ fontSize: "13px" }}>
                            {ponto.regio.regiao}
                            </span>
                        </td>
                        <td className='text-center text-dark lh-sm'>
                            <span className='position-relative' style={{ fontSize: "13px" }}>
                                {ponto.pontos} pontos
                            </span>
                        </td>


                        <td >
                            <Link to=''>

                                <i class="bi bi-pencil-fill  fs-4" style={{ color: "#ECB357"}}></i></Link>
                        </td>
                        <td >
                            <Link to={'/backend/pontointeresse/' + ponto.id}>

                                <i class="bi bi-book-fill fs-4" style={{ color: "#526600" }}></i></Link>
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
                        Pontos de Interesse
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
                            <li><button className="dropdown-item" onClick={e => { handleFiltro('ponto_interesse', 'ASC', e.target.textContent) }} type='button'>Nome de ponto de interesse (A-Z)</button></li>
                            <li><button className="dropdown-item" onClick={e => { handleFiltro('ponto_interesse', 'DESC', e.target.textContent) }} type='button'>Nome de ponto de interesse (Z-A)</button></li>
                            <li><button className="dropdown-item" onClick={e => { handleFiltro('id_utilizador', 'ASC', e.target.textContent) }} type='button'>Agente</button></li>
                            <li><button className="dropdown-item" onClick={e => { handleFiltro('id_regiao', 'ASC', e.target.textContent) }} type='button'>Região</button></li>
                            <li><button className="dropdown-item" onClick={e => { handleFiltro('id_tipo_ponto_interesse', 'ASC', e.target.textContent) }} type='button'>Tipo de ponto de interesse</button></li>

                        </ul>
                    </div>

                </div>
                <Link to='' className='btn-login fw-semibold border-0' style={{ width: '250px' }}>

                    Novo Ponto de Interesse
                </Link>
            </div>

            <div className="mb-3 row px-2">
                <div className='col p-3 rounded-4 border shadow' style={{ backgroundColor: "#E9F3DE" }}>
                    <table className='table' style={{ backgroundColor: "#E9F3DE" }}>
                        <thead>
                            <tr className=''>
                                <th className='text-start' style={{ width: '15%', fontSize: "14px" }}>Ponto de Interesse</th>
                                <th className='text-center' style={{ width: '20%', fontSize: "14px" }}>Descrição</th>
                                <th className='text-center' style={{ width: '10%', fontSize: "14px" }}>Morada</th>
                                <th className='text-center' style={{ width: '10%', fontSize: "14px" }}>Tipo</th>
                                <th className='text-center' style={{ width: '10%', fontSize: "14px" }}>Agente</th>
                                <th className='text-center' style={{ width: '10%', fontSize: "14px" }}>Região</th>
                                <th className='text-center' style={{ width: '10%', fontSize: "14px" }}>Pontos</th>
                                <th className='text-center' style={{ width: '5%' }}></th>
                                <th className='text-center' style={{ width: '5%' }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            <LoadPontos />
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )

}