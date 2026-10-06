import http from "node:http";
import { readFile } from "node:fs/promises";

const indexPath = new URL("./index.html", import.meta.url);

// どのパスにアクセスしても index.html を返す
export function createServer() {
  return http.createServer(async (req, res) => {
    const html = await readFile(indexPath);
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(html);
  });
}

// `node server.js` で直接起動したときだけサーバーを立ち上げる（テストから import したときは起動しない）
if (import.meta.url === `file://${process.argv[1]}`) {
  const port = process.env.PORT || 3000;
  createServer().listen(port, () => {
    console.log(`http://localhost:${port}`);
  });
}
