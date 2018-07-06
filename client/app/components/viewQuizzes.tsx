import React, { Component } from 'react'
import moment from 'moment'
import numeral from 'numeral'
import {
  startDisplayQuizzes,
  startDisplayQuizQuestions,
  startDisplayQuizTags
} from '../actions/quiz'
import { connect } from 'react-redux'

interface IProps {
  username: any
  startDisplayQuizzes: (username: string) => any
  startDisplayQuizQuestions: (quizUUID: string) => any
  startDisplayQuizTags: (quizUUID: string) => any
  quizzes: any[]
  questions: any[]
  tags: any[]
}

export class ViewQuizzesPage extends Component<IProps> {
  //@ts-ignore
  componentDidMount = () => {
    const username = 'Eric'
    const {
      // username,
      startDisplayQuizzes
    } = this.props
    // console.log(username)
    startDisplayQuizzes(username)
    // startDisplayQuizQuestions(quiz.uuid)
  }

  render() {
    const { startDisplayQuizQuestions, startDisplayQuizTags } = this.props
    return (
      <div className="viewQuizzes-page">
        <h1>My Quizzes</h1>

        {/* {console.log(username)} */}
        {this.props.quizzes.map((quiz: any) => (
          <div key={quiz.uuid}>
            <h1>{quiz.title}</h1>
            {/* {console.log(quiz.uuid)} */}
            {/* {startDisplayQuizQuestions(quiz.uuid)} */}
            {/* {startDisplayQuizTags(quiz.uuid)} */}

            <h3>{this.props.questions.length} Questions</h3>
            {/* <h3>{this.props.tags} Tags</h3> */}
          </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  username: state.auth.username,
  quizzes: state.quiz.quizzes,
  questions: state.quiz.questions,
  tags: state.quiz.tags
})

export default connect(
  mapStateToProps,
  { startDisplayQuizzes, startDisplayQuizQuestions, startDisplayQuizTags }
)(ViewQuizzesPage)
