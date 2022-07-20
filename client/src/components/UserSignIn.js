import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Form from './Form';

export default class UserSignIn extends Component {
  state = {
    emailAddress: '',
    password: '',
    errors: [],
  };

  render() {
    const { emailAddress, password, errors } = this.state;

    return (
      <div className="form--centered">
        <h2>Sign In</h2>
        <Form 
          cancel={this.cancel}
          errors={errors}
          submit={this.submit}
          submitButtonText="Sign In"
          elements={() => (
            <React.Fragment>
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
                placeholder="Password"
              />
            </React.Fragment>
          )} />
        <p>
          Don't have a user account? Click here to <Link to='/signup'>sign up</Link>!
        </p>
      </div>
    );
  }

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  submit = () => {

    const { context } = this.props;

    // extract 'from' from this.props to navigate user to original route if redirected to /signin
    const { from } = this.props.location.state || { from: {pathname: '/'} };

    const { emailAddress, password } = this.state;

    // calls signIn() async operation, passing in user credentials to login
    // returns a promise
    context.actions.signIn(emailAddress, password)
    .then(user => {

      // if returned promise value is null...
      if (user === null) {

        // ...set errors state of the UserSignIn class...
        this.setState(() => {

          // ...to an array holding a validation message to display to user
          return { errors: ['Sign in was unsuccessful'] };
        });
      } else {
        this.props.history.push(from); //redirect route
        console.log(`SUCCESS! ${emailAddress} is now signed in!`)
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
