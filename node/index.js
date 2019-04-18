const app = require('express')();

//Ok necesitamos importar express y la cuestión pa postgresql por ahora
//También necesito ver el enunciado porque im stupid
app.get('/', (req, res) => {
	res.setHeader('Content-Type','text/html');
	res.end("<h1>ola</h1>");
});

app.get('/login', (req, res) => {
});

app.get('/logout', (req, res) => {
	res.end('XD');
});

app.listen(8080);