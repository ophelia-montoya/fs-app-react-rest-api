import React from "react";
import { Link } from "react-router-dom";

export default class Header extends React.PureComponent {
  render() {
    // extracts context from this.props to make data easier to manage
    const { context } = this.props;

    // stores authenticatedUser data as an object OR null
    const authUser = context.authenticatedUser;

    return (
      <header>
        <div className="wrap header--flex">
          <h1 className="header--logo">
            <Link to="/">Courses</Link>
          </h1>
          <nav>
          
          {/* JSX conditional ternary operator expression used to determine content to render*/}
            {authUser ? (
              <React.Fragment>
                <ul className="header--signedin">
                   <span>Welcome, {authUser.firstName}!</span>
                  <li>
                    <Link to="/signout">Sign Out</Link>
                  </li>
                </ul>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <ul className="header--signedout">
                  <li>
                    <Link to="/signup">Sign Up</Link>
                  </li>
                  <li>
                    <Link to="/signin">Sign In</Link>
                  </li>
                </ul>
              </React.Fragment>
            )}
          </nav>
        </div>
      </header>
    );
  }
}
