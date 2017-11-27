import React from 'react';
import ReactDOM from 'react-dom';
import TopBar from './TopBar'
import UPCScanner from './UPCScanner'
//import './index.css';

ReactDOM.render(
  <div>
    <TopBar />
    <UPCScanner />
  </div>,
  document.getElementById('root')
);
