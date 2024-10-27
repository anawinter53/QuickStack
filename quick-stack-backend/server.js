const express = require('express');
const axios = require('axios');
const cors = require('cors');
const cookieSession = require('cookie-session');
const dotenv = require('dotenv');
dotenv.config();
const app = express();

// set ports in .env or use typical port numbers if it is not set
const FRONTEND_PORT = process.env.FRONTEND_PORT || 3000;
const BACKEND_PORT = process.env.BACKEND_PORT || 3001;  
const TOKEN = process.env.TOKEN;  


app.use(express.json());

// test backend to frontend connection
app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});

// cors middleware
app.use(cors({
    origin: `http://localhost:${FRONTEND_PORT}`,
    credentials: true
}));
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    keys: [process.env.SESSION_SECRET],
    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
    secure: process.env.NODE_ENV === 'production',  
}));

// redirect user to GitHub for authentication
app.get('/auth/github', (req, res) => {
    console.log('run get request');

    const redirectUri = `http://localhost:${BACKEND_PORT}/auth/callback`; // use backend port for callback
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=${redirectUri}`);
});

// handle the callback from GitHub
app.get('/auth/callback', async (req, res) => {
    console.log('Callback hit');
    const code = req.query.code;

    if (!code) {
        console.error('No code returned from GitHub'); // Log if no code is returned
        return res.status(400).json({ error: 'No code returned from GitHub' });
    }

    try {
        const tokenResponse = await axios.post('https://github.com/login/oauth/access_token', {
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            code,
        }, {
            headers: { accept: 'application/json' }
        });

        const accessToken = tokenResponse.data.access_token;
        console.log('Access Token set in session:', req.session.accessToken);
        console.log('access token created:', accessToken);

        if (!accessToken) {
            return res.status(400).json({ error: 'Failed to retrieve access token from GitHub' });
        }

        req.session.accessToken = accessToken;
        console.log('Access Token set in session:', req.session.accessToken); // Confirm it is set
        res.redirect(`http://localhost:${FRONTEND_PORT}`);
    } catch (error) {
        console.error('Error fetching access token:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// endpoint to create a GitHub repo
app.post('/create-repo', async (req, res) => {
    console.log('Received a request to create a repo', req.body);
    const { repoName } = req.body;
    const accessToken = req.session.accessToken;

    console.log(accessToken)

    if (!accessToken) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const repoData = {
        name: repoName,
        private: false,
    };

    try {
        

        const response = await axios.post('https://api.github.com/user/repos', repoData, {
            headers: {
                Authorization: `Bearer ${TOKEN}`,
                'Accept': 'application/vnd.github+json',
                'Content-Type': 'application/json',
                "X-GitHub-Api-Version": "2022-11-28"
            },
        });
        console.log(response)

        res.json({ message: 'Repository created', url: response.data.html_url });
    } catch (error) {
        console.log(error)
        if (error.response) {
            // errors returned from GitHub's API
            res.status(error.response.status).json({
                error: error.response.data.message || 'GitHub API error',
                details: error.response.data.errors || 'No additional details',
            });
        } else if (error.request) {
            // network errors or no response from GitHub
            res.status(500).json({ error: 'No response from GitHub', details: error.message });
        } else {
            // other unexpected errors
            res.status(500).json({ error: 'Unexpected error', details: error.message });
        }
    }
});

// start the server on the backend port
app.listen(BACKEND_PORT, () => {
    console.log(`Server is running on http://localhost:${BACKEND_PORT}`);
});
