import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Form from "./Form";
import { Context } from "../Context";


function UpdateCourse() {

  // unpacks authenticatedUser & initialized data class from Context.js
  const { authenticatedUser, data } = useContext(Context);

  // initiates course object & credentials needed for private route
  const [course, setCourse] = useState({
    administrator: "",
    title: "",
    description: "",
    estimatedTime: "",
    materialsNeeded: "",
    userId: "",
    emailAddress: authenticatedUser.emailAddress,
    password: authenticatedUser.password,
  });

  // extracts dynamic id from URL parameters
  const { id } = useParams();

  // allows access to history instance to navigate
  const history = useHistory();

  const [errors, setErrors] = useState([]);

  // loading message displayed while data retrieved
  // used for conditional rendering
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // calls courseDetail() function defined in Data.js
    data
      .courseDetail(id)
      .then((course) => {
        if (course) {
          // retrieves and sets course detail values based on already existing values
          setCourse(course);

          // sets isLoading to false to display course details page after retrieval
          setIsLoading(false);

          // if course userId is not the same as authenticatedUser (logged in)
          if (course.userId !== authenticatedUser.id) {
            // redirect user to /forbidden page
            history.push("/forbidden");
          }
        }
      })
      .catch((err) => {
        console.log(err);

        // redirect user to /error page
        history.push("/error");
      });
  }, []);

  const change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    // updates course detail values from form input field changes
    setCourse((course) => ({ ...course, [name]: value }));
  };

  const submit = () => {
    // calls the updateCourse function defined in Data.js
    // passes in course object & authenticatedUser objects
    data
      .updateCourse(course, authenticatedUser)
      .then((errors) => {
        if (errors.length) {
          // sets validation errors
          setErrors(errors);
          console.log(errors);
        } else {
          // redirects user back to course detail page
          history.push(`/courses/${id}`);
        }
      })
      .catch((err) => {
        console.log(err);

        // redirects user to /error (UnhandledError) page
        history.push("/error");
      });
  };

  const cancel = () => {
    history.push(`/courses/${id}`);
  };

  return (
    <div className="wrap">
      {/* Conditional logic to display loading message while data retrieved */}
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <h2>Update Course</h2>
          <Form
            cancel={cancel}
            errors={errors}
            submit={submit}
            submitButtonText="Update Course"
            elements={() => (
              <React.Fragment>
                <div className="main--flex">
                  <div>
                    <label htmlFor="title">Course Title</label>
                    <input
                      id="title"
                      name="title"
                      type="text"
                      value={course.title}
                      onChange={change}
                      placeholder={course.title}
                    />

                    <p>{`By: ${course.administrator.firstName} ${course.administrator.lastName}`}</p>

                    <label htmlFor="description">Course Description</label>
                    <textarea
                      id="description"
                      name="description"
                      type="text"
                      value={course.description}
                      onChange={change}
                      placeholder={course.description}
                    />
                  </div>
                  <div>
                    <label htmlFor="estimatedTime">Estimated Time</label>
                    <input
                      id="estimatedTime"
                      name="estimatedTime"
                      type="text"
                      value={course.estimatedTime}
                      onChange={change}
                      placeholder={course.estimatedTime}
                    />
                    <label htmlFor="materialsNeeded">Materials Needed</label>
                    <textarea
                      id="materialsNeeded"
                      name="materialsNeeded"
                      type="text"
                      value={course.materialsNeeded}
                      onChange={change}
                      placeholder={course.materialsNeeded}
                    />
                  </div>
                </div>
              </React.Fragment>
            )}
          />
        </>
      )}
    </div>
  );
}

export default UpdateCourse;
