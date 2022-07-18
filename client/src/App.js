import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Header from './components/Header';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import UserSignUp from './components/UserSignUp';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';



fetch('http://localhost:5000/api/courses')
.then(res => res.json())
.then(courses => {
  console.log(courses)})


function App() {
  return (
    <Router>  
      <div>
        <Header />

        <Switch>
          <Route exact path ='/' component={() => <Courses />} />
          <Route path='/signin' component={() => <UserSignIn />} />
          <Route path="/signout" component={() => <UserSignOut />} />
        </Switch>
      </div>
    
    </Router>
 
  );
}

export default App;
