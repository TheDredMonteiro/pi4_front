import axios from 'axios';
import { Chart } from 'react-google-charts';
import '../../styles/graficos.css';
import React, { useEffect, useState } from 'react';
import authHeader from '../../view/auth-header'


export default function DashboardComponent() {
  //grafico utilizadores
  

  //grafico vouchers
  

  //grafico Roles
  const [contAdmin, setAdmin] = useState(0);
  const [contResponsavel, setResponsavel] = useState(0);
  const [contAgente, setAgente] = useState(0);
  const [contUtilizador, setUtilizador] = useState(0);
  const [contTipo1, setTipo1] = useState(0);
  const [contTipo2, setTipo2] = useState(0);
  const [contTipo3, setTipo3] = useState(0);
  const [contTipo4, setTipo4] = useState(0);
  const [contTipo5, setTipo5] = useState(0);
  const [contTipo6, setTipo6] = useState(0);
  const [contTipo7, setTipo7] = useState(0);
  const [contTipo8, setTipo8] = useState(0);
  const [contTipo9, setTipo9] = useState(0);
  const [contTipo10, setTipo10] = useState(0);
  const [contTipo11, setTipo11] = useState(0);
  const [contTipo12, setTipo12] = useState(0);
  const [contTipo13, setTipo13] = useState(0);
  const [contTipo14, setTipo14] = useState(0);
  const [contTipo15, setTipo15] = useState(0);
  const [contTipo16, setTipo16] = useState(0);
  const [contTipo17, setTipo17] = useState(0);
  const [contTipo18, setTipo18] = useState(0);
  const [contTipo19, setTipo19] = useState(0);
  const [contTipo20, setTipo20] = useState(0);


  useEffect(() => {
    axios
      .get("http://localhost:8000/user/count?role=1", authHeader())
      .then((res) => {
        setAdmin(res.data.count);
      });

    axios
      .get("http://localhost:8000/user/count?role=2", authHeader())
      .then((res) => {
        setResponsavel(res.data.count);
      });

      axios
      .get("http://localhost:8000/user/count?role=3", authHeader())
      .then((res) => {
        setAgente(res.data.count);
      });

    axios
      .get("http://localhost:8000/user/count?role=4", authHeader())
      .then((res) => {
        setUtilizador(res.data.count);
      });
      
  }, []);

  const data3 = [
    ['Role', 'Numero de utilizadores'],
    ['Admin', contAdmin],
    ['Responsavel', contResponsavel],
    ['Agente', contAgente],
    ['Utilizador', contUtilizador],
  ]

  const options3 = {
    colors: ["#79894b", "#b9b200", "#d3d59b" , "#d8f59b"],
    backgroundColor: "transparent",
  }
  
  
  //grafico locais
  


  return (
    <div className="col overflow-auto h-sm-100 px-5 pt-4" style={{ backgroundColor: "#46483C" }}>
      {/* Titulo */}
      <div class="row">
        <div class="col-sm-4">
          <div class="cardI">
            <div class="containerC">
              <span style={{ fontSize: "18px" }} >
                Número de Utilizadores por Role
              </span>
              <Chart
                chartType="PieChart"
                data={data3}
                options={options3}
                width={"350px"}
                height={"300px"}
              />
            </div>
          </div>
        </div>
        <div class="col-sm-1">
          
        </div>
        <div class="col-sm-7">
        </div>
      </div>
      
          <br></br>
          <br></br>
    </div>
  )
}

