import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import fontawesome from '@fortawesome/fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { startCreateNewQuiz } from '../actions/create'



export class SignInRedirect extends Component {
    componentDidMount () {
<<<<<<< HEAD
        let redirectUrl = 'https://quizard.auth.us-east-2.amazoncognito.com/login?response_type=token&client_id=1q83lmu6khfnc0v8jjdrde9291&redirect_uri=http://localhost:3222/dashboard/'
=======
        let redirectUrl = 'https://quizard.auth.us-east-2.amazoncognito.com/login?response_type=token&client_id=1q83lmu6khfnc0v8jjdrde9291&redirect_uri=http://localhost:3222/redirect'
>>>>>>> 5979e0f023f399dd3f41ae154e6a86385ba709a5
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
)(SignInRedirect)
