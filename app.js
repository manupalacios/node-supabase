import dotenv from 'dotenv';

dotenv.config();

import express from 'express';
import { createClient } from '@supabase/supabase-js'
import morgan from 'morgan'
import bodyParser from "body-parser";

const app = express();

const { SUPABASE_URL, SUPABASE_KEY, APP_PORT } = process.env;

// using morgan for logs
app.use(morgan('combined'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

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
