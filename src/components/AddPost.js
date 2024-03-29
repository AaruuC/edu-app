/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { createNewPost } from '../api/posts';

function AddPost(props) {
  const { classroomId, setPosts, login } = props;
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [priv, setPriv] = useState(false);

  const [anon, setAnon] = useState(false);

  const [id, setId] = useState(1);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      title,
      body,
      id,
      priv,
      anonymous: anon,
      replies: [],
    };
    setId(id + 1);
    const form = document.getElementById('add');
    form.reset();
    createNewPost(classroomId, newPost);
    setPosts([]);
  };

  return (
    (login && (
    <div>
      {' '}
      <form id="add" className="mx-auto" style={{ width: '800px' }}>
        <div className="form-group">
          <label className="form-check-label" htmlFor="Title">
            Title
            <input type="text" className="form-control" id="Title" onChange={handleTitleChange} />
          </label>
        </div>

        <div className="form-group" data-testid="form-group">
          <div className="input-group-prepend" />
          <textarea
            className="form-control"
            aria-label="With textarea"
            data-testid="body"
            onChange={handleBodyChange}
          />
        </div>

        <div className="form-row">
          <div className="form-check col-md-4">
            <label className="form-check-label" htmlFor="Private">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                className="form-check-input"
                type="checkbox"
                id="Private"
                onClick={() => setPriv(!priv)}
              />
              Private
            </label>
          </div>
          <div className="form-check col-md-6 ">
            <label className="form-check-label" htmlFor="Anonymous">
              <input
                className="form-check-input"
                type="checkbox"
                id="Anonymous"
                onClick={() => setAnon(!anon)}
              />
              Anonymous
            </label>
          </div>
          <button
            onClick={handleOnSubmit}
            type="submit"
            className="btn btn-primary"
            data-testid="button"
          >
            Create Post

          </button>
        </div>

      </form>
    </div>
    ))
  );
}

export default AddPost;
