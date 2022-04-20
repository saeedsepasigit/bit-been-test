import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import './App.css';
import { Fragment } from 'react';
import Markets from './components/Markets/Markets';
import Navigation from './components/Navigation/Navigation';
import Market from './components/Markets/Market';

import "bootstrap/dist/css/bootstrap.min.css"
import { Container } from 'react-bootstrap';
import FaverateMarkets from './components/Markets/FaverateMarkets';


function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <div className='root'>
          <Navigation />
          <Container dir='rtl' className='mt-2 p-1'>
            <Routes>
              <Route path='/' element={<Markets />} />
              <Route path='/faverates'  element={<FaverateMarkets />} />
              <Route path='/market' element={<Market /> } />
            </Routes>
          </Container>
        </div>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
