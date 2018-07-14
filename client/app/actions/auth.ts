import React from 'react'
import { startGetUserQuizzes } from './quizzes'
// import api from '../api'
import * as awsCognito from 'amazon-cognito-identity-js'
import Axios from '../../../node_modules/axios'
import { environment } from '../../../environment'

export const login = user => ({
  type: 'LOGIN',
  user
})

export const startLogin = credentials => {
  return async dispatch => {
    await dispatch(login(credentials))
    // localStorage.setItem('token', credentials.token)

    return await dispatch(startGetUserQuizzes(credentials.username))
  }
}

export const logout = () => ({
  type: 'LOGOUT'
})

export const startLogout = () => dispatch => {
  // user pool data from cognito
  // const data = {
  //   UserPoolId : '...', // Your user pool id here
  //   ClientId : '...' // Your client id here
  // };
  //   const userPool = new awsCognito.CognitoUserPool(data);
  //   const cognitoUser = userPool.getCurrentUser();

  // if (cognitoUser != null) {
  //   // console.log(this.props.cognitoUser.user)
  //   // cognitoUser.signOut();
  //   // console.log(this.props.cognitoUser.user)
  //   cognitoUser.globalSignOut({
  //     onFailure: this.onFailure,
  //     onSuccess: this.onSuccess,
  //   });
  // }
  localStorage.clear();
  let redirectUrl = `https://quizard.auth.us-east-2.amazoncognito.com/logout?response_type=token&client_id=1q83lmu6khfnc0v8jjdrde9291&redirect_uri=${
    environment.context
  }/redirect`
  window.location.href = redirectUrl
}
export const updateName = (name: string) => ({
  type: 'UPDATE_NAME',
  name
})

export const startUpdateName = name => dispatch => {
  dispatch(updateName(name))
}

export const updateEmail = (email: string) => ({
  type: 'UPDATE_EMAIL',
  email
})

export const startUpdateEmail = email => dispatch => {
  dispatch(updateEmail(email))
}