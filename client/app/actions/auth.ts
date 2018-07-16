import React from 'react'
import { startGetUserQuizzes } from './quizzes'
import { environment } from '../../../environment'
import * as awsCognito from 'amazon-cognito-identity-js'

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
  const data = {
    UserPoolId: 'us-east-2_fMMquWRem', // Your user pool id here
    ClientId: '1q83lmu6khfnc0v8jjdrde9291' // Your client id here
  }
  const userPool = new awsCognito.CognitoUserPool(data)
  const cognitoUser = userPool.getCurrentUser()
  console.log(cognitoUser)
  if (cognitoUser != null) {
    // console.log(this.props.cognitoUser.user)
    // cognitoUser.signOut();
    // console.log(this.props.cognitoUser.user)
    cognitoUser.globalSignOut({
      onSuccess: () => {
        console.log('successful logout')
      },
      onFailure: err => {
        console.log(cognitoUser)
        console.log(err)
      }
    })
  }

  localStorage.clear()
  // let redirectUrl = `https://quizard.auth.us-east-2.amazoncognito.com/logout?response_type=code&client_id=1q83lmu6khfnc0v8jjdrde9291&redirect_uri=${
  //   environment.context
  // }/redirect`
  let redirectUrl = `https://quizard.auth.us-east-2.amazoncognito.com/logout?response_type=code&client_id=1q83lmu6khfnc0v8jjdrde9291&redirect_uri=${
    environment.context
  }`
  window.location.href = redirectUrl
  window.location.reload()
  // window.location.href = redirectUrl
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
