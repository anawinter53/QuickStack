import React, { useEffect, useState } from 'react';
import ButtonComponent from './ButtonComponent';

const App = () => {
    const [data, setData] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000')  // Adjust the URL as needed
            .then(response => response.text())
            .then(data => setData(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <ButtonComponent />
        </div>
    );
};

export default App;
