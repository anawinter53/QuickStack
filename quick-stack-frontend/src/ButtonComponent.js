import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ButtonComponent = () => {
    const handleClickOne = () => {
        alert('Button 1 Clicked!');
    };

    const handleClickTwo = () => {
        alert('Button 2 Clicked!');
    };

    return (
        <div className="container mt-4">
            <button 
                className="btn btn-primary me-2" 
                onClick={handleClickOne}
            >
                Button 1
            </button>
            <button 
                className="btn btn-secondary" 
                onClick={handleClickTwo}
            >
                Button 2
            </button>
        </div>
    );
};

export default ButtonComponent;
