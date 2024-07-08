import * as express from "express";
import * as path from "path";
import fetch from "node-fetch";

const app = express();
app.set('views', path.join(__dirname, '/'));
app.set('view engine', 'jade');

const port: number = 3000;
const backendUrl = "http://backend/api/cat_get";

app.get('/', async (req, res) => {
    const cat_data = await fetch(backendUrl);
    const data = await cat_data.text();

    res.render('index.jade', { title: "KIT Frontend", cat_url: data });
});

app.listen(port, () => {
    console.log(`Frontend app listening on port ${port}`)
});


