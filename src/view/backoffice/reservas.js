import axios from 'axios';
// import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import ip from '../../ip'
import authHeader from '../auth-header';
import { Link, useNavigate } from "react-router-dom"
import authService from '../auth.service';
import { useParams } from "react-router-dom";
export default function ReservasComponent() {
    const [reservas, setReservas] = useState([])
    const [visitas, setVisitas] = useState([])
    const [filtroCliente, setFiltroCliente] = useState('id')
    const [ordemCliente, setOrdemCliente] = useState('ASC')
    const [userrole, setUserrole] = useState('')
    const navigate = useNavigate()
    const { id } = useParams();
    useEffect(() => {

        
        axios.get('http://localhost:8000/pontos/listreservas?ordem=' + ordemCliente + '&filtro=' + filtroCliente+ '&id=' + id, authHeader())
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    setReservas(data);

                } else {
                    alert("Error Web Service!");
                }
            })
            .catch(error => {
                alert(error)
            });
            
        

    }, [filtroCliente, ordemCliente, id])

   
    



    function LoadReservas() {
        return (
            reservas.map(reserva => {
                return (
                    <tr className='align-middle' key={reserva.id} id={reserva.id} style={{ backgroundColor: "#E9F3DE" }}>
                        <td className='text-start text-dark lh-sm'>
                            <span className='position-relative fw-semibold ' style={{ fontSize: "15px" }}>
                                {reserva.utilizadore.nome}
                            </span>
                        </td>
                        <td className='text-start text-dark lh-sm'>
                            
                            <span className='fw-semibold position-relative' style={{ fontSize: "14px" }}>
                                {reserva.num_vagas}
                            </span>
                        </td>
                        <td className='text-start text-dark lh-sm'>
                            
                            <span className='fw-semibold position-relative' style={{ fontSize: "14px" }}>
                                {reserva.data_reserva}
                            </span>
                        </td>
                        <td className='text-center text-dark lh-sm'>
                            <span className='position-relative' style={{ fontSize: "11px" }}>
                                {(reserva.presenca == 1) &&
                                    <button
                                    className='btn-estado fw-semibold border-0' style={{width : '70px', borderRadius: '100px'}}
                                         onClick={() => {}}>

                                        Esteve presente

                                    </button>
                                }
                                {(reserva.presenca == 0) &&
                                    <button
                                    className='btn-estado fw-semibold border-0' style={{width : '200px', height : '70px',borderRadius: '100px', backgroundColor:'red'}}
                                         onClick={() => {}}>

                                       Não esteve presente ou ainda não aconteceu

                                    </button>
                                }
                            </span>


                        </td>
                        <td className='text-start text-dark lh-sm'>
                            
                            <span className='fw-semibold position-relative' style={{ fontSize: "14px" }}>
                                {reserva.id_visita}
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
                        Reservas
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
                            <th className='text-start' style={{ width: '30%', fontSize: "14px" }}>Utilizador</th>
                                <th className='text-start' style={{ width: '30%', fontSize: "14px" }}>Número de Vagas</th>
                                <th className='text-start' style={{ width: '30%', fontSize: "14px" }}>Data</th>
                                <th className='text-start' style={{ width: '30%', fontSize: "14px" }}>Presença</th>
                                <th className='text-start' style={{ width: '30%', fontSize: "14px" }}>Visita</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            <LoadReservas />
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )

}