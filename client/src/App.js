import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Header from './components/Header';
import NotFound from './components/NotFound';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';


// imports withContext() function from Context.js
import withContext from './Context';


// imports PrivateRoute component located in /src folder
import PrivateRoute from './PrivateRoute';

// initialize constants whose values call withContext()
const HeaderWithContext = withContext(Header);
const UserSignUpWithContext = withContext(UserSignUp);
const userSignInWithContext = withContext(UserSignIn);




function App() {
  return (
    <Router>  
      <div>
        <HeaderWithContext />

        <Switch>
          <Route exact path ='/' component={() => <Courses />} />
          <Route path='/signin' component={userSignInWithContext} />
          <Route path='/signup' component={UserSignUpWithContext} /> 
          <Route path='/signout' component={() => <UserSignOut />} />
          <Route path='/courses/id' component={() => <CourseDetail />} />
          <Route path='/courses/create' component={() => <CreateCourse />} />
          <Route path='/courses/id/update' component={() => <UpdateCourse />} />
          <Route component={NotFound} />
        </Switch>
      </div>
    
    </Router>
 
  );
}

export default App;
