import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import {Context} from '../Context';
import {default as Data} from '../Data'; 
import ReactMarkdown from 'react-markdown';

function CourseDetail(props) {

  const { authenticatedUser } = useContext(Context);

  const [course, setCourse] = useState({});

  const history = useHistory();

  const { id }  = useParams();

  const data = new Data();

  useEffect(() => {

    data
      .courseDetail(id)
      // the set the course object to have the results
      .then((res) => setCourse(res))
      .catch((err) => {
        console.log(err);
        history.push('/error');
      });
  }, []);

  console.log(course);
  console.log(authenticatedUser);
  // console.log(userId);
  // TRYING TO ADD DELETE/UPDATE FUNCITONALITY!!

  const deleteButton = () => {
    data.deleteCourse(course.id, authenticatedUser)
    .then((errors) => {
      if (errors) {
        console.log(errors);
      } else {
        console.log("Course deleted successfully!")
      }
    })
    .then(() => history.push('/'))
    .catch((err) => console.log(err));

  }

  const updateButton = () => history.push(`/courses/${course.id}/update`)



  return (
    <main>
      <div className="actions--bar">
        <div className="wrap">
          <button className="button" onClick={updateButton}>
            Update Course
          </button>
          <button className="button" onClick={deleteButton}>
            Delete Course
          </button>
          <Link className="button button-secondary" to="/">
            Return to List
          </Link>
        </div>
      </div>

      <div className="wrap">
        <h2>Course Detail</h2>
        <form>
        <div className="main--flex">
          <div>
            <h3 className="course--detail--title">Course</h3>
            <h4 className="course--name">{course.title}</h4>
            {course.administrator ? (<p> By {course.administrator.firstName} {course.administrator.lastName} </p>) : 'No user found'}
              <ReactMarkdown children={course.description}/>
          </div>
          <div>
            <h3 className="course--detail--title">Estimated Time</h3>
            <p>{course.estimatedTime}</p>

            <h3 className="course--detail--title">Materials Needed</h3>
            <ReactMarkdown className="course--detail--list" children={course.materialsNeeded} />
       
          </div>
        </div>
        </form>
      </div>
    </main>
  );
}

export default CourseDetail;
