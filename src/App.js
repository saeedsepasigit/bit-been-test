import logo from './logo.svg';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import './App.css';
import { Fragment } from 'react';
import Markets from './components/Markets/Markets';
import Navigation from './components/Navigation/Navigation';

import "bootstrap/dist/css/bootstrap.min.css"
import { Container } from 'react-bootstrap';


function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <div className='root'>
          <Navigation />
          <Container dir='rtl' className='mt-2 p-1'>
            <Routes>
              <Route path='/' element={<Markets />} />
            </Routes>
          </Container>
        </div>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
