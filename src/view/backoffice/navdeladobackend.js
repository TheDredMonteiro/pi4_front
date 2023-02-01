import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import ip from '../../ip'
import navdelado from '../../styles/navdelado.css'
import logo from '../../assets/imagens/simbolo_cursar.png'

import authService from '../auth.service';
import authHeader from '../auth-header'

export default function Nav_Lado_Backend_Component(props) {

    const [username, setUsername] = useState('')
    const [useremail, setUseremail] = useState('')
    const [userrole, setUserrole] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        

        setUsername(authService.getCurrentUser()?.username ?? 'User')
        setUserrole(authService.getCurrentUser()?.role ?? 'Role')
        setUseremail(authService.getCurrentUser()?.email ?? '...')

    }, [])



    return (
        <div className='col-12 col-sm-3 col-lg-2 col-sm-2 d-flex sticky-top px-0'  style={{ backgroundColor: "#E9F3DE" }}>
            <div className='d-flex flex-sm-column flex-row flex-grow-1 align-items-center align-items-sm-start pt-2'>
            <br />
                <div className=' text-center  w-100 mb-0 mb-sm-3' style={{ color: "#46483C", fontSize: "25px",textShadow: "3px 3px 5px #000000" }}>
                    <img className="photo" src={logo} alt="new" /></div>
                <ul id='menu' className='nav d-flex flex-row flex-sm-column h-100 w-100'>

                    
                    <li className='mb-2'>
                        <Link to='/back-office/livros'
                            className='btn btn-outline-secondary border-0 rounded-0 px-2 px-sm-0  d-flex'
                            onFocus={e => setTimeout(() => { e.target.blur() }, 200)}>
                            &nbsp;&nbsp;&nbsp;<i class="fs-5 bi bi-bar-chart-fill" style={{ color: "#46483C"}}></i> &nbsp;<span className=' d-none d-sm-inline fw-semibold' style={{ color: "#46483C", fontSize: "20px" }}>Dashboard</span>
                        </Link>
                    </li>
                    <li className='mb-2'>
                        <Link to='/backend/utilizadores'
                            className='btn btn-outline-secondary border-0 rounded-0 px-2 px-sm-0  d-flex'
                            onFocus={e => setTimeout(() => { e.target.blur() }, 200)}>
                            &nbsp;&nbsp;&nbsp;<i class="fs-5 bi bi-people-fill" style={{ color: "#46483C"}}></i> &nbsp;<span className=' d-none d-sm-inline fw-semibold' style={{ color: "#46483C", fontSize: "20px" }}>Utilizadores</span>
                        </Link>
                    </li>
                    <li className='mb-2'>
                        <Link to='/backend/pontosinteresse'
                            className='btn btn-outline-secondary border-0 rounded-0 px-2 px-sm-0  d-flex'
                            onFocus={e => setTimeout(() => { e.target.blur() }, 200)}>
                            &nbsp;&nbsp;&nbsp;<i class="fs-5 bi bi-geo-alt-fill" style={{ color: "#46483C"}}></i> &nbsp;<span className=' d-none d-sm-inline fw-semibold' style={{ color: "#46483C", fontSize: "20px" }}>Ponto de Interesse</span>
                        </Link>
                    </li>
                    <li className='mb-2'>
                        <Link to='/back-office/estatisticas'
                            className='btn btn-outline-secondary border-0 rounded-0 px-2 px-sm-0  d-flex'
                            onFocus={e => setTimeout(() => { e.target.blur() }, 200)}>
                            &nbsp;&nbsp;&nbsp;<i class="fs-5 bi bi-map-fill" style={{ color: "#46483C"}}></i> &nbsp;<span className=' d-none d-sm-inline fw-semibold' style={{ color: "#46483C", fontSize: "20px" }}>Regiões</span>
                        </Link>
                    </li>
                    <li className='mb-2'>
                        <Link to='/back-office/estatisticas'
                            className='btn btn-outline-secondary border-0 rounded-0 px-2 px-sm-0  d-flex'
                            onFocus={e => setTimeout(() => { e.target.blur() }, 200)}>
                            &nbsp;&nbsp;&nbsp;<i class="fs-5 bi bi-trophy-fill" style={{ color: "#46483C"}}></i> &nbsp;<span className=' d-none d-sm-inline fw-bold' style={{ color: "#46483C", fontSize: "20px" }}>Recompensas</span>
                        </Link>
                    </li>
                    <li className='mb-2'>
                        <Link to='/back-office/estatisticas'
                            className='btn btn-outline-secondary border-0 rounded-0 px-2 px-sm-0  d-flex'
                            onFocus={e => setTimeout(() => { e.target.blur() }, 200)}>
                            &nbsp;&nbsp;&nbsp;<i class="fs-5 bi bi-sticky-fill" style={{ color: "#46483C"}}></i> &nbsp;<span className=' d-none d-sm-inline fw-bold' style={{ color: "#46483C", fontSize: "20px" }}>Página Web</span>
                        </Link>
                    </li>


                    {/* User */}
                    <li className='mb-2 mt-auto'>
                        <div className='dropend py-sm-4 mt-sm-auto ms-auto ms-sm-0 flex-shrink-1'>
                        <li><button className='dropdown-item'
                                    onClick={e => { authService.logout(); navigate('/'); }}
                                >
                                    &nbsp;&nbsp;&nbsp;<i className='bi bi-door-open-fill fs-5'></i> &nbsp;
                                    <span className=' d-none d-sm-inline fw-bold' style={{ color: "#46483C", fontSize: "20px" }}>Sair</span>
                                </button></li>
                        </div>
                    </li>
                </ul>
            </div>


        </div>
    )
}