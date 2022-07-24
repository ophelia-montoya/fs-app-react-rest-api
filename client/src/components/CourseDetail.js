import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import ReactMarkdown from 'react-markdown';

function CourseDetail(props) {


  // extracts authenticatedUser object & initialized data class from props.context
  const { authenticatedUser, data } = props.context;

  // initializes empty course object
  const [course, setCourse] = useState({});

  // enables use of history instance for navigation
  const history = useHistory();

  // gets id from URL parameters
  const { id }  = useParams();

  // used for conditional rendering of editing buttons
  const [isAdmin, setIsAdmin] = useState(false);

  // used to display Loading message when data's being retrieved
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {

    // calls courseDetail() function defined in Data.js
    data.courseDetail(id)

      // sets the course object to retrieved results
      .then((res) => {
        setCourse(res);

        // to disable Loading message when data is retrieved
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);

        // redirects user to /error page
        history.push('/error');
      });
      
      // eslint-disable-next-line
  }, []);


  useEffect(() => {

    // if authenticatedUser.id & course.userId match, set user as admin
    (authenticatedUser && authenticatedUser.id === course.userId) && setIsAdmin(true);

  }, [course, authenticatedUser])

  
  const deleteButton = () => {

    // calls deleteCourse() function defined in Data.js
    // accepts course id & authenticatedUser (credentials)
    data.deleteCourse(course.id, authenticatedUser)
    .then((errors) => {
      if (errors) {

        // logs errors if DELETE request fails
        console.log(errors);
      } else {

        // logs success message if success
        console.log("Course deleted successfully!")
      }
    })
    .then(() => history.push('/'))
    .catch((err) => console.log(err));

  }

  // redirects user to UpdateCourse page when update button pressed
  const updateButton = () => history.push(`/courses/${course.id}/update`)


  return (
    <main>
      <div className="actions--bar">
        <div className="wrap">

        {/* Conditionally renders editing buttons if user is admin*/}
        {isAdmin && ( 
          <React.Fragment>
          <button className="button" onClick={updateButton}>
            Update Course
          </button>
          <button className="button" onClick={deleteButton}>
            Delete Course
          </button>
          </React.Fragment>
        )}
          <Link className="button button-secondary" to="/">
            Return to List
          </Link> 

        </div>
      </div>

      {/* displays Loading message while data is retrieved  */}
      {isLoading ? (<h2>Loading...</h2>) 
      : (
      <div className="wrap">
        <h2>Course Detail</h2>
        <form>
        <div className="main--flex">
          <div>
            <h3 className="course--detail--title">Course</h3>
            <h4 className="course--name">{course.title}</h4>

            {/* Short-circuiting to render course admin/creator name */}
            {course.administrator && (<p> By {course.administrator.firstName} {course.administrator.lastName} </p>)}
             
             {/* renders property as markdown formatted text */}
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
      )}
    </main>
  );
}

export default CourseDetail;
