import axios from 'axios';
// import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import ip from '../../ip'
import authHeader from '../auth-header';
import { Link } from "react-router-dom"
import authService from '../auth.service';
import { useParams } from "react-router-dom";

export default function PontoInteresseComponent() {
    const [ponto, setPonto] = useState([])
    const [Utilizador, setUtilizador] = useState([])
    const [Tipo, setTipo] = useState([])
    const [Regiao, setRegiao] = useState([])
    const { id } = useParams();
    useEffect(() => {

        axios.get('http://localhost:8000/pontos/list1?id=' + id, authHeader())
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    setPonto(data);
                    setUtilizador(data.utilizadore);
                    setRegiao(data.regio);
                    setTipo(data.tipos_pontos_interesse);
                } else {
                    alert("Error Web Service!");
                }
            })
            .catch(error => {
                alert(error)
            });



    }, [id])


    return (

        <div className="col overflow-auto h-sm-100 px-5 pt-4" style={{ backgroundColor: "#46483C" }}>
            
            <div className="mb-3 row">
                <div className='col-6'>
                    <span className='h5 fw-semibold' style={{ color: "#D3D4A9" }}>
                        Ponto de Interesse - {ponto.ponto_interesse}
                &nbsp;&nbsp;
                        <Link to=''><i class="bi bi-pencil-fill  fs-5" style={{ color: "#ECB357"}}></i></Link>
                    </span>
                    <br />
                    <br />
                    <span className='h6 fw-semibold' style={{ color: "#D3D4A9" }}>
                        Tipo: {Tipo.tipo_ponto_interesse}
                    </span>
                    <br />
                    <span className='h6 fw-semibold' style={{ color: "#D3D4A9" }}>
                        Região: {Regiao.regiao}
                    </span>
                    <br />
                    <span className='h6 fw-semibold' style={{ color: "#D3D4A9" }}>
                        Agente: {Utilizador.nome}
                    </span>
                    <br />
                    <span className='h6 fw-semibold' style={{ color: "#D3D4A9" }}>
                        Morada: {ponto.morada}
                    </span>
                    <br />
                    <span className='h6 fw-semibold' style={{ color: "#D3D4A9" }}>
                        Telefone: {ponto.telefone}
                    </span>
                    <br />
                    <span className='h6 fw-semibold' style={{ color: "#D3D4A9" }}>
                        Pontos: {ponto.pontos}
                    </span>
                    <br />
                    <br />
                    <span className='h6 fw-semibold' style={{ color: "#D3D4A9" }}>
                        Descrição: {ponto.descricao}
                    </span>
                    <br />
                    <br />
                    <div class="row">
                        <div class="col-sm">
                            <span className='h6 fw-semibold' style={{ color: "#D3D4A9" }}>
                                QrCode:
                                <img className="photo" width={"100%"} height={"100%"} src={ponto.qrcode} />
                            </span>
                        </div>
                        <div class="col-sm">
                            
                        </div>
                        <div class="col-sm">
                            
                        </div>
                    </div>
                    <br />
                    <br />
                    <div class="container">
                        <div class="row">
                            <div class="col-sm">
                                <span className='h6 fw-semibold' style={{ color: "#D3D4A9" }}>
                                    Fotografia 1:
                                    <img className="photo" width={"100%"} height={"100%"} src={ponto.fotografia_1} />
                                </span>
                                
                            </div>
                            <div class="col-sm">
                                <span className='h6 fw-semibold' style={{ color: "#D3D4A9" }}>
                                    Fotografia 2:
                                    <img className="photo" width={"100%"} height={"100%"} src={ponto.fotografia_2} />
                                </span>
                            </div>
                            <div class="col-sm">
                                <span className='h6 fw-semibold' style={{ color: "#D3D4A9" }}>
                                    Fotografia 3:
                                    <img className="photo" width={"100%"} height={"100%"} src={ponto.fotografia_3} />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>



            </div>


        </div>
    )

}