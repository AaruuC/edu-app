const express = require('express');

const Classroom = require('../models/classroom');
const Post = require('../models/post');

const router = express.Router();

router.post('/create', async (req, res) => {
  const { body } = req;
  const {
    name, posts, username,
  } = body;
  try {
    const classroom = await Classroom.findOne({ name });
    if (!classroom) {
      if (!req.session.username) {
        await Classroom.create({
          name, admins: [username], users: [username], posts,
        });
      } else {
        await Classroom.create({
          name, admins: [req.session.username], users: [req.session.username], posts,
        });
      }
      res.send('successful classroom creation');
    } else {
      res.send('name taken');
    }
  } catch (e) {
    res.send('error occured');
  }
});

router.get('/', async (req, res) => {
  try {
    const classrooms = await Classroom.find();
    res.json(classrooms);
  } catch (e) {
    res.send('error occured');
  }
});

router.get('/getId', async (req, res) => {
  const { id } = req.query;
  // const { id } = body;
  try {
    const classroom = await Classroom.findOne({ _id: id });
    res.json(classroom.posts);
  } catch (e) {
    res.send('error occured');
  }
});

router.post('/addPost', async (req, res) => {
  const {
    title, body, priv, anonymous, replies, id,
  } = req.body;
  try {
    const classroom = await Classroom.findOne({ _id: id });
    if (classroom) {
      const newPost = new Post({
        title, body, private: priv, anonymous, replies, author: req.session.username,
      });
      const arr = [...classroom.posts, newPost];
      await Classroom.updateOne({ _id: id }, { posts: arr });
      // await classroom.save();
      res.send('successful post creation');
    } else {
      res.send('classroom does not exist');
    }
  } catch (e) {
    res.send('error occured');
  }
});

// await Post.updateOne({ _id }, { $set: { post.title : postTitle,
//         post.body : postBody,
//         post.private : postPriv,
//         post.anonymous : postAnonymous,
//         post.replies : postReplies } })
router.put('/editPost', async (req, res) => {
  const {
    classroomId,
    postId,
    postTitle,
    postBody,
    postAnonymous,
    postPriv,
    postReplies,
    author,
  } = req.body;
  try {
    const classroom = await Classroom.findOne({ _id: classroomId });
    if (classroom) {
      const post = classroom.posts.id(postId);
      if (post) {
        post.title = postTitle;
        post.body = postBody;
        post.private = postPriv;
        post.anonymous = postAnonymous;
        post.replies = postReplies;
        post.author = author;
        await classroom.save();
        res.send('successful post update');
      } else {
        res.send('post does not exist');
      }
    } else {
      res.send('classroom does not exist');
    }
  } catch (e) {
    res.send('error occurred');
  }
});

router.get('/getAdmins', async (req, res) => {
  const { classroomId } = req.query;
  // const { id } = body;
  try {
    const classroom = await Classroom.findOne({ _id: classroomId });
    res.json(classroom.admins);
  } catch (e) {
    res.send('error');
  }
});

module.exports = router;
