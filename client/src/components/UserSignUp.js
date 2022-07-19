import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class UserSignUp extends Component {
  state = {
    name: '',
    emailAddress: '',
    password: '',
    errors: [],
  }

  render() {

    const {
      name,
      emailAddress,
      password,
      errors,
    } = this.state;


    return (
      <div className="form--centered">
      <h2>Sign Up</h2>
      
      <Form
        cancel={this.cancel}
        errors={errors}
        submit={this.submit}
        submitButtonText="Sign Up"
        elements={() => (
            <React.Fragment>
              <input 
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={this.change}
                placeholder="Name" />
              <input 
                id="emailAddress"
                name="emailAddress"
                type="text"
                value={emailAddress}
                onChange={this.change}
                placeholder="Email Address" />
              <input 
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={this.change}
                placeholder="Password" />
            </React.Fragment>
        )} />
      <p>Already have a user account? Click here to <Link to="/signin">sign in</Link>!</p>
  </div>
    )
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

  // creates new user, sends user credentials to Express server
  // uses state initialized in UserSignUp class & createUser() method from Data.js
  submit = () => {

    // extracts context prop from this.props
    const { context } = this.props;

    // unpacks props from state object to keep submit handler cleaner 
    const { name, emailAddress, password } = this.state;

    // initializes a user whose props are name, emailAddress, and password
    const user = {name, emailAddress, password};

    // calls createUser(), which accepts a user object as a parameter
    context.data.createUser(user)

    // checks if returned PromiseValue is an array of errors
    .then(errors => {
      if (errors.length) {

        // updates errors state to returned errors
        this.setState({errors});
      } else {

        // else confirm new user successfully created
        console.log('user authenticated!');
      }
    })
    .catch(err => {
      // logs error/rejection reason
      console.log(err); 

      // router will render NotFound component 
      this.props.history.push('/error'); // push to history stack as redirect route
    })
  }

  // redirects to home route if user cancels account registration
  cancel = () => {
    this.props.history.push('/');
  }


}
