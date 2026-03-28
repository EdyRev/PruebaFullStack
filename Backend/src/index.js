const http = require('http');
const url = require('url');
const { obtenerEstadoCompleto } = require('./services/trackingService');
const authenticateToken = require('./config/auth');

const PORT = process.env.PORT || 3000;

function handleRequest(req, res) {
  const parsed = url.parse(req.url, true);
  const segments = parsed.pathname.split('/').filter(Boolean);
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); 

    if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === 'GET' && segments.length === 3 && segments[0] === 'api' && segments[1] === 'tracking') {
    // Autenticación
    authenticateToken(req, res, () => {
      const guia = decodeURIComponent(segments[2]);
      const resultado = obtenerEstadoCompleto(guia);

      if (!resultado) {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Guía no encontrada' }));
        return;
      }

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(resultado));
    });
    return;
  }

  // Ruta no encontrada
  res.statusCode = 404;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ error: 'Ruta no encontrada' }));
}

const server = http.createServer(handleRequest);
server.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});