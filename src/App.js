import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import authService from './view/auth.service';
import './styles/index.css'

import PrivateRoute from './view/backoffice/private_route'
import Utilizadores from './view/backoffice/utilizadores'
import PontosInteresse from './view/backoffice/pontosinteresse'
import Recompensas from './view/backoffice/recompensas'
import Reservas from './view/backoffice/reservas'
import Visitas from './view/backoffice/visitas'
import Regioes from './view/backoffice/regioes'
import PontoInteresse from './view/backoffice/pontointeresse'
import EditarUtilizador from './view/backoffice/editarutilizador'
import EditarRegiao from './view/backoffice/editarregiao'
import EditarRecompensa from './view/backoffice/editarecompensa'
import AddUtilizador from './view/backoffice/addutilizador'
import AddRecompensa from './view/backoffice/addrecompensa'
import AddRegiao from './view/backoffice/addregiao'
import AddVisitas from './view/backoffice/addvisita'
import Recuperar from './view/backoffice/recuperar'
import Recuperar2 from './view/backoffice/recuperar2'
import Dashboard from './view/dashboard/Dashboard';
import NavDeLadob from './view/backoffice/navdeladobackend'
import FrontPage from './view/landingpage/frontpage'
import LandingPage from './view/landingpage/landingpage'
import Login from './view/login/Login';
import Login2 from './view/login/Login2';

import UsersModalComponent from './view/backoffice/users_modal'
import CriarUserModalComponent from './view/backoffice/criar_user_modal'
import EliminarUserModalComponent from './view/backoffice/eliminar_user_modal'


export default function App() {

	const [perguntasObject, setPerguntasObj] = useState({})
	const [login, setLogin] = useState(process.env.REACT_APP_MODE === 'development' || (!!authService?.getCurrentUser() ?? false))

	useEffect(() => {
		// console.log('user', process.env.REACT_APP_MODE === 'development' || (authService?.getCurrentUser() ?? false))
		console.log('user', !!authService?.getCurrentUser() ?? false)
		console.log('login', login)
	}, [login])

	function BackOffice(props) {
		return (
			<PrivateRoute auth={login}>
				<div className='container-fluid'>
					<div className='row vh-100'>
						<NavDeLadob />
						{props.pagina}
						<UsersModalComponent />
						<CriarUserModalComponent />
						<EliminarUserModalComponent />
					</div>
				</div>
			</PrivateRoute>
		)
	}
	function Front(props) {
		return (
			<PrivateRoute auth={login}>
				<div className='container-fluid'>
					<div className='row vh-100'>

						{props.pagina}
						<UsersModalComponent />
						<CriarUserModalComponent />
						<EliminarUserModalComponent />
					</div>
				</div>
			</PrivateRoute >
		)
	}

	//<NavDeCima auth={login} /> <Footer />
	return (
		<Router>
			<Routes>
				<Route exact path='/' element={
					<>

						<Login2 />

					</>
				} />
				<Route exact path='/backend/dashboard/:role' element={
					<>

						<BackOffice pagina={<Dashboard />} />

					</>
				} />
				<Route exact path='/recuperar' element={
					<>

						<Recuperar />

					</>
				} />
				<Route exact path='/recuperar2/:mail' element={
					<>

						<Recuperar2 />

					</>
				} />
				<Route exact path='/login' element={
					<>

						<Login />

					</>
				} />
				<Route exact path='/landingpage' element={
					<>

						<LandingPage />

					</>
				} />
				<Route path='/backend/utilizadores/:role' element={
					<BackOffice pagina={<Utilizadores />} />
				} />
				<Route path='/backend/pontointeresse/:id' element={
					<BackOffice pagina={<PontoInteresse />} />
				} />
				<Route path='/backend/reservas/:id' element={
					<BackOffice pagina={<Reservas />} />
				} />
				<Route path='/backend/visitas/:id' element={
					<BackOffice pagina={<Visitas />} />
				} />
				<Route path='/backend/editarutilizador/:id' element={
					<BackOffice pagina={<EditarUtilizador />} />
				} />
				<Route path='/backend/editarregiao/:id' element={
					<BackOffice pagina={<EditarRegiao />} />
				} />
				<Route path='/backend/editarrecompensa/:id' element={
					<BackOffice pagina={<EditarRecompensa />} />
				} />
				<Route path='/backend/pontosinteresse/:role' element={
					<BackOffice pagina={<PontosInteresse />} />
				} />
				<Route path='/backend/recompensas/:role' element={
					<BackOffice pagina={<Recompensas />} />
				} />
				<Route path='/backend/regioes/:role' element={
					<BackOffice pagina={<Regioes />} />
				} />
				<Route path='/backend/addutilizador' element={
					<BackOffice pagina={<AddUtilizador />} />
				} />
				<Route path='/backend/addrecompensa' element={
					<BackOffice pagina={<AddRecompensa />} />
				} />
				<Route path='/backend/addregiao' element={
					<BackOffice pagina={<AddRegiao />} />
				} />
				<Route path='/backend/addvisitas/:id' element={
					<BackOffice pagina={<AddVisitas />} />
				} />
				{/*
				<Route path='/back-office/frontLivros/:mail/:pass' element={

					<Front pagina={<BoFrontLivros />} />

				} />
				<Route path='/livraria/:id' element={

					<Front pagina={<BoLivraria />} />

				} />
				<Route path='/meuslivros/:id' element={

					<Front pagina={<BoMeusLivro />} />

				} />
				<Route path='/minhascategorias/:id' element={

					<Front pagina={<BoMinhasCategorias />} />

				} />
				<Route path='/recomendados/:id' element={

					<Front pagina={<BoRecomendados />} />

				} />
				<Route path='/addcategoriaF/:id' element={

					<Front pagina={<BoAddCategoriaF />} />

				} />

				
				<Route path='/back-office/registar' element={
					<BoRegistar />
				} />
				<Route path='/back-office/registar2/:mail/:pass' element={
					<BoRegistar2 />
				} />

				
				<Route path='/back-office/addlivro' element={
					<BackOffice pagina={<BoAddLivro />} />
				} />
				<Route path='/back-office/addcategoria' element={
					<BackOffice pagina={<BoAddCategoria />} />
				} />
				
				<Route exact path='/back-office/clientes' element={
					<BackOffice pagina={<BoClientes />} />
				} />
				<Route exact path='/back-office/livros' element={
					<BackOffice pagina={<BoLivros />} />
				} />
				<Route exact path='/back-office/estatisticas' element={
					<BackOffice pagina={<BoEstatisticas />} />
				} />
				

				{/* Rotas secundárias *
				
				<Route path='/back-office/lc_cliente/:idCliente' element={
					<BackOffice pagina={<BoLC />} />
				} />
				*/}

				{/* se o link nao existir, volta à pagina inicial */}
				<Route path='*' element={<Navigate to='/' replace={true} />} />

			</Routes>
		</Router>
	);
}

