const request = require('supertest');

const server = require('../server.js');

describe('server', () => {
  describe('GET /', () => {
    it('should return status code 200 on success of sanity check.', async () => {
      const response = await request(server).get('/');

      expect(response.status).toBe(200);
    });
  });
});
