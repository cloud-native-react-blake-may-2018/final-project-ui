import Axios from 'axios'
import React from 'react'
import { startGetUserQuizzes } from './quizzes'
// import api from '../api'
import * as awsCognito from 'amazon-cognito-identity-js';
export const login = user => ({
  type: 'LOGIN',
  user
})

export const startLogin = credentials => {
  return async dispatch => {
    console.log('credentials', credentials)
    await dispatch(login(credentials))
    // localStorage.setItem('token', credentials.token)

    return await dispatch(startGetUserQuizzes(credentials.username))
  }
}

export const logout = () => ({
  type: 'LOGOUT'
})

export const startLogout = () => dispatch => {
  
  // checks to see if there is a cognito user
   
  const url = 'https://quizard.auth.us-east-2.amazoncognito.com/logout?client_id=1q83lmu6khfnc0v8jjdrde9291&logout_uri=http://localhost:3222/'; // site that doesn’t send Access-Control-*
    fetch(url, {mode: 'no-cors'})
    .then((Response) => {
      console.log('Sucessful Logout')
      console.log(Response)
      alert('success')
      alert('success')
      setTimeout(alert('success'), 8000);
    })
    .catch((err) => {
      console.log('err', err)
      setTimeout(alert(err), 8000);
    });
    //clears all tokens from local storage
    // localStorage.clear();
  dispatch(logout())
  }
// https://quizard.auth.us-east-2.amazoncognito.com/login?client_id=1q83lmu6khfnc0v8jjdrde9291&redirect_uri=http://localhost:3222/dashboard
// https://quizard.auth.us-east-2.amazoncognito.com/logout?client_id=1q83lmu6khfnc0v8jjdrde9291&logout_uri=http://localhost:3222/