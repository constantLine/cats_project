import * as express from "express";
import * as path from "path";
import * as http from "http";

const app = express();
app.set('views', path.join(__dirname, '/'));
app.set('view engine', 'jade');

// Прокси для взаимодействия с backend через UNIX сокет
const backendProxy = (req, res) => {
  const options = {
    socketPath: '/var/run/backend.sock',
    path: '/cat_get',
    method: 'GET',
  };

  const proxyReq = http.request(options, (proxyRes) => {
    proxyRes.pipe(res, { end: true });
  });

  proxyReq.on('error', (err) => {
    console.error(err);
    res.sendStatus(500);
  });

  proxyReq.end();
};

app.get('/', async (req, res) => {
  backendProxy(req, res);
});

app.listen('/var/run/frontend.sock', () => {
  console.log('Frontend app listening on /var/run/frontend.sock');
});

