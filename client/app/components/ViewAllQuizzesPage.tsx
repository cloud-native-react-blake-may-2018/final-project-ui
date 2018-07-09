import React, { Component } from 'react'
import { connect } from 'react-redux'
import { startGetUserQuizzes } from '../actions/quizzes'

interface IProps {
  username: string
  startGetUserQuizzes: (username: string) => any
}

export class ViewAllQuizzesPage extends Component<IProps> {
  // @ts-ignore
  componentDidMount = () => {
    const { username, startGetUserQuizzes } = this.props
    startGetUserQuizzes(username)
  }

  // @ts-ignore
  render = () => {
    return (
      <div className="view-all-quizzes-page">
        <div className="main">
          <h1>Your Quizzes</h1>
          {}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  username: state.auth.username,
  quizzes: state.quiz.all
})

export default connect(
  mapStateToProps,
  { startGetUserQuizzes }
)(ViewAllQuizzesPage)
