import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import 'assets/styles/index.scss';
import Header from 'views/components/Header';
import Error from 'views/pages/Error';

function App() {
  return (
    <div id="App">
      <BrowserRouter>
        <Header /> 
        <Routes>
          <Route path="/news-feed"/>
          <Route path="/tutorial"/>
          <Route path="/sign-in"/>
          <Route path="/sign-up"/>
          <Route path="/"/>
          <Route path="*" element={<Error/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
