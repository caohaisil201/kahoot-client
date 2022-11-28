import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'assets/styles/index.scss';
import Header from 'views/components/Header';
import Error from 'views/pages/Error';
import HomePage from 'views/pages/Home';
import Footer from 'views/components/Footer';
import GroupList from 'views/pages/GroupList';
import Group from 'views/pages/Group';
import SignUp from 'views/pages/SignUp';
import SignIn from 'views/pages/SignIn';
import PrivateRoute from 'middlewares/Auth';

function App() {
  return (
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
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/news-feed" />
            <Route path="/tutorial" />
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
