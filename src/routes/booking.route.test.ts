import { beforeEach, describe, expect, it } from "vitest";
import { getDb } from "../db/index.js";
import { SEED_APPOINTMENT_COUNT } from "../db/seed.js";
import { setupTestDb } from "../test/db.js";
import { requestApp } from "../test/helpers.js";

describe("booking routes", () => {
  beforeEach(() => {
    setupTestDb();
  });

  it("GET /agents/:id includes a booking form", async () => {
    const body = await (await requestApp("/agents/1")).text();

    expect(body).toContain('action="/agents/1/book"');
    expect(body).toContain('name="scheduled_at"');
    expect(body).toContain('type="datetime-local"');
  });

  it("POST /agents/:id/book creates a pending appointment", async () => {
    const response = await requestApp("/agents/1/book", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: "scheduled_at=2026-08-01T15:30",
    });

    expect(response.status).toBe(303);
    const location = response.headers.get("location");
    expect(location).toMatch(/^\/appointments\/\d+\/confirmation$/);

    const database = getDb();
    const count = database.prepare("SELECT COUNT(*) AS count FROM appointments").get() as {
      count: number;
    };
    expect(count.count).toBe(SEED_APPOINTMENT_COUNT + 1);

    const appointment = database
      .prepare("SELECT status FROM appointments ORDER BY id DESC LIMIT 1")
      .get() as { status: string };
    expect(appointment.status).toBe("pending");

    const confirmation = await requestApp(location!);
    const body = await confirmation.text();
    expect(confirmation.status).toBe(200);
    expect(body).toContain("Appointment booked");
    expect(body).toContain("Claude the Anxious");
    expect(body).toContain("pending");
  });

  it("POST /agents/:id/book rejects invalid datetime", async () => {
    const response = await requestApp("/agents/1/book", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: "scheduled_at=not-a-date",
    });

    expect(response.status).toBe(400);
    const body = await response.text();
    expect(body).toContain("valid appointment date and time");

    const database = getDb();
    const count = database.prepare("SELECT COUNT(*) AS count FROM appointments").get() as {
      count: number;
    };
    expect(count.count).toBe(SEED_APPOINTMENT_COUNT);
  });

  it("POST /agents/:id/book rejects missing datetime", async () => {
    const response = await requestApp("/agents/1/book", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: "",
    });

    expect(response.status).toBe(400);
  });
});
