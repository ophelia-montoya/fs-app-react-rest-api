import React, { Component } from "react";
import Form from "./Form";

class CreateCourse extends Component {
  state = {
    title: "",
    description: "",
    estimatedTime: "",
    materialsNeeded: "",
    userId: this.props.context.authenticatedUser.id,
    errors: [],
  };

  render() {

    // extracts context from props 
    const {context} = this.props;

    // extracts data from context 
    const {authenticatedUser}  = context;

    const authUser = authenticatedUser;

    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors,
    } = this.state;



    return (
      <div className="wrap">
        <h2>Create Course</h2>
        <Form
          cancel={this.cancel}
          errors={errors}
          submit={this.submit}
          submitButtonText="Create Course"
          elements={() => (
            <React.Fragment>
              <div className="main--flex">
                <div>
                  <label htmlFor="title">Course Title</label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    value={title}
                    onChange={this.change}
                    placeholder="Course Title"
                  />
                  <p>By: {authUser.firstName} {authUser.lastName}</p>
                  <label htmlFor="description">Course Description</label>
                  <textarea
                    id="description"
                    name="description"
                    type="text"
                    value={description}
                    onChange={this.change}
                    placeholder="Course Description"
                  />
                </div>
                <div>
                  <label htmlFor="estimatedTime">Estimated Time</label>
                  <input
                    id="estimatedTime"
                    name="estimatedTime"
                    type="text"
                    value={estimatedTime}
                    onChange={this.change}
                    placeholder="Estimated Time"
                  />
                  <label htmlFor="materialsNeeded">Materials Needed</label>
                  <textarea
                    id="materialsNeeded"
                    name="materialsNeeded"
                    type="text"
                    value={materialsNeeded}
                    onChange={this.change}
                    placeholder="Materials Needed"
                  />
                </div>
              </div>
            </React.Fragment>
          )}
        />
      </div>
    );
  }


  // change event behavior
  change = (event) => {
    const name = event.target.name;
    const value= event.target.value;

    // updates input fields values on changes
    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  // submit event behavior
  submit = () => {
    const { context } = this.props;
    const { data, authenticatedUser } = context;
    const { title, description, estimatedTime, materialsNeeded } = this.state;

    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId: authenticatedUser.id,
      emailAddress: authenticatedUser.emailAddress,
      password: authenticatedUser.password
    }

    // calls createCourse() functin defined in Data.js
    // accepts course & authenticatedUser object holding user credentials
    data.createCourse(course, authenticatedUser)
    .then((errors) => {
      if (errors.length) {
        
        // sets form validation errors
        this.setState({errors});
      } else {

        // success message upon submitting, redirected to home page
        console.log(`${title} successfully created!`);
        this.props.history.push('/');
      }
    })
    .catch(err => {
      console.log(err);

      // redirects to /error page
      this.props.history.push('/error');
    })


  }

  cancel = () => {

    // redirects to home page if cancel button clicked
    this.props.history.push('/');
  }


}

export default CreateCourse;
