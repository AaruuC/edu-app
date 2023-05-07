/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
const request = require('supertest');
const express = require('express');
const cookieSession = require('cookie-session');
const mongoose = require('mongoose');
const ClassroomRouter = require('../routes/classroom');

const app = express();
app.use(express.json());
const MONGO_URI = process.env.MONGODB_URI || 'mongodb+srv://ansonyan:123@cluster0.iujmqvi.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cookieSession({
  name: 'session',
  keys: ['pineapple'],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
}));

app.use('/classroom', ClassroomRouter);

// test('POST /create should create a new classroom', async () => {
//   const res = await request(app)
//     .post('/classroom/create')
//     .send({
//       name: 'testing classroom', posts: [], username: 'newuser',
//     });
//   expect(res.statusCode).toEqual(200);
//   expect(res.text).toEqual('successful classroom creation');
// });
afterAll(async () => {
  await new Promise(resolve => setTimeout(() => resolve(), 500)); // wait for connections to close
});
test('POST /create should not create a new classroom if classroom name already taken', async () => {
  const res = await request(app)
    .post('/classroom/create')
    .send({
      name: 'testing classroom', username: 'newuser',
    });
  expect(res.statusCode).toEqual(200);
  expect(res.text).toEqual('name taken');
});

test('POST /create should return an error if there is an exception', async () => {
  const res = await request(app)
    .post('/classroom/create')
    .send({
      posts: [], username: 'newuser',
    });
  expect(res.statusCode).toEqual(200);
  expect(res.text).toEqual(expect.stringContaining('error occured'));
});

test('GET / should get all classrooms', async () => {
  const res = await request(app)
    .get('/classroom/');
  expect(res.statusCode).toEqual(200);
  expect(res.text).toMatch('z');
  expect(res.text).toMatch('CIS350');
});

test('POST /addpost should add post to classroom', async () => {
  const postObject = {
    title: 'testing post title', body: 'testing post body', priv: false, anonymous: false, replies: [], id: '643e213686779d4f9cafb6cd',
  };
  const res = await request(app)
    .post('/classroom/addPost')
    .send(postObject);
  expect(res.statusCode).toEqual(200);
  expect(res.text).toEqual('successful post creation');
});

test('PUT /editpost with existing post should work', async () => {
  // const postId = classroom.posts[0]._id;
  const res = await request(app)
    .put('/classroom/editPost')
    .send({
      classroomId: '643e4800aeb30ee48c3819e5',
      postId: '643e4d638ef9fbd1fe151b08',
      postTitle: 'New Post Title',
      postBody: 'New Post Body',
      postAnonymous: true,
      postPriv: true,
      postReplies: [],
    });
  expect(res.statusCode).toEqual(200);
  expect(res.text).toEqual('successful post update');
});
// test('POST /login should log in a user', async () => {
//   const res = await request(app)
//     .post('/account/login')
//     .send({ username: 'newuser', password: 'password' });
//   expect(res.statusCode).toEqual(200);
//   expect(res.text).toEqual('you are logged in');
// });

// test('POST /login should not log in a user with incorrect password', async () => {
//   const res = await request(app)
//     .post('/account/login')
//     .send({ username: 'newuser', password: 'wrongpassword' });
//   expect(res.statusCode).toEqual(200);
//   expect(res.text).toEqual('error occured');
// });

// test('POST /login should return an error if there is an exception', async () => {
//   const res = await request(app)
//     .post('/account/login')
//     .send({ username: null, password: null });
//   expect(res.statusCode).toEqual(200);
//   expect(res.text).toEqual(expect.stringContaining('error occured'));
// });

// test('POST /login should not log in a non-existent user', async () => {
//   const res = await request(app)
//     .post('/account/login')
//     .send({ username: 'nonexistentuser', password: 'password' });
//   expect(res.statusCode).toEqual(200);
//   expect(res.text).toEqual('error occured');
// });

// test('POST /logout should log out a user', async () => {
//   const res = await request(app)
//     .post('/account/logout');
//   expect(res.statusCode).toEqual(200);
//   expect(res.text).toEqual('you logged out');
// });
