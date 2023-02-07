import React, { useEffect, useState } from 'react';
import { Link, redirect, useNavigate, Navigate } from "react-router-dom";

import axios from 'axios';
import AuthService from "../../view/auth.service";
import ip from '../../ip'
import authHeader from '../auth-header';
import { useParams } from "react-router-dom";
import './Login.css';
import Logo from '../../assets/imagens/logo.png'

export default function RecuperarComponent(props) {

    const [loading, setLoading] = useState(false)
    const [clientes, setCliente] = useState([])
    const [userEmail, setUserEmail] = useState('')
    const [PassAntiga, setPassAntiga] = useState('')
    const [PassNova, setPassNova] = useState('')
    const [userPass, setUserPass] = useState('')
    const [success, setSuccess] = useState('');
    const [failedAuthentication, setFailedAuthentication] = useState('');
    const navigate = useNavigate();
    const { mail } = useParams();

    useEffect(() => {

    }, [])
    function Mudar() {
       
            const body = {
                email: mail,
                passA: PassAntiga,
                passN: PassNova
            }
            axios
                .put(
                    'http://localhost:8000/user/update_password',
                    body,
                    authHeader()
                )
                .then(res => {
                    if (res.data.success) {
                        alert("Password alterada com sucesso");
                        navigate("/");
                    }
                    else {
                        alert("Error Web SeAArvice!");
                    }
                })
                .catch(error => { alert(error); })
        
        

    }
    
    return (
        <div className='container-fluid vh-100 col overflow-auto  px-5 pt-4 text-dark'>
           <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div class="row">
                <div class="col-sm-4"></div>
                <div class="col-sm-4">
                <div className='h3 text-dark justify-content-top align-items-center   d-flex flex-column '>
                <img src={Logo} alt="logo" className="logo my-2 " />
                    Crie uma nova password
                </div>

                <br></br>
                <span style={{ fontSize: "18px"}} >
                Password Antiga
                    </span>
                <input
                    // id='user-username-input'

                    className='form-control focus-warning text-dark w-100 rounded-3'
                    type="password"
                    placeholder='Inserir a Password Antiga'
                    autoComplete='none'
                    autoCapitalize='words'
                    required
                    value={PassAntiga}
                    onChange={e => { setPassAntiga(e.target.value) }}
                    onInput={e => {
                        if (!e.target.validity.valid) {
                            e.target.classList.add('focus-danger')

                            if (e.target.validity.valueMissing) {
                                e.target.setCustomValidity('A password antiga é de preenchimento obrigatório.')
                                e.target.reportValidity()
                            } else {
                                e.target.setCustomValidity('')
                                e.target.classList.remove('focus-danger')
                            }
                        }
                    }}
                />
                <br></br>
                <span style={{ fontSize: "18px"}} >
                Password Nova
                    </span>
                <input
                    // id='user-username-input'

                    className='form-control focus-warning text-dark w-100 rounded-3'
                    type="password"
                    placeholder='Inserir a Password Nova'
                    autoComplete='none'
                    autoCapitalize='words'
                    required
                    value={PassNova}
                    onChange={e => { setPassNova(e.target.value) }}
                    onInput={e => {
                        if (!e.target.validity.valid) {
                            e.target.classList.add('focus-danger')

                            if (e.target.validity.valueMissing) {
                                e.target.setCustomValidity('A password nova é de preenchimento obrigatório.')
                                e.target.reportValidity()
                            } else {
                                e.target.setCustomValidity('')
                                e.target.classList.remove('focus-danger')
                            }
                        }
                    }}
                />



                
                
               <br></br>
               <br></br>
                


               <div className='justify-content-end'>
                    <button onClick={() => { Mudar() }} className=' btn-login w-100 fw-semibold border-0' type='submit' style={{ transition: '0.5s'}}>
                        
                        <span id='login-btn-text'>Entrar</span>
                    </button>
                </div>
                </div>
                <div class="col-sm-4"></div>
            </div>
           

        </div>

    )
}