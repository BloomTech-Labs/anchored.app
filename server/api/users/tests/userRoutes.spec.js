const request = require('supertest');
const express = require('express');

const userRoutes = require('../usersRoutes.js');

const init = () => {
  const server = express();
  server.use(userRoutes);
  return server;
};

describe('server', () => {
  describe('GET /', () => {
    it('should return a status code 500 if not logged in', async () => {
      const server = init();
      const response = await request(server).get('/');

      expect(response.status).toBe(500);
    });
  });
});
