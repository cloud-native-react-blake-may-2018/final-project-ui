import React, { Component } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import * as awsCognito from 'amazon-cognito-identity-js'

import { startLogin } from '../actions/auth'

interface IData {
  username: string
  token: string
}

// define types of props, with route component props included
interface IProps {
  startLogin(data: IData): any
}

// define types of state
interface IState {
  username: string
  password: string
  errors: {
    username: string
    password: string
    global?: string
  }
}
// include both prop types and state types with class
export class LoginPage extends Component<IProps, IState> {
  state = {
    username: '',
    password: '',
    errors: {
      username: '',
      password: '',
      global: ''
    }
  }
  onFieldChange = ({ target }) => {
    let { name, value }: { name: keyof IState; value: string } = target
    this.setState({
      [name]: value
    } as any)
  }

  create = e => {
    e.preventDefault()
    // api.user.createTable()
  }

  onSubmit = e => {
    e.preventDefault()
    const initialData = {
      username: this.state.username,
      password: this.state.password
    }

    // check username is not blank
    if (this.state.username.length === 0) {
      this.setState(prevState => ({
        errors: {
          username: 'username field cannot be blank',
          password: prevState.errors.password
        }
      }))
      // ??
    } else if (this.state.username.length > 0) {
      this.setState(prevState => ({
        errors: {
          username: '',
          password: prevState.errors.password
        }
      }))
    }
    // TODO: implement email regex
    // else if (!this.state.email.match(emailRegex)) {
    //   this.setState(prevState => ({
    //     errors: {
    //       email: 'please enter a valid email',
    //       password: prevState.errors.password
    //     }
    //   }))
    // }

    // check password is not blank
    if (this.state.password.length === 0) {
      this.setState(prevState => ({
        errors: {
          username: prevState.errors.username,
          password: 'password field cannot be blank'
        }
      }))
      // ??
    } else if (this.state.password.length > 0) {
      this.setState(prevState => ({
        errors: {
          username: prevState.errors.username,
          password: ''
        }
      }))
    }

    // if checks pass, send user data to the server
    if (this.state.username.length > 0 && this.state.password.length > 0) {
      const { username, password } = this.state
      const arr = [...username]

      // gets credentials
      const credentials = { username, password }

      const authenticationData = {
        Password: credentials.password,
        Username: credentials.username
      }

      // store credentials in amazon object
      const authenticationDetails = new awsCognito.AuthenticationDetails(
        authenticationData
      )
      // data defined in cognito
      const poolData = {
        ClientId: '1q83lmu6khfnc0v8jjdrde9291', // Your client id here
        UserPoolId: 'us-east-2_fMMquWRem' // Your user pool id here
      }
      // access user pool with pool data
      const userPool = new awsCognito.CognitoUserPool(poolData)

      // access user from user pool
      const userData = {
        Pool: userPool,
        Username: credentials.username
      }

      // create user from previous object buids
      const cognitoUser = new awsCognito.CognitoUser(userData)

      // and authenticate them
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: result => {
          const token = result.getIdToken().getJwtToken()

          /******************************************************************
           * I Don't Know if this is needed
           ******************************************************************/
          const data = {
            username: cognitoUser.getUsername(),
            token
          }
          this.props.startLogin(data).catch(err => {
            console.log('front end error', err)
            return this.setState({ errors: err.response.data.errors })
          })
        },
        onFailure: err => {
          console.log('password error: ', err)
          if (
            err.code === 'UserNotFoundException' ||
            err.code === 'NotAuthorizedException'
          ) {
            this.setState({
              errors: {
                ...this.state.errors,
                global: 'Invalid Credentials, try again.'
              }
            })
            // this.props.updateError('Invalid Credentials, try again.')
          } else {
            console.log('Unable to login at this time, please try again later')
            // this.props.updateError(
            //   'Unable to login at this time, please try again later'
            // )
          }
        }
      })
    }
  }

  // @ts-ignore
  render = () => {
    const { errors } = this.state
    return (
      <div className="login-page">
        <div className="login-bg" />
        <Link to="/">
          <h1 className="app-name">Quizzard</h1>
        </Link>
        <form
          className="login-form"
          onChange={this.onFieldChange}
          onSubmit={this.onSubmit}
        >
          {errors.global && <p className="global-errors">{errors.global}</p>}
          <div className="input-group">
            <label className="title">username</label>
            <input
              type="text"
              name="username"
              style={{
                border: !!errors.username ? '2px solid #e87c7c' : 'none'
              }}
            />
            {errors.username && (
              <p className="inline-errors">{errors.username}</p>
            )}
          </div>
          <div className="input-group">
            <label className="title">password</label>
            <input
              type="password"
              name="password"
              style={{
                border: !!errors.password ? '2px solid #e87c7c' : 'none'
              }}
            />
            {errors.password && (
              <p className="inline-errors">{errors.password}</p>
            )}
          </div>
          <div className="input-group">
            <div className="switch-page">
              <p className="text">Don't have an account?</p>
              <Link to="/signup" className="signup-link">
                &nbsp;Signup
              </Link>
            </div>
            <button type="submit" className="login-button button">
              Login
            </button>
            {/* <GoogleButton onClick={() => {console.log('Google Button clicked!')}} /> */}

            {/* <GoogleLogin 
              clientId='636482594885-49889hn7ee5or2eduu5lrkq5ncngflng.apps.googleusercontent.com'
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
             /> */}
          </div>
        </form>
        <div className="overlay" />
        <div className="bg" />
      </div>
    )
  }
}

export default connect(
  null,
  { startLogin }
)(LoginPage)
