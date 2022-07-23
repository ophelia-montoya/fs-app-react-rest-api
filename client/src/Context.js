import React, { Component } from 'react'

import Cookies from 'js-cookie';

//imports Data.js file containing helper functions
import Data from './Data';

export const Context = React.createContext();


export class Provider extends Component {

  // initializes an authenticatedUser state & sets default to null
  state = {
    authenticatedUser: null
  };

  constructor() {
    super();

    // initialize new instance of Data class inside constructor
    this.data = new Data();

    // retrieves value of cookie 
    this.cookie = Cookies.get('authenticatedUser');

    // sets initial state of Provider class to value stored in cookie or null
    this.state = {
      authenticatedUser: this.cookie ? JSON.parse(this.cookie) : null
    };

  }



  render() {

    // extracts authenticatedUser from this.state
    const { authenticatedUser } = this.state;

    //  value object containing context to be shared through component tree
    const value = {
      
      // passes state to <Content.Provider> via context and props
      authenticatedUser,

      // used to determine what display to user
      data: this.data,

      // actions object to store functions
      actions: {

        signIn: this.signIn,

        signOut: this.signOut

      },

    };



    return (

      // passes an object containing context to Provider via value prop
      <Context.Provider value={value} >
        {this.props.children}
      </Context.Provider>
    );
  }

  // async function takes emailAddress and password as arguments
  // makes a GET request to protected /users route in server
  // returns user data
  signIn = async(emailAddress, password) => {

    // initializes user constant to await returned PromiseValue from getUser()
    const user = await this.data.getUser(emailAddress, password);


    // if user value is not null... 
    if (user !== null) {
      // user.password = password;

      this.setState(() => {
        return {
          
          // ...update state to user value, otherwise remain null
          authenticatedUser: user,
        };
      });
      user.password = password;

      // creates cookie to store authenticatedUser data (name and email)
      Cookies.set('authenticatedUser', JSON.stringify(user), {expires: 1});
    }

    return user;
  }

  signOut = () => {

    // removes name and emailAddress props from state on user sign out
    this.setState(() => {
      return {
        authenticatedUser: null,
      };
    });

    // deletes authenticatedUser cookie
    Cookies.remove('authenticatedUser');
  }

}

export const Consumer = Context.Consumer;

/**
 * A HOC that wraps the provided component in a Context Consumer component
 * @param {class} Component - a React component
 * @returns {function} A higher-order component  
 * withContext() automatically subscribes component passed to it to all actions/context changes
 */
export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    )
  }
}