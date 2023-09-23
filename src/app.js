import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan'
import cors from './middleware/cors.js'
import api from './api.js'

dotenv.config();

const app = express();

const { APP_PORT, NODE_ENV } = process.env;

if (NODE_ENV === 'development') {
    app.use(cors)
}

// using morgan for logs
app.use(morgan('combined'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(api)

app.get('/', (req, res) => {
    res.send("Hello from Supabase API <3");
});

app.get('*', (req, res) => {
    res.send("Hello again I am working to the moon and behind <3");
});

app.listen(APP_PORT || 3000, () => {
    console.log(`> Ready on http://localhost:${APP_PORT || 3000}`);
});
