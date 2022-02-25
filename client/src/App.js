import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './components/landing_page/LandingPage';
import Home from './components/home/Home';
// import Nav from './components/nav_bar';
import Detail from './components/detail/Detail';
import Form from './components//form/Form';
import NavBar from './components/nav_bar/NavBar';
// import GlobalState from './contexts/GlobalState';
// import Loading from './components/Loading';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
        </Routes>
        <NavBar></NavBar>
        <Routes>
          {/* <Route path="/" element={<Nav />}/> */}
          <Route path="/home" element={<Home />} />
          <Route path="/home/:id" element={<Detail />} />
          <Route path="/new" element={<Form />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
