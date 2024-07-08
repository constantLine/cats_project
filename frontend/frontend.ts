import express, { Request, Response } from "express";
import path from "path";

const app = express();
app.set('views', path.join(__dirname, '/'));
app.set('view engine', 'jade');

const port: number = 3000;
const backendUrl = "http://backend/api/cat_get";

app.get('/', async (req: Request, res: Response) => {
    try {
        const fetch = (await import("node-fetch")).default; // Динамический импорт node-fetch
        const cat_data = await fetch(backendUrl);
        const data = await cat_data.text();
        res.render('index.jade', { title: "KIT Frontend", cat_url: data });
    } catch (error) {
        res.status(500).send('Error fetching data from backend');
    }
});

app.listen(port, () => {
    console.log(`Frontend app listening on port ${port}`);
});




