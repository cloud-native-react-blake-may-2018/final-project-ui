import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import fontawesome from '@fortawesome/fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { startCreateNewQuiz } from '../actions/create'

export class CreateQuiz extends Component {
  render() {
    return (
      <div>
        <Link to="/add-quiz" className="create-quiz-page">
          Add Quiz
        </Link>
        <Link to="/test-quiz" className="create-quiz-page">
          Test Quiz
        </Link>
        <Link to="/view-quiz" className="create-quiz-page">
          View Quizzes
        </Link>
        <Link to="/add-question" className="create-quiz-page">
          Add Question
        </Link>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  username: state.auth.username,
  email: state.auth.email,
  firstname: state.auth.firstname
})

export default connect(
  undefined,
  { startCreateNewQuiz }
)(CreateQuiz)
