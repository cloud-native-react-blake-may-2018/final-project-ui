import React from 'react'
import api from '../api'
import * as awsCognito from 'amazon-cognito-identity-js';

export const login = user => ({
  type: 'LOGIN',
  user
})

export const persist = identity => ({
  type: 'PERSIST',
  identity
})

export const startPersist = identity => {
  return dispatch => {
    dispatch(persist(identity))

    return api.user.persistUser(identity).then(data => {
      const user = {
        ...data,
        token: identity.token
      }
      return dispatch(login(user))
    })
  }
}

export const startLogin = credentials => dispatch => {
  localStorage.setItem('token', credentials.token)
  dispatch(login(credentials))
}

export const startSignup = dossier => dispatch =>
  api.user.signup(dossier).then(data => {
    // appends token to data from server
    const user = {
      ...data,
      token: dossier.token
    }
    localStorage.uid = data.uid
    localStorage.q = dossier.token
    dispatch(login(user))
  })

export const updateUser = user => ({
  type: 'UPDATE_USER',
  user
})

export const startUpdateUser = user => dispatch => dispatch(updateUser(user))

export const logout = () => ({
  type: 'LOGOUT'
})

export const startLogout = () => dispatch => {
  // user pool data from cognito
  let data = {
    UserPoolId : 'us-east-2_fMMquWRem', // Your user pool id here
    ClientId : '1q83lmu6khfnc0v8jjdrde9291' // Your client id here
  };

  //gathers all cognito users from database in a variable
  let userPool = new awsCognito.CognitoUserPool(data);

  //gets current cognito user from database
  let cognitoUser = userPool.getCurrentUser();
  
  // checks to see if there is a cognito user
  if (cognitoUser != null) {
    //invalidates all tokens
    cognitoUser.globalSignOut({
      onSuccess: msg => {
        console.log('Result ', msg)
      },
      onFailure: err => {
        console.log('error: ', err)
      },
    });
  }

  //clears all tokens from local storage
  localStorage.clear();

  dispatch(logout())
}
