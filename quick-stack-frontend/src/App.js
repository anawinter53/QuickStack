import React, { useEffect } from 'react';
import ButtonComponent from './ButtonComponent';
import './App.css';

const App = () => {

  useEffect(() => {
    fetch('http://localhost:3000') 
        .then(response => response.text())

        .catch(err => console.error(err));
  }, []);

  return (
    <div className="container container-fluid full-height d-flex flex-column justify-content-center align-items-center">
      <div className="container intro d-flex justify-content-center align-items-center">
        <text className="display-4">Welcome to the Quick Stack prototype!</text>
      </div>
      <div className="container buttons d-flex justify-content-center align-items-center">
        <ButtonComponent />
      </div>
    </div>
  );
};

export default App;
