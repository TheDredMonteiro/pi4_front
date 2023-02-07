import axios from 'axios';
// import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import ip from '../../ip'
import authHeader from '../auth-header';
import { Link, useNavigate } from "react-router-dom"
import authService from '../auth.service';
import { useParams } from "react-router-dom";
export default function VisitasComponent() {
    const [reservas, setReservas] = useState([])
    const [visitas, setVisitas] = useState([])
    const [filtroCliente, setFiltroCliente] = useState('id')
    const [ordemCliente, setOrdemCliente] = useState('ASC')
    const [userrole, setUserrole] = useState('')
    const navigate = useNavigate()
    const { id } = useParams();
    useEffect(() => {

        
        axios.get('http://localhost:8000/pontos/listvisitas?ordem=' + ordemCliente + '&filtro=' + filtroCliente+ '&id=' + id, authHeader())
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    setVisitas(data);

                } else {
                    alert("Error Web Service!");
                }
            })
            .catch(error => {
                alert(error)
            });
            
        

    }, [filtroCliente, ordemCliente, id])

   
    



    function LoadVisitas() {
        return (
            visitas.map(visita => {
                return (
                    <tr className='align-middle' key={visita.id} id={visita.id} style={{ backgroundColor: "#E9F3DE" }}>
                        <td className='text-start text-dark lh-sm'>
                            <span className='position-relative fw-semibold ' style={{ fontSize: "15px" }}>
                                {visita.pontos_interesse.ponto_interesse}
                            </span>
                        </td>
                        <td className='text-start text-dark lh-sm'>
                            
                            <span className='fw-semibold position-relative' style={{ fontSize: "14px" }}>
                                {visita.vagas}
                            </span>
                        </td>
                        <td className='text-start text-dark lh-sm'>
                            
                            <span className='fw-semibold position-relative' style={{ fontSize: "14px" }}>
                                {visita.N_reservas}
                            </span>
                        </td>
                        <td className='text-start text-dark lh-sm'>
                            
                            <span className='fw-semibold position-relative' style={{ fontSize: "14px" }}>
                                {visita.data_visita}
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
                        Visitas
                    </span>
                    <br />
                </div>
            </div>
            <br />

            <div className="mb-3 row">
            </div>

            <div className="mb-3 row px-2">
                <div className='col p-3 rounded-4 border shadow' style={{ backgroundColor: "#E9F3DE" }}>
                    <table className='table' style={{ backgroundColor: "#E9F3DE" }}>
                        <thead>
                            <tr className=''>
                            <th className='text-start' style={{ width: '30%', fontSize: "14px" }}>Ponto de Interesse</th>
                                <th className='text-start' style={{ width: '30%', fontSize: "14px" }}>Número de Vagas</th>
                                <th className='text-start' style={{ width: '30%', fontSize: "14px" }}>Número de Reservas</th>
                                <th className='text-start' style={{ width: '30%', fontSize: "14px" }}>Data</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            <LoadVisitas />
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )

}