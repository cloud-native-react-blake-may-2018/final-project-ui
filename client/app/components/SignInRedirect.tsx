import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import fontawesome from '@fortawesome/fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { startCreateNewQuiz } from '../actions/create'
import { environment } from '../../../environment'

export class SignInRedirect extends Component {
  // @ts-ignore
  componentDidMount = () => {
    // let redirectUrl = `https://quizard.auth.us-east-2.amazoncognito.com/login?response_type=token&client_id=1q83lmu6khfnc0v8jjdrde9291&redirect_uri=https://dwea2klqp52vb.cloudfront.net/redirect`

    // let redirectUrl = `https://quizard.auth.us-east-2.amazoncognito.com/login?response_type=token&client_id=1q83lmu6khfnc0v8jjdrde9291&redirect_uri=http://localhost:3222/redirect/__webpack_hmr`

    // let redirectUrl = `https://quizard.auth.us-east-2.amazoncognito.com/login?response_type=token&client_id=1q83lmu6khfnc0v8jjdrde9291&redirect_uri=http://localhost:3222/redirect/client?reload=true`

    // working: do not change
    let redirectUrl =
      process.env.NODE_ENV === 'production'
        ? `https://quizard.auth.us-east-2.amazoncognito.com/login?response_type=token&client_id=1q83lmu6khfnc0v8jjdrde9291&redirect_uri=${
            environment.context
          }/redirect`
        : `https://quizard.auth.us-east-2.amazoncognito.com/login?response_type=token&client_id=1q83lmu6khfnc0v8jjdrde9291&redirect_uri=${
            environment.context
          }/redirect/__webpack_hmr`

    console.log('environment', environment.context)
    console.log('redirect url', redirectUrl)

    window.location.href = redirectUrl
  }

  // @ts-ignore
  render = () => {
    return <div />
  }
}

export default connect(
  undefined,
  { startCreateNewQuiz }
)(SignInRedirect)
