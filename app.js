import express from 'express';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js'
import morgan from 'morgan'
import cors from './middleware/cors.js'

dotenv.config();

const app = express();

const { SUPABASE_URL, SUPABASE_KEY, APP_PORT, NODE_ENV } = process.env;

if (NODE_ENV === 'development') {
    app.use(cors)
}

// using morgan for logs
app.use(morgan('combined'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const supabase = createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

app.get('/conceptos', async (req, res) => {
    const {data, error} = await supabase
        .from('bbr_conceptos')
        .select()
    res.send(data);
});

app.get('/conceptos/:id', async (req, res) => {
    const {data, error} = await supabase
        .from('bbr_conceptos')
        .select()
        .is('id', req.params.id)
    res.send(data);
});

app.post('/conceptos', async (req, res) => {
    const data = req.body;
    const {error} = await supabase
        .from('bbr_conceptos')
        .insert(data)
    if (error) {
        res.send(error);
    }
    res.send("created!!");
});

app.put('/conceptos/:id', async (req, res) => {
    const data = req.body;
    const {error} = await supabase
        .from('bbr_conceptos')
        .update(data)
        .eq('id', req.params.id)
    if (error) {
        res.send(error);
    }
    res.send("updated!!");
});

app.delete('/conceptos/:id', async (req, res) => {
    const {error} = await supabase
        .from('bbr_conceptos')
        .delete()
        .eq('id', req.params.id)
    if (error) {
        res.send(error);
    }
    res.send("deleted!!")

});

app.get('/', (req, res) => {
    res.send("Hello from Supabase API <3");
});

app.get('*', (req, res) => {
    res.send("Hello again I am working to the moon and behind <3");
});

app.listen(APP_PORT || 3000, () => {
    console.log(`> Ready on http://localhost:${APP_PORT || 3000}`);
});
