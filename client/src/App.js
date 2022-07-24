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
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const CreateCourseWithContext = withContext(CreateCourse);
const CourseDetailWithContext = withContext(CourseDetail);
const UpdateCourseWithContext = withContext(UpdateCourse);




function App() {
  return (
    <Router>  
      <div>
        <HeaderWithContext />

        <Switch>
          <Route exact path ='/' component={() => <Courses />} />
          <Route path='/signin' component={UserSignInWithContext} />
          <Route path='/signup' component={UserSignUpWithContext} /> 
          <Route path='/signout' component={() => <UserSignOutWithContext />} />
          <PrivateRoute exact path='/courses/create' component={(props) => <CreateCourseWithContext {...props}/>} />
          <PrivateRoute path='/courses/:id/update' component={() => <UpdateCourseWithContext />} />         
          <Route path='/courses/:id' component={() => <CourseDetailWithContext />} />
          <Route path='*' component={NotFound} />
        </Switch>
      </div>
    
    </Router>
 
  );
}

export default App;
