import React,{ useState } from "react";
import axios from 'axios';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [oneTimePassword, setOneTimePassword] = useState('');
    const [success, setSuccess] = useState('');
    const [failedAuthentication, setFailedAuthentication] = useState('');

    const doLogin = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/login',{email}).then( response => {
            (response.data) && setSuccess('Coloque o código que recebeu em seu e-mail.');
        }).catch( error => {
            console.log(error);
            setFailedAuthentication('Autenticação falhada!');
        }).finally(() => {
            e.target.reset();
        });
    };

    /* Test 
    
    const sendOTP = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/otp', {oneTimePassword}).then(response => {
            response.data
        }).catch(error => {

        }).finally(() => {
            
        });
    };
    */

    return(
        <section className="section-login">
            <form onSubmit={doLogin} className="input-area d-flex justify-content-center container">
                <div className="box-form">
                    <div className="mb-4">
                        <img src="logo192.png" alt="logo" className="logo mb-2"/>
                        <h2 className="mt-1 fw-normal">
                            {success ? "Verifique o seu e-mail" : "Entrar na sua conta"}
                        </h2>
                    </div>
                    <div className="label-email text-start mb-2">
                        {success ? "Coloque o código recebido no e-mail abaixo" : "Email"}
                    </div>
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
                            className="input-email mb-3"
                            placeholder="Insira o seu email"
                            onChange={(e) => setOneTimePassword(e.target.value)}
                        />
                    }
                    <input type="submit" value="Continuar" className="btn-login"/>
                </div>
            </form>
        </section>
    )
};

export default Login;