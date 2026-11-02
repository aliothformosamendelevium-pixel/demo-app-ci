const test = require('node:test');
const assert = require('node:assert');
const http = require('node:http');
const app = require('../app');

test('health endpoint returns ok', async () => {
  const server = app.listen(0);
  const { port } = server.address();
  const body = await new Promise((resolve) => {
    http.get(`http://127.0.0.1:${port}/health`, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve(JSON.parse(data)));
    });
  });
  server.close();
  assert.strictEqual(body.status, 'ok');
});
