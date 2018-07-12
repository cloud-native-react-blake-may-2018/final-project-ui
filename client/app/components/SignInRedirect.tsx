import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import fontawesome from '@fortawesome/fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { startCreateNewQuiz } from '../actions/create'
import { environment } from '../../../environment'

export class SignInRedirect extends Component {
  componentDidMount() {
    console.log('environment: ', environment.context)
    let redirectUrl = `https://quizard.auth.us-east-2.amazoncognito.com/login?response_type=token&client_id=1q83lmu6khfnc0v8jjdrde9291&redirect_uri=${
      environment.context
    }/redirect`
  }
  //   console.log('env: ', environment.context)
  //   let redirectUrl =
  //     'https://quizard.auth.us-east-2.amazoncognito.com/login?response_type=token&client_id=1q83lmu6khfnc0v8jjdrde9291&redirect_uri=http://localhost:3222/redirect'
  //   window.location.href = redirectUrl
  // }

  render() {
    return <div />
  }
}

export default connect(
  undefined,
  { startCreateNewQuiz }
)(SignInRedirect)
