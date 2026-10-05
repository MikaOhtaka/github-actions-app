import { test } from "node:test";
import assert from "node:assert/strict";
import { sum } from "./sum.js";

test("1 + 2 = 3", () => {
  assert.equal(sum(1, 2), 3);
});
