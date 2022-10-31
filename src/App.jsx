import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Error from 'views/pages/Error';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/"/>
          <Route path="*" element={<Error/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
