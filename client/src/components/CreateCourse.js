import React, { Component } from "react";
import Form from "./Form";
import {default as Data}  from '../Data';

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
    const {context} = this.props;
    const authUser = context.authenticatedUser;

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


  change = (event) => {
    const name = event.target.name;
    const value= event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  submit = () => {
    const { context } = this.props;
    const data = new Data();
    const { title, description, estimatedTime, materialsNeeded } = this.state;

    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId: context.authenticatedUser.id,
      emailAddress: context.authenticatedUser.emailAddress,
      password: context.authenticatedUser.password
    }

    data.createCourse(course, context.authenticatedUser)
    .then((errors) => {
      if (errors.length) {
        this.setState({errors});
      } else {
        console.log(`${title} successfully created!`);
        this.props.history.push('/');
      }
    })
    .catch(err => {
      console.log(err);
      this.props.history.push('/error');
    })


  }

  cancel = () => {
    this.props.history.push('/');
  }


}

export default CreateCourse;
