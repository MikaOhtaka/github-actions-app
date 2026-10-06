import { test } from "node:test";
import assert from "node:assert/strict";
import { createServer } from "./server.js";

test("GET / で index.html が返る", async () => {
  const server = createServer().listen(0); // 0 = 空いているポートを自動で使う
  const { port } = server.address();

  const res = await fetch(`http://localhost:${port}/`);
  const body = await res.text();

  assert.equal(res.status, 200);
  assert.match(res.headers.get("content-type"), /text\/html/);
  assert.match(body, /<h1>Hello, GitHub Actions!<\/h1>/);

  server.close();
});
