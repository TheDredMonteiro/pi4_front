import React, { useEffect, useState } from "react";
import axios from 'axios';
import { redirect, useNavigate } from 'react-router-dom';
import './Login.css';
import Logo from '../../assets/imagens/logo.png'

const Login = () => {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('');
    const [otp, setOneTimePassword] = useState('');
    const [success, setSuccess] = useState('');
    const [failedAuthentication, setFailedAuthentication] = useState('');

    const navigate = useNavigate();

    const doLogin = (e) => {
        console.log("entrou login");
        alert("entrou login")
        e.preventDefault();
        axios.post('http://localhost:8000/user/login', { email }).then(response => {
            const dadoServidor = response.data;
            if (dadoServidor.resultado.rows[0].email === email) {
                setSuccess('Coloque o código que recebeu em seu e-mail.');
            }
            return redirect('/login');
        }).catch(error => {
            setFailedAuthentication('Autenticação falhada!');
        }).finally(() => {
            e.target.reset();
        });
    };

    // Envia o código de utilização única para o backend.
    const enviaCodigo = () => {
        alert("entrou enviar")
        axios.post('http://localhost:8000/user/otp', { otp }).then(response => {

            if (response) {
                alert("sucesso")
                console.log("sucesso otp");
                axios.post('http://localhost:8000/user/login1', { email })
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('user', JSON.stringify(res.data))
                            alert("sucesso login1");
                            navigate('/landingpage');
                        }
                        else {
                            alert("erro login1");
                            alert(res.response.data.message)
                            console.log(res)
                            setLoading(false)
                           
                        }
                        return res.data
                    }, rejected => { return rejected })
                    .catch(error => { setLoading(false); alert(error); })
            }
            else{
                alert("falhou")
                
            }
        }).catch(error => {
            setFailedAuthentication(error.response.data.erro);
        });
    };

    useEffect(() => {
        setTimeout(() => {
            failedAuthentication && (
                setFailedAuthentication(null)
            );
        }, 3000);
    }, [failedAuthentication]);

    return (
        <section className="section-login">
            <form onSubmit={doLogin} className="input-area d-flex justify-content-center container" >
                <div className="box-form">
                    <div className="mb-4 text-center">
                        <img src="logo192.png" alt="logo" className="logo my-2" />
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
                                onClick={() => { enviaCodigo(otp) }}
                            />
                    }
                </div>
            </form>
        </section>
    )
};

export default Login;


/*export default function LoginComponent(props) {

    const [loading, setLoading] = useState(false)
    const [clientes, setCliente] = useState([])
    const [userEmail, setUserEmail] = useState('')
    const navigate = useNavigate()

    useEffect(() => {

    }, [])
function Cliente(userEmail, userPass)
{
    axios.get(ip + '/clientes/cliente?mail=monteiro@gmail.com&pass=123abcd', authHeader())
    .then(res => {
        setCliente(res.data.data)
    })
    .catch(console.log)
    alert(userEmail)
    alert(userPass)

}
    function HandleLogin(e) {
        e.preventDefault()
        setLoading(true)
        let btn = e.nativeEvent.submitter
        let btnText = document.getElementById('login-btn-text')

        

        AuthService
            .login1(userEmail)
            .then(res => {

                if (res.success) {
                    props.setLogin(true)
                    navigate('/back-office/clientes')
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
            .catch(error => { setLoading(false); alert(error); })
    }
    
    return (
        <div className='container-fluid vh-100 col overflow-auto  px-5 pt-4 text-dark' style={{ backgroundColor: "#C3D4A8" }}>
            <form onSubmit={HandleLogin} className="input-area d-flex justify-content-center container"></form>
            <div className='justify-content-top align-items-center   d-flex flex-column '>
                <img src={Logo} alt="logo" className="logo w-25 mb-2" />
                <div className='h3 text-dark'>
                    Login
                </div>
                <br></br>





                <input
                    // id='user-username-input'

                    className='form-control focus-warning text-dark w-25 rounded-3'
                    type='text'
                    placeholder='Email'
                    autoComplete='none'
                    autoCapitalize='words'
                    required
                    onChange={e => { setEmail(e.target.value) }}
                    onInput={e => {
                        if (!e.target.validity.valid) {
                            e.target.classList.add('focus-danger')

                            if (e.target.validity.valueMissing) {
                                e.target.setCustomValidity('O Email é de preenchimento obrigatório.')
                                e.target.reportValidity()
                            } else {
                                e.target.setCustomValidity('')
                                e.target.classList.remove('focus-danger')
                            }
                        }
                    }}
                />


                <br></br>
                <input type="submit" value="Continuar" className="btn btn-success w-20  fw-semibold" />
            </div>
        </div >

    )
}*/