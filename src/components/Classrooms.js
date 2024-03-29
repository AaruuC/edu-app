/* eslint-disable no-alert */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import {
  Link,
} from 'react-router-dom';
import AddClassroom from './AddClassroom';
import { getAllClassrooms } from '../api/posts';

function ClassroomPreview(props) {
  const { name, id } = props;
  return (
    <div>
      <Link to={`/classroom/${id}`}>{name}</Link>
    </div>
  );
}

function Classrooms(props) {
  // right after an user login in, app should direct user
  // to this page which has a list of classrooms that user is in
  const {
    classrooms, setClassrooms, username, login,
  } = props;
  useEffect(() => {
    const getClassroomsWrapper = async () => {
      try {
        const response = await getAllClassrooms();
        setClassrooms(response);
      } catch (err) {
        alert(`${err}`);
      }
    };
    getClassroomsWrapper();
  }, [classrooms.length]);

  const displayClassrooms = () => {
    const displayedClassrooms = [];
    classrooms.forEach((element) => {
      displayedClassrooms.push(
        <ClassroomPreview
          key={element.id}
          name={element.name}
          id={element._id}
        />,
      );
    });
    return displayedClassrooms;
  };

  const displayedClassrooms = displayClassrooms();

  return (
    <div>
      <Link to="/">Home</Link>
      <AddClassroom setClassrooms={setClassrooms} username={username} login={login} />
      <br />
      {displayedClassrooms}
    </div>
  );
}

export default Classrooms;
