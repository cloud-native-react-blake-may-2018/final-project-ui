import React from 'react'
// import api from '../api'
import * as awsCognito from 'amazon-cognito-identity-js';
import decode from 'jwt-decode'

export const login = user => ({
  type: 'LOGIN',
  user
})

export const startLogin = credentials => dispatch => {
  // let data = {
  //   UserPoolId : 'us-east-2_fMMquWRem', // Your user pool id here
  //   ClientId : '1q83lmu6khfnc0v8jjdrde9291' // Your client id here
  // }
  // let userPool = new awsCognito.CognitoUserPool(data);
  // let cognitoUser = userPool.getCurrentUser();
  // console.log('Payload: ', credentials.token.payload)
  localStorage.setItem('token', credentials.token)
  dispatch(login(credentials))
}

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
