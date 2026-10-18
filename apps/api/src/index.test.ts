import { describe, expect, it } from "bun:test";
import { app } from "./index";

describe("Onda API", () => {
  it("returns campaigns", async () => {
    const response = await app.handle(new Request("http://localhost/api/campaigns"));
    const body = await response.json();
    expect(response.status).toBe(200);
    expect(body.items.length).toBeGreaterThan(0);
  });

  it("calculates transparent fees", async () => {
    const response = await app.handle(new Request("http://localhost/api/fees?amount=10000&method=mobile_money&currency=XOF"));
    const body = await response.json();
    expect(body.feeAmount).toBe(250);
    expect(body.netAmount).toBe(9750);
  });
});
