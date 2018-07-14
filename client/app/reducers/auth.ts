import React from 'react'

// login user obj will be placed in auth because of auth reducer
export const authReducer = (state = {}, action: any = {}) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        token: action.user.token,
        uid: action.user.sub, // what is this in cognito token?
        email: action.user.email,
        name: action.user.name,
        username: action.user.username
        // last: action.user.lastname,
        // profileImage: action.user.profileImage
      }

    case 'PERSIST':
      return {
        email: action.identity.email,
        token: action.identity.token,
        uid: action.identity.uid
      }

    case 'UPDATE_USER':
      console.log('now updating user in reducer')
      return {
        ...state,
        email: action.user.email,
        name: action.user.firstname,
        last: action.user.lastname,
        profileImage: action.user.url
      }
    case 'UPDATE_NAME':
      return {
        ...state,
        name: action.name
      }
    case 'UPDATE_EMAIL':
      return {
        ...state,
        email: action.email
      }

    case 'UPDATE_USER':
      console.log('now updating user in reducer')
      return {
        ...state,
        email: action.user.email,
        name: action.user.firstname,
        last: action.user.lastname,
        profileImage: action.user.url
      }

    case 'LOGOUT':
      return {}

    default:
      return state
  }
}
