import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import ip from '../../ip'
import Livraria from '../../assets/imgs/livraria.jpg'
import Logo from '../../assets/imagens/logo.png'
import V1 from '../../assets/imagens/values-1.png'
import V2 from '../../assets/imagens/values-2.png'
import V3 from '../../assets/imagens/values-3.png'
import Android from '../../assets/imagens/android.png'
import hero_imagem from '../../assets/imagens/hero-img.png'
import AuthService from "../../view/auth.service";
import Style from '../../styles/style.css';


export default function FrontPage(props) {
    const [landing, setlp] = useState([])
    const [forms, setForms] = useState([])
    const [loading, setLoading] = useState(false)
    const [Email, setEmail] = useState('')
    const [Pass, setPass] = useState('')
    const navigate = useNavigate()
    useEffect(() => {
        document.title = 'Cursar'

        axios.get(ip + '/forms/all_form_names')
            .then(res => { setForms(res.data) })

    }, [])

    function nomeTransform(nome = '') {
        // TODO: transformar o nome com regex
        // maneira rápida de conseguir alterar o nome
        const newNome = nome
            .replaceAll(' ', '-')
            .replaceAll('---', '-')
            .replaceAll('ç', 'c')
            .replaceAll('ã', 'a')
            .replaceAll('í', 'i')
            .toLocaleLowerCase()
        return newNome
    }
    function Cancelar() {
        setEmail("")
        setPass("")

    }
    function handleLogin(e) {
        e.preventDefault()
        setLoading(true)
        let btn = e.nativeEvent.submitter
        let btnText = document.getElementById('login-btn-text')

        e.nativeEvent.submitter.classList.add('btn-danger')

        setTimeout(() => {
            e.nativeEvent.submitter.classList.remove('btn-danger')
        }, 3000);
        console.log("3")
        AuthService
            .login(Email, Pass)
            .then(res => {
                console.log("4")
                if (res.success) {
                    console.log("1")
                    props.setLogin(true)
                    navigate('/back-office/clientes')
                } else {
                    console.log(res)
                    setLoading(false)

                    btn.classList.add('btn-danger')
                    btnText.textContent = res.response.data.message



                }

            })
            .catch(error => { setLoading(false); alert(error); })
    }
    /*function RestantesFormulários() {

        return (
            forms.map(form => {
                if (form.id < 4) { return (<div key={form.id} className='d-none'></div>) }
                return (
                    <div className='col' key={form.id}>
                        <div className='bg-transparent border border-warning border-3 p-4 pb-2 rounded-4'>
                            <div className='fs-2 fw-bold mb-3 text-dark'>
                                {form.titulo}
                            </div>
                            <div className='fs-5 fw-normal text-dark lh-sm mb-4'>
                                {form.descricao}
                            </div>

                            <Link
                                to={'/servicos-personalizados/' + nomeTransform(form.titulo)}
                                state={{id: form.id}}
                                className='btn btn-warning fw-semibold rounded-3 mb-3 w-100'
                            >
                                Vamos lá!
                            </Link>

                        </div>
                    </div>
                )
            })
        )
    }*/

    return (
        <div className='container-fluid'>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css"></link>
            <header id="header" className="header fixed-top">
                <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
                    <a href="index.html" className="logo d-flex align-items-center">
                        <img src={Logo} alt="" />
                    </a>
                    <nav id="navbar" className="navbar">
                        <ul>
                            <li>
                                <a className="getstarted" href="/backoffice/">
                                    <span className="material-symbols-outlined">
                                        admin_panel_settings
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
            <section id="hero" className="hero d-flex align-items-center">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 d-flex flex-column justify-content-center">
                            <h1 data-aos="fade-up">Hero Titulo</h1>
                            <h2 data-aos="fade-up" data-aos-delay={400}>
                               Hero Descricao
                            </h2>
                            <div data-aos="fade-up" data-aos-delay={600}>
                                <div className="android">
                                    <a href="https://play.google.com/store/apps">
                                        <img src={Android} className="img-fluid" alt="" />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div
                            className="col-lg-8 hero-img"
                            data-aos="zoom-out"
                            data-aos-delay={200}
                        >
                            <img src={hero_imagem} className="img-fluid" alt="" />
                        </div>
                    </div>
                </div>
            </section>
            <main id="main">
                <section id="values" className="values">
                    <div className="container" data-aos="fade-up">
                        <header className="section-header">
                            <h2>Body Titulo</h2>
                            <p>Body Descricao</p>
                        </header>
                        <div className="row">
                            <div className="col-lg-4" data-aos="fade-up" data-aos-delay={200}>
                                <div className="box">
                                    <img
                                        src={V1}
                                        className="img-fluid"
                                        alt=""
                                    />
                                </div>
                            </div>
                            <div
                                className="col-lg-4 mt-4 mt-lg-0"
                                data-aos="fade-up"
                                data-aos-delay={400}
                            >
                                <div className="box">
                                    <img
                                        src={V2}
                                        className="img-fluid"
                                        alt=""
                                    />
                                </div>
                            </div>
                            <div
                                className="col-lg-4 mt-4 mt-lg-0"
                                data-aos="fade-up"
                                data-aos-delay={600}
                            >
                                <div className="box">
                                    <img
                                        src={V3}
                                        className="img-fluid"
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <footer id="footer" className="footer">
                <div className="footer-top">
                    <div className="container">
                        <div className="row gy-4">
                            <div className="col-lg-5 col-md-12 footer-info">
                                <a href="index.html" className="logo d-flex align-items-center">
                                    <img src={Logo} alt="" />
                                </a>
                                <p>Pequeno texto descritivo sobre Cursar</p>
                                <div className="social-links mt-3">
                                    <a href="https://facebook.com" className="facebook">
                                        <i className="bi bi-facebook" />
                                    </a>
                                    <a href="https://instagram.com" className="instagram">
                                        <i className="bi bi-instagram" />
                                    </a>
                                </div>
                            </div>
                            <div className="col-lg-2 col-6 footer-links">
                                <h4>LINKS ÚTEIS</h4>
                                <ul>
                                    <li>
                                        <i className="bi bi-chevron-right" /> <a href="/">Inicio</a>
                                    </li>
                                    <li>
                                        <i className="bi bi-chevron-right" />{" "}
                                        <a href="/politica-privacidade">Política de privacidade</a>
                                    </li>
                                    <li>
                                        <i className="bi bi-chevron-right" />{" "}
                                        <a href="/termos-condicoes">Termos e condições</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-lg-3 col-md-12 footer-contact text-center text-md-start">
                                <h4>Contactos</h4>
                                <p>
                                    Av. da Sustentabilidade, 45 <br />
                                    3500-500 Viseu
                                    <br />
                                    Portugal <br />
                                    <br />
                                    Telefone: <a href="tel:+351 232232232">+351 232232232</a>
                                    <br />
                                    Email: <a href="mailto:info@cursar.pt">info@cursar.pt</a>
                                    <br />
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="credits">
                        Página desenvolvida por: Grupo 2 - PI4/TDM (2022/2023)
                    </div>
                </div>
            </footer>
        </div>
    )

}        