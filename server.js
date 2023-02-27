const express = require('express');
const path = require('path');
const port = process.env.PORT || 80;

// здесь у нас происходит импорт пакетов и определяется порт нашего сервера
const app = express();

//здесь наше приложение отдаёт статику
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'dist')));

//простой тест сервера
app.get('/ping', function (req, res) {
  return res.send('pong');
});

//обслуживание html
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log('start server on port', port);
});

// const express = require('express');
// const path = require('path');
// const puppeteer = require('puppeteer');
// const port = process.env.PORT || 80;
// // const port = process.env.PORT || 8080;
//
// // In-memory cache of rendered pages. Note: this will be cleared whenever the
// // server process stops. If you need true persistence, use something like
// // Google Cloud Storage (https://firebase.google.com/docs/storage/web/start).
// const RENDER_CACHE = new Map();
//
// async function ssr(url) {
//   if (RENDER_CACHE.has(url)) {
//     return {html: RENDER_CACHE.get(url), ttRenderMs: 0};
//   }
//
//   const start = Date.now();
//
//   const browser = await puppeteer.launch({
//     args: ['--no-sandbox', '--disable-setuid-sandbox'],
//   });
//   const page = await browser.newPage();
//   try {
//     // networkidle0 waits for the network to be idle (no requests for 500ms).
//     // The page's JS has likely produced markup by this point, but wait longer
//     // if your site lazy loads, etc.
//     await page.goto(url, {waitUntil: 'networkidle2'});
//     await page.waitForSelector('#layout'); // ensure #posts exists in the DOM.
//   } catch (err) {
//     console.error(err);
//     throw new Error('page.goto/waitForSelector timed out.');
//   }
//
//   const html = await page.content(); // serialized HTML of page DOM.
//   console.log(html)
//   await browser.close();
//
//   const ttRenderMs = Date.now() - start;
//   console.info(`Headless rendered page in: ${ttRenderMs}ms`);
//
//   RENDER_CACHE.set(url, html); // cache rendered page.
//
//   return {html, ttRenderMs};
// }
//
// // здесь у нас происходит импорт пакетов и определяется порт нашего сервера
// const app = express();
//
// //здесь наше приложение отдаёт статику
// app.use(express.static(__dirname));
// app.use(express.static(path.join(__dirname, 'dist')));
//
// //простой тест сервера
// app.get('/ping', function (req, res) {
//   return res.send('pong');
// });
//
// //обслуживание html
// app.get('/origin/*', function (req, res) {
//   res.sendFile(path.join(__dirname, 'dist', 'app.html'));
// });
//
// //обслуживание html
// app.get('*', async (req, res, next) => {
//   try {
//     // const local_url = `http://localhost:${port}/origin${req.originalUrl}`;
//     const local_url = `http://ovz2.igor-zvyagin.vpljm.vps.myjino.ru/origin${req.originalUrl}`;
//     const {html, ttRenderMs} = await ssr(local_url);
//     // Add Server-Timing! See https://w3c.github.io/server-timing/.
//     res.set('Server-Timing', `Prerender;dur=${ttRenderMs};desc="Headless render time (ms)"`);
//     return res.status(200).send(html); // Serve prerendered page as response.
//
//   } catch(e) {
//     console.log('error');
//     console.log(e);
//     res.sendFile(path.join(__dirname, 'dist', 'app.html'));
//   }
// });
//
// app.listen(port, () => {
//   console.log('start server on port', port);
// });
