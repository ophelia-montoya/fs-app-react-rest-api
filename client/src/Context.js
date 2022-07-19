import React, { Component } from 'react'

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

      // actions object 
      actions: {

        // stores signIn() function in a prop
        signIn: this.signIn,

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
      this.setState(() => {
        return {
          
          // ...update state to user value, otherwise remain null
          authenticatedUser: user,
        }
      })
    }

    return user;
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