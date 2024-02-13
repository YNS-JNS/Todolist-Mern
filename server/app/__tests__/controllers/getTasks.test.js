// Import the required packages

const request = require('supertest');
const express = require('express');
const app = express();

// const app = require('../../src/app');



// Define the test suite
describe('GET /tasks', () => {
  // Define the test case
  it('should return an array of tasks', async () => {
    // Create a mock task
    const task = {
      title: 'Task 1',
      description: 'This is a sample task',
      status: 'pending',
      priority: 'low',
    };

    // Create a new task
    const response = await request(app)
      .post('/tasks')
      .send(task);

    // Retrieve the created task
    const retrievedTask = await request(app)
      .get(`/tasks/${response.body._id}`);

    // Assert the response
    expect(retrievedTask.body).toEqual(response.body);
  });
});