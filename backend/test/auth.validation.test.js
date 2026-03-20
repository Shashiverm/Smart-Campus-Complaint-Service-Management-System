import test from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import app from "../src/app.js";

test("POST /api/v1/auth/login rejects invalid payload", async () => {
  const response = await request(app).post("/api/v1/auth/login").send({ email: "bad-email" });

  assert.equal(response.status, 400);
  assert.equal(response.body.message, "Validation failed");
  assert.ok(Array.isArray(response.body.errors));
  assert.ok(response.body.errors.length >= 1);
});
