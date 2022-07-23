import React, { Component } from "react";
import Form from './Form';

class UpdateCourse extends Component {
  state = {
    title: "",
    description: "",
    estimatedTime: "",
    materialsNeeded: "",
    userId: this.props.context.authenticatedUser.id,
    errors: [],
  };

  render() {

    const {context} = this.props;
    const authUser = context.authenticatedUser;

    const {
      title,
      courseDescription,
      estimatedTime,
      materialsNeeded,
      errors
    } = this.state;
  

  return (
    <div className="wrap">
      <h2>Update Course</h2>
      <Form
        cancel={this.cancel}
        errors={errors}
        submit={this.submit}
        submitButtonText="Create Course"
        elements={() => (
        <React.Fragment> 
        <div className="main--flex">
          <div>
            <label htmlFor="courseTitle">Course Title</label>
            <input
              id="courseTitle"
              name="courseTitle"
              type="text"
              value={title}
              onChange={this.change}
              placeholder={title} />

            <p>By Joe Smith</p>

            <label htmlFor="courseDescription">Course Description</label>
            <textarea 
              id="courseDescription" 
              name="courseDescription" 
              type="text"
              value={courseDescription}
              onChange={this.change}
              placeholder={courseDescription} />
          </div>
          <div>
            <label htmlFor="estimatedTime">Estimated Time</label>
            <input
              id="estimatedTime"
              name="estimatedTime"
              type="text"
              value={estimatedTime}
              onChange={this.change}
              placeholder={estimatedTime} />
            <label htmlFor="materialsNeeded">Materials Needed</label>
            <textarea 
              id="materialsNeeded" 
              name="materialsNeeded" 
              type="text"
              value={materialsNeeded}
              onChange={this.change}
              placeholder={estimatedTime} />
          </div>
        </div>
        </React.Fragment>
        )} />
    </div>
  )
}
}

export default UpdateCourse;
