import request from 'supertest';
import app from '../src/app'; // Assuming your Express app instance is exported from app.ts

describe('User APIs', () => {
  let userId: string;

  it('should create a new user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ username: 'testuser', age: 25, hobbies: ['cricket', 'reading'] });

    expect(res.status).toBe(201);
    expect(res.body.username).toBe('testuser');
    expect(res.body.age).toBe(25);

    userId = res.body.id; // Saving the user ID for future tests
  });

  it('should handle invalid create user request', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({}); // Sending an empty request body

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Username and age are required');
  });

  it('should get all users', async () => {
    const res = await request(app).get('/api/users');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('should get a user by ID', async () => {
    const res = await request(app).get(`/api/users/${userId}`);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(userId);
  });

  it('should handle non-existent user', async () => {
    const res = await request(app).get(`/api/users/1234`);

    expect(res.status).toBe(404);
    expect(res.body.message).toBe('User not found');
  });

  it('should update a user', async () => {
    const res = await request(app)
      .put(`/api/users/${userId}`)
      .send({ age: 30 });

    expect(res.status).toBe(200);
    expect(res.body.age).toBe(30);
  });

  it('should handle non existent userId request', async () => {
    const res = await request(app)
      .put(`/api/users/1234`)
      .send({username: 'Tom'});

    expect(res.status).toBe(404);
    expect(res.body.message).toBe('User not found');
  });

  it('should delete a user', async () => {
    const res = await request(app).delete(`/api/users/${userId}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('User deleted');
  });

  it('should handle non-existent user deletion', async () => {
    const res = await request(app).delete(`/api/users/543`);

    expect(res.status).toBe(404);
    expect(res.body.message).toBe('User not found');
  });
});
