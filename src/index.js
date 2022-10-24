import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { TownsfolkGenerator } from './components/TownsfolkGenerator';
import { BrowserRouter } from "react-router-dom"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <TownsfolkGenerator />
  </BrowserRouter>

);

