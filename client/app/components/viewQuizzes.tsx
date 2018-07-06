import React, { Component } from 'react'
import moment from 'moment'
import numeral from 'numeral'
<<<<<<< HEAD
import {
  startDisplayQuizzes,
  startDisplayQuizQuestions,
  startDisplayQuizTags
} from '../actions/quizzes'
=======
>>>>>>> 5520c805e791a1e9bc18745e150a2f2446a9425b
import { connect } from 'react-redux'

interface IProps {
  username: any
  quizzes: any[]
  startGetUserQuizzes: (username: string) => any
}

export class ViewQuizzesPage extends Component<IProps> {
  render() {
    const { quizzes } = this.props
    return (
      <div className="viewQuizzes-page">
        <h1>My Quizzes</h1>

        {quizzes !== undefined &&
          quizzes.map((quiz: any) => (
            <div key={quiz.uuid}>
              <h1>{quiz.title}</h1>
              <p>{quiz.questions.length} questions</p>
              {quiz.tags.map(tag => (
                <div key={tag.allLowerCase}>{tag.allLowerCase}</div>
              ))}
            </div>
          ))}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  username: state.auth.username,
  quizzes: state.quizzes.quizzes
})

export default connect(mapStateToProps)(ViewQuizzesPage)
