import React from 'react'
import { startGetUserQuizzes } from './quizzes'

export const login = user => ({
  type: 'LOGIN',
  user
})

export const startLogin = credentials => {
  return async dispatch => {
    await dispatch(login(credentials))
    localStorage.setItem('token', credentials.token)

    return await dispatch(startGetUserQuizzes(credentials.username))
  }
}

export const logout = () => ({
  type: 'LOGOUT'
})

export const startLogout = () => dispatch => {
  // removes everything from aws
  localStorage.clear()
  dispatch(logout())
}
