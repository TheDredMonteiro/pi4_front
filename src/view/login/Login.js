import React,{ useEffect, useState } from "react";
import axios from 'axios';
import {redirect, useNavigate} from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [otp, setOneTimePassword] = useState('');
    const [success, setSuccess] = useState('');
    const [failedAuthentication, setFailedAuthentication] = useState('');

    const navegacao = useNavigate();

    const doLogin = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/user/login',{email}).then( response => {
              const dadoServidor = response.data;
              if(dadoServidor.resultado.rows[0].email === email){
                setSuccess('Coloque o código que recebeu em seu e-mail.');
              }
              return redirect('/login');
        }).catch( error => {
            setFailedAuthentication('Autenticação falhada!');
        }).finally(() => {
            e.target.reset();
        });
    };

    // Envia o código de utilização única para o backend.
    const enviaCodigo = () => {
        axios.post('http://localhost:8000/user/otp', { otp }).then(response => {
           let estado = response.data.response;
           estado ? navegacao("/") : redirect("/login");
        }).catch(error => {
            setFailedAuthentication(error.response.data.erro);
        });
    };

    useEffect(() => {
        setTimeout(() => {
            failedAuthentication && (
                setFailedAuthentication(null)
            );
        }, 3000 );
    }, [failedAuthentication]);

    return(
        <section className="section-login">
            <form onSubmit={doLogin} className="input-area d-flex justify-content-center container">
                <div className="box-form">
                    <div className="mb-4 text-center">
                        <img src="logo192.png" alt="logo" className="logo my-2"/>
                        {
                           failedAuthentication && (
                               <p className="text-danger">{failedAuthentication}</p>
                           )
                        }
                        <h5 className="my-3 fw-normal text-login">
                            {success ? "Verifique o seu e-mail" : "Entrar na sua conta"}
                        </h5>
                    </div>
                    {
                        success && (
                            <>
                                <div className="label-email text-start mb-2">
                                    <p className="text-email-destino">{success ? "Enviamos o e-mail para:" : "Email"}</p>
                                    <p className="text-black my-4">{email}</p>
                                </div>
                                <div className="label-email text-start mb-2">
                                    {success ? "Coloque o código recebido no e-mail em baixo" : "Email"}
                                </div>
                            </>
                        )
                    }
                    {
                        !success ?
                        <input 
                            type="email"
                            id="email"
                            className="input-email mb-3"
                            placeholder="Insira o seu email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        :
                        <input 
                            type="text"
                            id="otp"
                            className="input-otp mb-3"
                            placeholder={"Codigo"}
                            onChange={(e) => setOneTimePassword(e.target.value)}
                        />
                    }
                    {
                        !success 
                            ? <input 
                                type="submit"
                                value="Continuar"
                                className="btn-login"
                            /> 
                            : <input 
                                type="button"
                                value="Verificar"
                                className="btn-login"
                                onClick={ () => { enviaCodigo(otp) }}
                            />
                    }
                </div>
            </form>
        </section>
    )
};

export default Login;