/* eslint-disable react/prop-types */
import React from 'react';

function PostSearchBar(props) {
  const { setTitle } = props;
  const handleOnChange = (e) => {
    setTitle(e.target.value);
  };

  return (
    <div>
      <input type="text" placeholder="Search" onChange={handleOnChange} />
    </div>
  );
}

export default PostSearchBar;
