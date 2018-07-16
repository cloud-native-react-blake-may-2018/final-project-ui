import React from 'react'
import { startGetUserQuizzes } from './quizzes'
import { environment } from '../../../environment'

export const login = user => ({
  type: 'LOGIN',
  user
})

export const startLogin = credentials => {
  return async dispatch => {
    await dispatch(login(credentials))

    return await dispatch(startGetUserQuizzes(credentials.username))
  }
}

export const logout = () => ({
  type: 'LOGOUT'
})

export const startLogout = () => dispatch => {
  // user pool data from cognito
  localStorage.clear()
  let redirectUrl = `https://quizard.auth.us-east-2.amazoncognito.com/logout?response_type=token&client_id=1q83lmu6khfnc0v8jjdrde9291&redirect_uri=${
    environment.context
  }/redirect`
  window.location.href = redirectUrl
}
