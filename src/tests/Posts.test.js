/* eslint-disable no-undef */
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { Posts, PostCard } from '../components/Posts';

test('handleSave', () => {
  const onEditMock = jest.fn();
  render(
    <PostCard
      posts={{
        id: 1, title: 'title', body: 'body', anonymous: false, private: false, replies: [],
      }}
      onEdit={onEditMock}
    />,
  );
  const editButton = screen.getByTestId('edit');
  fireEvent.click(editButton);

  const titleInput = screen.getByTestId('title');
  const bodyInput = screen.getByTestId('body');
  const saveButton = screen.getByTestId('save');

  fireEvent.change(titleInput, { target: { value: 'New Title' } });
  fireEvent.change(bodyInput, { target: { value: 'New Body' } });
  fireEvent.click(saveButton);

  const linkElement = screen.getByTestId('edit');
  expect(linkElement).toBeInTheDocument();
});

test('handleCancel', () => {
  render(<PostCard posts={{
    id: 1, title: 'title', body: 'body', anonymous: false, private: false, replies: [],
  }}
  />);
  const editButton = screen.getByTestId('edit');
  fireEvent.click(editButton);

  const titleInput = screen.getByTestId('title');
  const bodyInput = screen.getByTestId('body');
  const cancelButton = screen.getByTestId('cancel');

  fireEvent.change(titleInput, { target: { value: 'New Title' } });
  fireEvent.change(bodyInput, { target: { value: 'New Body' } });
  fireEvent.click(cancelButton);
  const linkElement = screen.getByTestId('edit');
  expect(linkElement).toBeInTheDocument();
});

test('handleReply', () => {
  const onEditMock = jest.fn();
  render(
    <PostCard
      posts={{
        id: 1, title: 'title', body: 'body', anonymous: false, private: false, replies: [],
      }}
      onEdit={onEditMock}
    />,
  );
  const replyInput = screen.getByTestId('reply');
  const replyButton = screen.getByTestId('replyButton');

  fireEvent.change(replyInput, { target: { value: 'New reply' } });
  fireEvent.click(replyButton);

  const linkElement = screen.getByTestId('reply');
  expect(linkElement).toBeInTheDocument();
});

test('all posts', () => {
  const posts = [
    {
      id: 1, title: 'title1', body: 'body1', anonymous: false, private: false, replies: [],
    },
    {
      id: 2, title: 'title2', body: 'body2', anonymous: false, private: false, replies: [],
    },
    {
      id: 3, title: 'title3', body: 'body3', anonymous: false, private: false, replies: [],
    },
  ];
  render(<Posts posts={posts} />);
  const linkElement = screen.getByTestId('posts');
  expect(linkElement).toBeInTheDocument();
});
