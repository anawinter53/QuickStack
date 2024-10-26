import React, { useEffect } from 'react';
import ButtonComponent from './ButtonComponent';

const App = () => {
  // const [data, setData] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000') 
        .then(response => response.text())
        // .then(data => setData(data))
        .catch(err => console.error(err));
  }, []);

  return (
    <div>
        <ButtonComponent />
        {/* <p>{data}</p> */}
    </div>
  );
};

export default App;
