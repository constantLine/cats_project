import express, { Request, Response } from "express";
import path from "path";
import fs from "fs";


const app = express();
app.listen('/tmp/frontend.sock')
app.set('views', path.join(__dirname, '/'));
app.set('view engine', 'jade');


// Установка пути до сокета
const socketPath = '/tmp/frontend.sock';

// Проверка существования сокета
if (fs.existsSync(socketPath)) {
    fs.unlinkSync(socketPath); // Удаляем существующий сокет, если он уже существует
}

const port: number = 3000;
const backendUrl = "http://backend/cat_get";  // Обращение к бэкенду через Nginx на порту 80

app.get('/', async (req: Request, res: Response) => {
    try {
        const cat_data = await fetch(backendUrl);
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

