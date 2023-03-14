import React from 'react';

function AddPost(props) {

    let newTitle;
    let newBody;

    const handleOnChange = (e) => {
        if (e.target.name === 'title') {
            newTitle = e.target.value
        }
        if (e.target.name === 'body') {
            newBody = e.target.value
        }
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const newPost = {title: newTitle, body: newBody};

        const form = document.getElementById('add');
        form.reset();
        props.addNewPost([...props.posts, newPost]);
    }

    return (
        <div>
            {' '}
            <form id='add' onSubmit={handleOnSubmit}>
                <input type='text' name='title' id='title' placeholder='Title' onChange={handleOnChange} />
                <input type='text' name='body' id='body' placeholder='Body' onChange={handleOnChange} />
                <button type='submit'>Submit Post</button>
            </form>
        </div>
    );
}

export default AddPost;