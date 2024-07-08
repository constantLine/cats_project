import express, { Request, Response } from "express";
import path from "path";

const app = express();
app.set('views', path.join(__dirname, '/'));
app.set('view engine', 'jade');

const port: number = 3000;
const backendSocket = "/tmp/backend.sock";  // Путь к UNIX-сокету бэкенда

app.get('/', async (req: Request, res: Response) => {
    try {
        const cat_data = await fetch(`http://unix:/${backendSocket}/cat_get`, { method: 'GET', socketPath: backendSocket });
        const data = await cat_data.text();
        res.render('../index.jade', { title: "KIT Frontend", cat_url: data });
    } catch (error) {
        console.error('Error fetching data from backend:', error);
        res.status(500).send('Error fetching data from backend');
    }
});

app.listen('/tmp/frontend.sock', () => {
    console.log(`Frontend app listening on socket`);
});

