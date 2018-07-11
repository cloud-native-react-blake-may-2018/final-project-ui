import React, { Component } from 'react'
import { Router, Route, Switch, RouteComponentProps } from 'react-router-dom'
import { Provider, connect } from 'react-redux'
import { hot } from 'react-hot-loader'
import decode from 'jwt-decode'
import * as awsCognito from 'amazon-cognito-identity-js'

import { Pages } from './Routes'

import { startLogin } from '../actions/auth'
import { startGetUserQuizzes } from '../actions/quizzes'
import { configureStore } from '../store/configureStore'

const store = configureStore()

interface IPayload {
  email: string
  sub: string
  name: string
  username: string
}

// TODO: data persistence from localhost
if (localStorage.userInfoToken) {
  const data = {
    ClientId: '1q83lmu6khfnc0v8jjdrde9291', // Your client id here
    UserPoolId: 'us-east-2_fMMquWRem' // Your user pool id here
  }
  const userPool = new awsCognito.CognitoUserPool(data)
  const cognitoUser = userPool.getCurrentUser()

  const payload: IPayload = JSON.parse(localStorage.userInfoToken)
  const user = {
    email: payload.email,
    token: localStorage.token,
    uid: payload.sub, // what is this in cognito token?
    name: payload.name,
    // @ts-ignore
    username: payload.username
  }
console.log('user', user)
console.log('payload', payload)
  // TODO: Confirm this is working.
  const repopulate = async () => {
    // @ts-ignore
    await store.dispatch(startLogin(user))
    // @ts-ignore
    await store.dispatch(startGetUserQuizzes(user.username))
  }

  repopulate()
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
