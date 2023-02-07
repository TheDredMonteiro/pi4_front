import React, { useEffect, useState } from 'react';
import { Link, useNavigate, Navigate } from "react-router-dom";

import axios from 'axios';
import AuthService from "../../view/auth.service";
import ip from '../../ip'
import authHeader from '../auth-header';
//import './Login.css';


export default function Login2Component(props) {

    const [loading, setLoading] = useState(false)
    const [clientes, setCliente] = useState([])
    const [userEmail, setUserEmail] = useState('')
    const [userPass, setUserPass] = useState('')
    const navigate = useNavigate();

    useEffect(() => {

    }, [])
    /*function Cliente(userEmail, userPass) {
        axios.get(ip + '/clientes/cliente?mail=monteiro@gmail.com&pass=123abcd', authHeader())
            .then(res => {
                setCliente(res.data.data)
            })
            .catch(console.log)
        alert(userEmail)
        alert(userPass)

    }*/
    function HandleLogin(e) {
        e.preventDefault()
        setLoading(true)
        let btn = e.nativeEvent.submitter
        let btnText = document.getElementById('login-btn-text')



        AuthService
            .login(userEmail, userPass)
            .then(res => {

                if (res.success) {
                    if(res.role == 1)
                    {
                        alert("admin")
                        navigate('/backend/utilizadores/' + 1);
                    }
                    else if(res.role == 2)
                    {
                        alert("responsavel")
                        navigate('/backend/regioes/' + 2);
                    }
                    else if(res.role == 3)
                    {
                        alert("agente")
                        navigate('/backend/pontosinteresse/' + 3);
                    }
                    
                } else {

                    alert(res.response.data.message)
                    console.log(res)
                    setLoading(false)
                    btn.classList.add('btn-danger')
                    btnText.textContent = res.response.data.message
                    setTimeout(() => {
                        btn.classList.remove('btn-danger')
                        btnText.textContent = 'Entrar'
                    }, 3000);

                }

            })

    }

    return (
        <div className='container-fluid vh-100 col overflow-auto  px-5 pt-4  text-dark' style={{ fontFamily: 'Poppins', backgroundColor: "#E9F3DE" }}>


            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div class="row">
                <div class="col-sm-4"></div>
                <div class="col-sm-4">
                <div className='h3 text-dark justify-content-top align-items-center   d-flex flex-column '>
                <img src="logo192.png" alt="logo" className="logo my-2 " />
                
                    Entre na sua conta
                </div>

                <br></br>



                
                <span style={{ fontSize: "18px"}} >
                        Email
                    </span>
                    
                <input
                    // id='user-username-input'

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
                                e.target.setCustomValidity('O email é de preenchimento obrigatório.')
                                e.target.reportValidity()
                            } else {
                                e.target.setCustomValidity('')
                                e.target.classList.remove('focus-danger')
                            }
                        }
                    }}
                />
               <br></br>
                <span style={{ fontSize: "18px" }} >
                    Password
                </span>
                <input
                    type="password"
                    width={100}
                    className="form-control focus-warning text-dark w-100  rounded-3"
                    id="user-pass-input"
                    placeholder="Insira a sua password"

                    required
                    value={userPass}
                    onChange={e => { setUserPass(e.target.value) }}
                    onInput={e => {
                        if (!e.target.validity.valid) {
                            e.target.classList.add('focus-danger')

                            if (e.target.validity.valueMissing) {
                                e.target.setCustomValidity('A password é de preenchimento obrigatório.')
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
                    <button onClick={e => { HandleLogin(e) }} className=' btn-login fw-semibold w-100 border-0' type='submit' style={{ transition: '0.5s'}}>

                        <span id='login-btn-text'>Entrar</span>
                    </button>
                    <Link style={{ fontSize: "15px" }} to='/recuperar' >Esqueceu-se da password?</Link>
                </div>
                </div>
                <div class="col-sm-4"></div>
            </div>






        </div>

    )
}