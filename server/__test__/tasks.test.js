const app = require("../app");

const request = require("supertest");
const { User } = require("../models");
const { sequelize } = require("../models");
const { hashPassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");

let validToken, InvalidToken;

const user = {
  email: "budii@gmail.com",
  password: "123456",
};

beforeAll(async () => {
  const member = await User.create(user);
  validToken = signToken({
    id: member.id,
  });
  InvalidToken = "123456789eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";
  await sequelize.queryInterface.bulkInsert("Tasks", [
    {
      title: "Drawing",
      description: "Drawing Book",
      completed: false,
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
  await sequelize.queryInterface.bulkDelete("Tasks", null, {
    restartIdentity: true,
    truncate: true,
    cascade: true,
  });
});

describe("GET/Tasks", () => {
  test("200 Succes get Tasks", async () => {
    const resposne = await request(app).get("/tasks");
    expect(resposne.status).toBe(200);
    expect(resposne.body).toEqual(expect.any(Array));
    expect(resposne.body[0]).toHaveProperty("id", expect.any(Number));
    expect(resposne.body[0]).toHaveProperty("title", expect.any(String));
    expect(resposne.body[0]).toHaveProperty("description", expect.any(String));
    expect(resposne.body[0]).toHaveProperty("completed", expect.any(Boolean));
  });
});

describe("POST/Tasks", () => {
  test("201 Succes Post Task", async () => {
    const response = await request(app)
      .post("/tasks")
      .set("access_token", validToken)
      .send({
        title: "Coding",
        description: "Javascript",
      });
    expect(response.status).toBe(201);
    expect(response.body).toEqual(expect.any(Object));
    expect(response.body).toHaveProperty("id", expect.any(Number));
    expect(response.body).toHaveProperty("title", expect.any(String));
    expect(response.body).toHaveProperty("description", expect.any(String));
    expect(response.body).toHaveProperty("completed", expect.any(Boolean));
  });
});

describe("GET/ONE Tasks", () => {
  test("200 Succes Get One tasks", async () => {
    const response = await request(app).get("/tasks/1");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.any(Object));
    expect(response.body).toHaveProperty("id", expect.any(Number));
    expect(response.body).toHaveProperty("title", expect.any(String));
    expect(response.body).toHaveProperty("description", expect.any(String));
    expect(response.body).toHaveProperty("completed", expect.any(Boolean));
  });
});

describe("PATCH/Task", () => {
  test("200 Sucess Update Tasks", async () => {
    const response = await request(app)
      .patch("/tasks/1")
      .set("access_token", validToken)
      .send({
        completed: true,
      });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Success Update Tasks");
  });
});

describe("DELETE/Task", () => {
  test("200 Success Delete Tasks", async () => {
    const response = await request(app)
      .delete("/tasks/1")
      .set("access_token", validToken);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Success Delete Task");
  });
});
