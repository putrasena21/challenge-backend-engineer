require("dotenv").config();
/* eslint-disable no-undef */
const request = require("supertest");
const app = require("../app");

const truncate = require("../helpers/truncate.helper");

// test user endpoint
describe("Test register user", () => {
  const regisUrl = "/api/v1/auth/register";
  const payload = {
    name: "admin",
    email: "admin@mail.com",
    password: "admin123",
  };

  it("should return a 400 error if input not valid", async () => {
    const res = await request(app)
      .post(regisUrl)
      .send({ email: "", password: "" });
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Invalid input");
  });

  it("should return a 409 if already exist", async () => {
    const res = await request(app).post(regisUrl).send(payload);
    expect(res.status).toBe(409);
    expect(res.body.message).toBe("User already exist");
  });

  it("should return status code 201 when user created ", async () => {
    await truncate.user();
    const res = await request(app).post(regisUrl).send(payload);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body).toHaveProperty("message", "User created");
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toHaveProperty("id");
    expect(res.body.data).toHaveProperty("name");
    expect(res.body.data).toHaveProperty("email");
  });
});

// test login user endpoint
describe("Test login user", () => {
  const loginUrl = "/api/v1/auth/login";
  const payload = {
    email: "admin@mail.com",
    password: "admin123",
  };

  it("should return a 400 error if input not valid", async () => {
    const res = await request(app)
      .post(loginUrl)
      .send({ email: "", password: "" });
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Invalid input");
  });

  it("should return a 400 error if password wrong", async () => {
    const res = await request(app)
      .post(loginUrl)
      .send({ email: "admin@mail.com", password: "admin1234" });
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Wrong password!");
  });

  it("should return a 404 if user not found", async () => {
    const res = await request(app).post(loginUrl).send({
      email: "admin123@mail.com",
      password: "admin123",
    });
    expect(res.status).toBe(404);
    expect(res.body.message).toBe("User not found");
  });

  it("should return status code 200 when user login ", async () => {
    const res = await request(app).post(loginUrl).send(payload);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body).toHaveProperty("message", "Login success");
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toHaveProperty("accessToken");
  });
});

// test user whoami
describe("Test whoami", () => {
  const whoamiUrl = "/api/v1/users/detail";

  it("should return a 401 if not login", async () => {
    const res = await request(app).get(whoamiUrl);
    expect(res.status).toBe(401);
    expect(res.body.message).toBe("Token not provided");
  });

  it("should return a 200 if login", async () => {
    const res = await request(app).post("/api/v1/auth/login").send({
      email: "admin@mail.com",
      password: "admin123",
    });
    const token = res.body.data.accessToken;
    const res2 = await request(app)
      .get(whoamiUrl)
      .set("Authorization", `Bearer ${token}`);
    expect(res2.status).toBe(200);
    expect(res2.body).toHaveProperty("success", true);
    expect(res2.body).toHaveProperty("message", "Success retreived data");
    expect(res2.body).toHaveProperty("data");
    expect(res2.body.data).toHaveProperty("id");
    expect(res2.body.data).toHaveProperty("name");
    expect(res2.body.data).toHaveProperty("email");
    expect(res2.body.data).toHaveProperty("avatar");
  });
});
