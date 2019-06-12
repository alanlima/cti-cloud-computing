import React from 'react';
import './App.css';
import CoursePage from './pages/course-page';

function App() {
  return (
    <div>
      <div id="nav">
        <img 
          style={{height: 40}}
          src="https://my.cti.qld.edu.au/pluginfile.php/1/core_admin/logocompact/0x70/1559616009/logo-lg-white.png" 
          alt="CTI Logo" />
      </div>
      <div id="page-content">
        <CoursePage />
      </div>
    </div>
  );
}

export default App;
