import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createServer } from "./server.js";

test("GET / で index.html が返る", async (t) => {
  const server = createServer().listen(0); // 0 = 空いているポートを自動で使う
  // assert が失敗しても必ずサーバーを止める（止めないとプロセスが終了せずテストが終わらない）
  t.after(() => server.close());
  const { port } = server.address();

  const res = await fetch(`http://localhost:${port}/`);
  const body = await res.text();

  assert.equal(res.status, 200);
  assert.match(res.headers.get("content-type"), /text\/html/);

  // 文言はチェックせず、index.html ファイルそのものが返っているかだけを見る
  const expected = await readFile(new URL("./index.html", import.meta.url), "utf8");
  assert.equal(body, expected);
});
