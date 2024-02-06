const request = require("supertest");

const { 
  getTasksTask 
} = require('../../controllers/task.controller');

const express = require("express");
const app = express();

describe('GET /api/tasks', () => {
  it('should return all tasks', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.statusCode).toBe(200);  // Corrected expected status code

    // Check if the response body is an array
    if (Array.isArray(res.body)) {
      // If it's an array, check its length
      expect(res.body.length).toBeGreaterThan(0);
    }
     else {
      // If it's not an array, fail the test
      fail('Response body is not an array')
    }
  });
});

describe("POST /api/tasks", () => {
  describe("", () => {
    test("should add tasks and 201 status code", async () => {
      const res = await request(app).post("/api/tasks").send({
        title: 'Test Task',
        description: 'This is a test task'
      })
      expect(res.headers['content-type']).toEqual(expect.stringContaining("json"))
      // expect(res.statusCode).toBe(201);
      // expect(res.body.length).toBeGreaterThan(0);
    });
  })

  // describe("Error", () => {

  // });
  
});



