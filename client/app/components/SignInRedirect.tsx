import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import fontawesome from '@fortawesome/fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { startCreateNewQuiz } from '../actions/create'
import { environment, prod, dev } from '../environment/config'

// const dev = {
//   context: "https://8lomsjt0a6.execute-api.us-west-2.amazonaws.com/dev/"
//  };const prod = {
//   context: "https://8lomsjt0a6.execute-api.us-west-2.amazonaws.com/prod/"
//  };export const environment = process.env.NODE_ENV === "production" ? prod : dev;

let callbackUrl = environment === prod ? 'https://cloud-native-project-3-ui.s3-website.us-east-2.amazonaws.com/redirect' : 'http://localhost:3222/redirect'

export class SignInRedirect extends Component {
  componentDidMount() {
    let redirectUrl =
      'https://quizard.auth.us-east-2.amazoncognito.com/login?response_type=token&client_id=1q83lmu6khfnc0v8jjdrde9291&redirect_uri=http://localhost:3222/redirect'
    window.location.href = redirectUrl
  }

  render() {
    return <div />
  }
}

export default connect(
  undefined,
  { startCreateNewQuiz }
)(SignInRedirect)
