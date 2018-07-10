import React, { Component } from 'react'
import moment from 'moment'
import numeral from 'numeral'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Spinner from 'react-spinkit'

interface IProps {
  username: any
  quiz: any
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

  // @ts-ignore
  render = () => {
    const { quiz } = this.props
    return (
      <div className="view-quiz-page">
        {quiz.questions === undefined && (
          <Spinner className="loading-indicator" name="ball-spin-fade-loader" />
        )}
        {quiz.questions !== undefined && (
          <div className="main">
            <main>
              <p className="author">By: {quiz.author}</p>
              <h1 className="title">{quiz.title}</h1>
              <h2 className="total">{quiz.questions.length} questions</h2>
            </main>
            <footer>
              <Link to={`/edit-quiz/${quiz.uuid}`} className="link">
                <p className="edit-button">Edit quiz</p>
              </Link>
              <Link to={`/take-quiz/${quiz.uuid}`} className="link">
                <p className="take-button">Take quiz</p>
              </Link>
            </footer>
          </div>
        )}
      </div>
    )
  }
}

// flag 1: quizzes.quizzes -> quizzes.all
const mapStateToProps = (state, props) => ({
  username: state.auth.username,
  quiz:
    state.quizzes.all !== undefined &&
    state.quizzes.all.find(quiz => quiz.uuid === props.match.params.uuid)
  // clickedQuestion: state.quizzes.clickedQuestion
})

export default connect(mapStateToProps)(ViewQuizPage)
