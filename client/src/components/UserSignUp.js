import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class UserSignUp extends Component {
  state = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    errors: [],
  }

  render() {

    const {
      firstName,
      lastName,
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
                id="firstName"
                name="firstName"
                type="text"
                value={firstName}
                onChange={this.change}
                placeholder="First Name" />
              <input 
                id="lastName"
                name="lastName"
                type="text"
                value={lastName}
                onChange={this.change}
                placeholder="Last Name" />
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

    // extract 'from' from this.props to navigate user to original route
    const { from } = this.props.location.state || {from: { pathname: '/' }};


    // unpacks props from state object to keep submit handler cleaner 
    const { firstName, lastName, emailAddress, password } = this.state;

    // initializes a user whose props are name, emailAddress, and password
    const user = {firstName, lastName, emailAddress, password};

    // calls createUser(), which accepts a user object as a parameter
    context.data.createUser(user)

    // checks if returned PromiseValue is an array of errors
    .then(errors => {
      if (errors.length) {

        // updates errors state to returned errors
        this.setState({errors});
      } else {

        // calls signIn() 
        context.actions.signIn(emailAddress, password)
        .then(() => {

          // render root component 
          this.props.history.push(from);
          console.log('User successfully signed up!');
        });
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
