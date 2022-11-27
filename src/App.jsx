import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'assets/styles/index.scss';
import Header from 'views/components/Header';
import Error from 'views/pages/Error';
import HomePage from 'views/pages/Home';
import Footer from 'views/components/Footer';
import GroupList from 'views/pages/GroupList';
import Group from 'views/pages/Group';

function App() {
  return (
    <div id="App">
      <BrowserRouter>
        <Header />
        <div className="app-content">
          <Routes>
            <Route path="/news-feed" />
            <Route path="/tutorial" />
            <Route path="/groups" element={<GroupList />} />
            <Route path="/group/:id" element={<Group />} />
            <Route path="/sign-in" />
            <Route path="/sign-up" />
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
