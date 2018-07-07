import React, { Component } from 'react'
import moment from 'moment'
import numeral from 'numeral'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { startUpdateQuestionsDisplay } from '../actions/quizzes'

interface IProps {
  username: any
  quiz: any
}
const tagStyle = {
  background: 'green',
  borderRadius: 20,
  // margin: "20px",
  padding: '20px',
  width: '10%'
}
const questionsStyle = {
  background: '#86b2d8',
  borderRadius: 20,
  // margin: "20px",
  padding: '20px',
  width: '20%',
  cursor: 'pointer'
}
const quizButton = {
  background: '#86b2d8',
  borderRadius: 20,
  // margin: "20px",
  padding: '20px',
  width: '5%'
}

export class ViewQuizPage extends Component<IProps> {
  state = {
    clickedQuestion: [],
    questionNumber: 0
  }

  params = window.location.href.split('/')
  quizUUID = this.params[4]

  public showQuizQuestion = (question: any, count: number, e: any) => {
    e.preventDefault()
    this.setState({
      ...this.state,
      questionNumber: count,
      clickedQuestion: [question]
    })
  }

  render() {
    const { quiz } = this.props
    let count = 0
    return (
      <div className="viewQuizzes-page">
        <h4>By: {quiz.author}</h4>
        <h1>{quiz.title}</h1>
        <h3>{quiz.questions.length} questions</h3>
        <div>
          <Link
            to={`/edit-quiz/${quiz.uuid}`}
            className="unset-anchor nav-link"
          >
            <div style={quizButton}>Edit Quiz</div>
          </Link>
          <Link
            to={`/take-quiz/${quiz.uuid}`}
            className="unset-anchor nav-link"
          >
            <div style={quizButton}>Take Quiz</div>
          </Link>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  username: state.auth.username,
  quiz: state.quizzes.quizzes.find(
    quiz => quiz.uuid === props.match.params.uuid
  )
  // clickedQuestion: state.quizzes.clickedQuestion
})

export default connect(mapStateToProps)(ViewQuizPage)
