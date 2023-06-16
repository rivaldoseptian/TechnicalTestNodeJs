const app = require("../app");

const request = require("supertest");
const { sequelize } = require("../models");
const { hashPassword } = require("../helpers/bcrypt");

beforeAll(async () => {
  await sequelize.queryInterface.bulkInsert("Users", [
    {
      email: "rivaldo@gmail.com",
      password: hashPassword("123456"),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
});

afterAll(async () => {
  await sequelize.queryInterface.bulkDelete("Users", null, {
    restartIdentity: true,
    truncate: true,
    cascade: true,
  });
});

describe("POST/Register - User Register", () => {
  test("201 Succes Register", async () => {
    const user = {
      email: "budi@gmail.com",
      password: hashPassword("123456"),
    };
    const response = await request(app).post("/auth/register").send(user);
    expect(response.status).toBe(201);
    expect(response.body).toEqual(expect.any(Object));
    expect(response.body).toHaveProperty("message", "Success Register");
  });
});

describe("POST/login - User Login", () => {
  test("200 Succes Login - should Return access_token", async () => {
    const user = {
      email: "rivaldo@gmail.com",
      password: "123456",
    };
    const response = await request(app).post("/auth/login").send(user);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.any(Object));
    expect(response.body).toHaveProperty("access_token", expect.any(String));
  });
});

describe("FAIL CASE", () => {
  test("401 failed Login Because Invalid Email/Pasword", async () => {
    const user = {
      email: "budi",
      password: "123456",
    };
    const response = await request(app).post("/auth/login").send(user);
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid Email/Password");
  });

  test("400 failed Login Because Email Empty", async () => {
    const user = {
      email: "",
      password: "123456",
    };
    const response = await request(app).post("/auth/login").send(user);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Email is required");
  });
});
