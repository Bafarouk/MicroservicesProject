import request from 'supertest';
import { app } from '../../app';

it('fails when an email does not exist', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: '123456',
    })
    .expect(400);
});

it('fails when incorrect password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: '123456',
    })
    .expect(201);
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: '123456dfdfdf',
    })
    .expect(400);
});

it('responds with cookie when credentials is correct', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: '123456',
    })
    .expect(201);
  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: '123456',
    })
    .expect(200);

  expect(response.get('Set-Cookie')).toBeDefined();
});
