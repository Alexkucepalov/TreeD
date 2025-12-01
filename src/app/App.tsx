import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from '@features/home';
import { Login, Register, ForgotPassword, ResetPassword, AuthSuccess, Autologin } from '@features/auth';
import { ContractorRegister } from '@features/contractor';
import { Profile } from '@features/profile';
import { BriefsPage } from '@features/briefs';
import ProtectedRouteElement from '@shared/components/ProtectedRoute';
import styles from './app.module.scss';

const App = () => {
	return (
		<Autologin>
			<div className={styles.app}>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/auth-success' element={<AuthSuccess />} />
					<Route
						path='/login'
						element={
							<ProtectedRouteElement onlyForUnauth>
								<Login />
							</ProtectedRouteElement>
						}
					/>
					<Route
						path='/register'
						element={
							<ProtectedRouteElement onlyForUnauth>
								<Register />
							</ProtectedRouteElement>
						}
					/>
					<Route
						path='/contractor-register'
						element={
							<ProtectedRouteElement onlyForUnauth>
								<ContractorRegister />
							</ProtectedRouteElement>
						}
					/>
					<Route
						path='/forgot-password'
						element={
							<ProtectedRouteElement onlyForUnauth>
								<ForgotPassword />
							</ProtectedRouteElement>
						}
					/>
					<Route
						path='/reset-password'
						element={
							<ProtectedRouteElement onlyForUnauth>
								<ResetPassword />
							</ProtectedRouteElement>
						}
					/>

					<Route
						path='/profile/*'
						element={
							<ProtectedRouteElement onlyForAuth>
								<Profile />
							</ProtectedRouteElement>
						}
					/>
					<Route
						path='/briefs'
						element={
							<ProtectedRouteElement onlyForAuth>
								<BriefsPage />
							</ProtectedRouteElement>
						}
					/>
				</Routes>

			</div>
		</Autologin>
	);
};

export default App;
