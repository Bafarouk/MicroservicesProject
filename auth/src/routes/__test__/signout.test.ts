import request from 'supertest';
import { app } from '../../app';

it('test removing cookie session when signout', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: '123456',
    })
    .expect(201);

  const responseSignOut = await request(app)
    .post('/api/users/signout')
    .send({})
    .expect(200);
  expect(responseSignOut.get('Set-Cookie') === null);
});
