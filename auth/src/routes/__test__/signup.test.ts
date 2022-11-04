import request from 'supertest';
import { app } from '../../app';

it('return 201 on signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: '123456',
    })
    .expect(201);
});

it('return 400 when email invalid', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'tesdfdsfest.com',
      password: '123456',
    })
    .expect(400);
});

it('return 400 when invalid password', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'tesdfdsfest.com',
      password: 'p',
    })
    .expect(400);
});

it('sets a cookie after signup success', async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: '123456',
    })
    .expect(201);
  expect(response.get('Set-Cookie')).toBeDefined();
});
