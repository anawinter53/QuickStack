import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

// set ports in .env or use typical port numbers if it is not set
// const FRONTEND_PORT = process.env.REACT_APP_FRONTEND_PORT || 3000;
const BACKEND_PORT = process.env.REACT_APP_BACKEND_PORT || 3001;  

const ButtonComponent = () => {
    const [repoName, setRepoName] = useState('');

    // redirect to github for login
    const handleLogin = () => {
        window.location.href = `http://localhost:${BACKEND_PORT}/auth/github`; 
    };

    const handleClickCreateRepo = async () => {
        console.log("Backend Port:", BACKEND_PORT); 
        if (!repoName) {
            alert('Please enter a repository name.');
            return;
        }

        try {
            const response = await axios.post(
                `http://localhost:${BACKEND_PORT}/create-repo`,
                { repoName },
                { withCredentials: true }
            ); 
            alert(`Repository created: ${response.data.url}`);           
        } catch (error) {
            console.error("Error creating repository:", error.response ? error.response.data : error.message);
            alert("Failed to create repository: " + (error.response ? error.response.data.message : error.message));
        }
    };

    return (
        <div className="container mt-4">
            <button className="btn btn-primary me-2" onClick={handleLogin}>
                Login with GitHub
            </button>
            <input
                type="text"
                placeholder="Enter repo name"
                value={repoName}
                onChange={(e) => setRepoName(e.target.value)}
                className="me-2"
            />
            <button className="btn btn-secondary" onClick={handleClickCreateRepo}>
                Create GitHub Repo
            </button>
        </div>
    );
};

export default ButtonComponent;
