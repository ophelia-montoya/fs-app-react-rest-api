import React, { useEffect, useState } from "react";
import {useHistory} from 'react-router-dom';
import { Link } from "react-router-dom";
import { default as Data } from '../Data.js';





function Courses() {

  // initializes empty array of courses
  const [courses, setCourses] = useState([]);

  // enables use of history instance to help with navigation 
  const history = useHistory();

  // initializes new instance of Data class
  const data = new Data();
  
  useEffect(() => {

    // calls getCourses() function from Data.js
    data.getCourses()

    // sets courses
    .then(res => setCourses(res))
    .catch(err => {
      console.log(err);

      // redirects back to home page
      history.push('/');
    })

    // eslint-disable-next-line
  }, [])

  return (
    <div className="wrap main--grid">

    {/* maps through courses array to make a "card" for each course */}
      {courses.map((course, index) => (
        <Link
          to={`courses/${course.id}`}
          key={index}
          className="course--module course--link"
        >
          <h2 className="course--label">Course</h2>
          <h3 className="course--title">{course.title}</h3>
        </Link>
      ))}
      <Link to={`courses/create`} className="course--add--module course--module">
        <span className="course--add--title">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 13 13"
            className="add"
          >
            <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
          </svg>
          New Course
        </span>
      </Link>
    </div>
  );
}

export default Courses;
