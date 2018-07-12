import React from 'react'
import { startGetUserQuizzes } from './quizzes'
// import api from '../api'
import * as awsCognito from 'amazon-cognito-identity-js'
import Axios from '../../../node_modules/axios'
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
  localStorage.clear()
  let redirectUrl =
    'https://quizard.auth.us-east-2.amazoncognito.com/logout?response_type=token&client_id=1q83lmu6khfnc0v8jjdrde9291&redirect_uri=http://localhost:3222/redirect'
  // let redirectUrl =
  //   'https://quizard.auth.us-east-2.amazoncognito.com/logout?response_type=token&client_id=1q83lmu6khfnc0v8jjdrde9291&redirect_uri=http://cloud-native-project-3-ui.s3-website.us-east-2.amazonaws.com/redirect'
  window.location.href = redirectUrl
}
