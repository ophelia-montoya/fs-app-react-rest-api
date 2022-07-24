import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Form from './Form';
import {Context} from '../Context';
import {default as Data} from '../Data';

function UpdateCourse() {

    const {authenticatedUser} = useContext(Context);

    const [course, setCourse] = useState({
      administrator: '',
      title: '',
      description: '',
      estimatedTime: '',
      materialsNeeded: '',
      userId: '',
      emailAddress: authenticatedUser.emailAddress,
      password: authenticatedUser.password
    });

    const data = new Data();
    const {id} = useParams();
    const history = useHistory();
    const [errors, setErrors] = useState([]);



    useEffect(() => {
      data.courseDetail(id)
      .then(course => setCourse(course))
      .catch(err => console.log(err));
    }, [])


  const change = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setCourse((course) => ({...course, [name]: (value)}));
  }

  const submit = () => {
    data.updateCourse(course, authenticatedUser)
    .then(errors => {
      if (errors.length) {
        setErrors(errors);
        console.log(errors);
      } else {
        history.push(`/courses/${id}`);
      }
    })
    .catch(err => {
      console.log(err);
      history.push('/error');
    })
  }

  const cancel = () => {
    history.push(`/courses/${id}`);
  }
  

  
  return (
    <div className="wrap">
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
              placeholder={course.title} />

            <p>{`By: ${course.administrator.firstName} ${course.administrator.lastName}`}</p>

            <label htmlFor="description">Course Description</label>
            <textarea 
              id="description" 
              name="description" 
              type="text"
              value={course.description}
              onChange={change}
              placeholder={course.description} />
          </div>
          <div>
            <label htmlFor="estimatedTime">Estimated Time</label>
            <input
              id="estimatedTime"
              name="estimatedTime"
              type="text"
              value={course.estimatedTime}
              onChange={change}
              placeholder={course.estimatedTime} />
            <label htmlFor="materialsNeeded">Materials Needed</label>
            <textarea 
              id="materialsNeeded" 
              name="materialsNeeded" 
              type="text"
              value={course.materialsNeeded}
              onChange={change}
              placeholder={course.materialsNeeded} />
          </div>
        </div>
        </React.Fragment>
        )} />
    </div>
  )
}


export default UpdateCourse;
