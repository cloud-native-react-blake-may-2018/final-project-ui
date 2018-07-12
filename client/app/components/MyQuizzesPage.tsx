import React, { Component } from 'react'
import moment from 'moment'
import numeral from 'numeral'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

interface IProps {
  username: string
  quizzes: any[]
  type: string
}

export class MyQuizzesPage extends Component<IProps> {
  //@ts-ignore
  render = () => {
    const { quizzes, type } = this.props
    return (
      <div className="my-quizzes-page">
        {type === 'created' && (
          <p className="links">
            <Link to="/quizzes/created" className="quiz-type">
              created
            </Link>&nbsp;/&nbsp;<Link to="/quizzes/taken">taken</Link>
          </p>
        )}
        {type === 'taken' && (
          <p className="links">
            <Link to="/quizzes/created">created</Link>&nbsp;/&nbsp;<Link
              to="/quizzes/taken"
              className="quiz-type"
            >
              taken
            </Link>
          </p>
        )}

        <div className="blocks">
          {quizzes !== undefined &&
            quizzes.map((quiz: any) => (
              <Link to={`/view-quiz/${quiz.uuid}`} key={quiz.uuid}>
                <div className="block">
                  <h1 className="name">{quiz.title}</h1>
                  <p className="amount">{quiz.questions.length} questions</p>
                  {quiz.tags.map(tag => (
                    <div key={tag.allLowerCase} className="tag">
                      {tag.allLowerCase}
                    </div>
                  ))}
                </div>
              </Link>
            ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  username: state.auth.username,
  quizzes: state.quizzes.all,
  type: props.match.params.type
})

export default connect(mapStateToProps)(MyQuizzesPage)
