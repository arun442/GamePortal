import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route,useLocation} from "react-router-dom";
import React ,{useState,useEffect } from 'react';
import CrashGame from './component/CrashGame';
import Login from './component/Login'
import Listofgames from './component/Listofgames';
import { ToastContainer, toast } from 'react-toastify';
import Guessthecard from './component/Guessthecard';
import HighorLow from './component/cards/Cards';
import BombvsGem from './component/BombvsGem/BombvsGem';
import Keno from './component/Keno/Keno'
function App() {
 

  return (
    <div className="App">
      <ToastContainer/>
       <div className='main' >
         <Routes>
           <Route exact path="/crashgame" element={<CrashGame />}/>
           <Route exact path="/allgames" element={<Listofgames />}/>
           <Route exact path='/Guessthecard' element={<Guessthecard/>}/>
           <Route exact path='/HighorLow' element={<HighorLow/>}/>
           <Route exact path='/BombvsGem' element={<BombvsGem/>}/>
           <Route exact path='/Keno' element={<Keno/>}/>
           <Route exact path="/" element={<Login />}/>


         </Routes>
         </div>
         </div>

  );
}

export default App;
