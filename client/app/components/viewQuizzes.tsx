import React, { Component } from 'react'
import moment from 'moment'
import numeral from 'numeral'
import { startDisplayQuizzes } from '../actions/quiz'
import { connect } from 'react-redux'

interface IProps {
  username: any
  startDisplayQuizzes: (any) => any
  quizzes: any[]
}

export class ViewQuizzesPage extends Component<IProps> {
  //@ts-ignore
  componentDidMount = () => {
    console.log(this.props)
    console.log(sessionStorage)
    const { username, startDisplayQuizzes } = this.props
    startDisplayQuizzes(username)
  }

  render() {
    return (
      <div className="viewQuizzes-page">
        <h1>View Quizzes</h1>
        {/* {console.log(username)} */}
        {this.props.quizzes.map((quiz: any) => {
          return (
            <div key={quiz.uuid}>
              <h1>{quiz.uuid}</h1>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  username: state.auth.username,
  quizzes: state.quiz.quizzes
})

export default connect(
  mapStateToProps,
  { startDisplayQuizzes }
)(ViewQuizzesPage)
