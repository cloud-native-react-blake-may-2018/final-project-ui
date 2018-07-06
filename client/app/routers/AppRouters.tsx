import React, { Component } from 'react'
import { Router, Route, Switch, RouteComponentProps } from 'react-router-dom'
import { Provider, connect } from 'react-redux'
import { hot } from 'react-hot-loader'
import decode from 'jwt-decode'

import { Pages } from './Routes'

import { startLogin } from '../actions/auth'
import { configureStore } from '../store/configureStore'

const store = configureStore()

interface IPayload {
  email: string
  sub: string
  name: string
  username: string
}

// TODO: data persistence from localhost
if (localStorage.token) {
  const payload: IPayload = decode(localStorage.token)
  const user = {
    email: payload.email,
    token: localStorage.token,
    uid: payload.sub, // what is this in cognito token?
    name: payload.name,
    username: payload.username
  }

  console.log('token: ', localStorage.token)
  console.log('decoded token: ', payload)

  // @ts-ignore
  store.dispatch(startLogin(user))
}

export class AppRouter extends Component {
  // @ts-ignore
  render = () => {
    return (
      <Provider store={store}>
        <Pages />
      </Provider>
    )
  }
}

export default hot(module)(AppRouter)
