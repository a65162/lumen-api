import http from 'node:http';

const PORT = 3840;
const widgets = [{ id: 'w-1', title: 'Demo widget', description: 'Sandbox widget' }];

http
  .createServer((req, res) => {
    const url = new URL(req.url ?? '/', `http://127.0.0.1:${PORT}`);
    res.setHeader('content-type', 'application/json');
    if (req.method === 'GET' && url.pathname === '/health') {
      res.writeHead(200);
      res.end(JSON.stringify({ ok: true }));
      return;
    }
    if (req.method === 'GET' && url.pathname === '/widgets') {
      res.writeHead(200);
      res.end(JSON.stringify(widgets));
      return;
    }
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'not found' }));
  })
  .listen(PORT, '127.0.0.1', () => {
    console.log(`lumen-api http://127.0.0.1:${PORT}`);
  });
