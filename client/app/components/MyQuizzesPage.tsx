import React, { Component } from 'react'
import moment from 'moment'
import numeral from 'numeral'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

interface IProps {
  username: string
  quizzes: any[]
  startGetUserQuizzes: (username: string) => any
}
const quizStyle = {
  background: '#86b2d8',
  borderRadius: 20,
  margin: '20px',
  padding: '20px',
  width: '20%'
}

export class MyQuizzesPage extends Component<IProps> {
  render() {
    const { quizzes } = this.props
    return (
      <div className="viewQuizzes-page">
        <h1>My Quizzes</h1>

        {quizzes !== undefined &&
          quizzes.map((quiz: any) => (
            // <Link to="/view-quiz/ + {quiz} " className="unset-anchor nav-link">
            <Link
              to={`/view-quiz/${quiz.uuid}`}
              className="unset-anchor nav-link"
            >
              <div
                style={quizStyle}
                key={quiz.uuid}
                // onClick={this.showQuiz.bind(this, quiz.uuid)}
              >
                <h1>{quiz.title}</h1>
                <p>{quiz.questions.length} questions</p>
                {quiz.tags.map(tag => (
                  <div key={tag.allLowerCase}>{tag.allLowerCase}</div>
                ))}
              </div>
            </Link>
          ))}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  username: state.auth.username,
  quizzes: state.quizzes.quizzes
})

export default connect(mapStateToProps)(MyQuizzesPage)
