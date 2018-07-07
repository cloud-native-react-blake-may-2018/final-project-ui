import React from 'react'

export const login = user => ({
  type: 'LOGIN',
  user
})

export const startLogin = credentials => dispatch => {
  localStorage.setItem('token', credentials.token)
  dispatch(login(credentials))
}

export const logout = () => ({
  type: 'LOGOUT'
})

export const startLogout = () => dispatch => {
  // removes everything from aws
  localStorage.clear()
  dispatch(logout())
}
