import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('.', import.meta.url));
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8' };

export function createApp() {
  return createServer(async (req, res) => {
    const pathname = new URL(req.url, 'http://localhost').pathname;
    const safePath = pathname === '/' ? '/index.html' : pathname;
    const file = join(root, 'public', safePath);
    try {
      const body = await readFile(file);
      res.writeHead(200, { 'content-type': mime[safePath.slice(safePath.lastIndexOf('.'))] ?? 'application/octet-stream', 'cache-control': 'no-cache' });
      res.end(body);
    } catch {
      res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
      res.end('Bulunamadı');
    }
  });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  createApp().listen(process.env.PORT || 3000, () => console.log('Hesap Aramızda: http://localhost:' + (process.env.PORT || 3000)));
}
