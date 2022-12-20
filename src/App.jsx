import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SocketProvider from 'store/socket';
import Header from 'views/components/Header';
import Error from 'views/pages/Error';
import HomePage from 'views/pages/Home';
import Footer from 'views/components/Footer';
import GroupList from 'views/pages/GroupList';
import Group from 'views/pages/Group';
import SignUp from 'views/pages/SignUp';
import SignIn from 'views/pages/SignIn';
import PrivateRoute from 'middlewares/Auth';
import Activate from 'views/pages/Activate';
import InviteByLink from 'views/pages/InviteByLink';
import PresentationList from 'views/pages/PresentationList';
import Presentation from 'views/pages/Presentation';
import JoinPresentation from 'views/pages/JoinPresentation';
import Game from 'views/pages/Game';
import ResetPassword from 'views/pages/ResetPassword';
import ForgotPassword from 'views/pages/ForgotPassword';
import 'assets/styles/index.scss';


function App() {
  return (
    <SocketProvider>
      <div id="App">
        <BrowserRouter>
          <Header />
          <div className="app-content">
            <Routes>
              <Route
                path="/groups"
                element={
                  <PrivateRoute>
                    <GroupList />
                  </PrivateRoute>
                }
              />
              <Route
                path="/group/:id"
                element={
                  <PrivateRoute>
                    <Group />
                  </PrivateRoute>
                }
              />
              <Route
                path="/presentations"
                element={
                  <PrivateRoute>
                    <PresentationList />
                  </PrivateRoute>
                }
              />
              <Route
                path="/join-presentation"
                element={
                  <PrivateRoute>
                    <JoinPresentation />
                  </PrivateRoute>
                }
              />
							
						<Route
							path="/presentation/:code"
							element={
								<PrivateRoute>
									<Presentation />
								</PrivateRoute>
							}
						/>
						<Route path="/sign-in" element={<SignIn />} />
						<Route path="/sign-up" element={<SignUp />} />
						<Route path="/reset-password" element={<ResetPassword />} />
						<Route path='/forgot-password' element={<ForgotPassword />} />
						<Route path="/invite/:groupCode" element={<InviteByLink />} />
						<Route path="/activate/:token" element={<Activate />} />
						<Route path="/news-feed" />
						{/*Put in PrivateRoute later*/}
						<Route path="/" element={<HomePage />} />
						<Route path="*" element={<Error />} />
					</Routes>
				</div>
				<Footer />
			</BrowserRouter>
		</div>
	);
}

export default App;
