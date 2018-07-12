import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import fontawesome from '@fortawesome/fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { startCreateNewQuiz } from '../actions/create'

export class SignOutRedirect extends Component {
    componentDidMount () {
        let redirectUrl = 'https://quizard.auth.us-east-2.amazoncognito.com/logout?response_type=token&client_id=1q83lmu6khfnc0v8jjdrde9291&redirect_uri=http://localhost:3222/'
        window.location.href = redirectUrl
    }

  render() {
    
    return (
      <div>
        
      </div>
    )
  }
}

export default connect(
  undefined,
  { startCreateNewQuiz }
)(SignOutRedirect)
