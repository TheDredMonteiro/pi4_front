import React, { useEffect, useState } from 'react';
import { Link, redirect, useNavigate, Navigate } from "react-router-dom";
import axios from 'axios';
import AuthService from "../../view/auth.service";
import ip from '../../ip'
import authHeader from '../auth-header';
import './Login.css';

export default function RecuperarComponent(props) {

    const [loading, setLoading] = useState(false)
    const [clientes, setCliente] = useState([])
    const [userEmail, setUserEmail] = useState('')
    const [userPass, setUserPass] = useState('')
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState('');
    const [failedAuthentication, setFailedAuthentication] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
    }, [])

    const doRecuperar = (e) => {
        e.preventDefault();
        axios.get('http://localhost:8000/user/login?email=' + userEmail ,authHeader())
        .then(res => {

            if (res.data.success) {
                alert(userEmail);
                navigate("/recuperar2/" + userEmail);
            } else {
                alert("sucesso23")
            }
        })
    };
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
                <img src="logo192.png" alt="logo" className="logo my-2 " />
                    Esqueceu-se da password?
                </div>
                <br></br>
                <span style={{ fontSize: "18px"}} >
                        Email
                    </span>
                <input
                    className='form-control focus-warning text-dark w-100 rounded-3'
                    type='text'
                    placeholder='Insira o seu email'
                    autoComplete='none'
                    autoCapitalize='words'
                    required
                    value={userEmail}
                    onChange={e => { setUserEmail(e.target.value) }}
                    onInput={e => {
                        if (!e.target.validity.valid) {
                            e.target.classList.add('focus-danger')

                            if (e.target.validity.valueMissing) {
                                e.target.setCustomValidity('O email ?? de preenchimento obrigat??rio.')
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
                <div className='justify-content-center'>
                    <button onClick={e => { doRecuperar(e) }} className=' btn-login w-100 fw-semibold border-0' type='submit' style={{ transition: '0.5s' }}>
                        <span id='login-btn-text'>Recuperar</span>
                    </button>
                </div>
                </div>
                <div class="col-sm-4"></div>
            </div>
        </div>
    )
}