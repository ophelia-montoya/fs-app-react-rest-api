import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

// extracts context in parameters
function UserSignOut({context}) {

  // calls signOut() function passed down after UserSignOut component renders
  useEffect(() => context.actions.signOut());

  //  returns a Redirect component to root path
  return (
    <Redirect to='/' />
  )
}

export default UserSignOut