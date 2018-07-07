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
const quizStyle = {
  background: '#86b2d8',
  borderRadius: 20,
  // margin: "20px",
  padding: '20px',
  width: '20%'
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
        <h1>My Quiz</h1>
        <h4>{quiz.title}</h4>

        {/* THERE IS STYLING BELOW THAT CAN BE TAKEN OUT, JUST THERE TO SHOW THAT QUESTIONS ARE IN THERE OWN DIV
        SO THEY CAN BE PUT INTO SOME KIND OF SCROLLABLE OBJECT LIKE THE FIGMA */}
        {quiz.tags.map(tag => (
          <div style={quizStyle} key={tag.allLowerCase}>
            {tag.allLowerCase}
          </div>
        ))}

        {/* THERE IS STYLING BELOW THAT CAN BE TAKEN OUT, JUST THERE TO SHOW THAT QUESTIONS ARE IN THERE OWN DIV
        SO THEY CAN BE PUT INTO SOME KIND OF SCROLLABLE OBJECT LIKE THE FIGMA */}
        <div style={quizStyle}>
          {quiz.questions.map(tag => (
            <div key={tag.allLowerCase}>
              <h4
                onClick={this.showQuizQuestion.bind(
                  this,
                  quiz.questions[count],
                  count + 1
                )}
              >
                Question {(count += 1)}
              </h4>
            </div>
          ))}
        </div>
        {/* <button> */}
        <Link to={`/view-quiz/${quiz.uuid}`}>
          <div style={quizStyle}>Take Quiz!</div>
        </Link>
        {/* </button> */}

        {console.log(this.state.clickedQuestion)}
        {this.state.clickedQuestion !== undefined
          ? this.state.clickedQuestion.map(question => (
              <div key={question.uuid}>
                <h1>Question {this.state.questionNumber}</h1>
                <h3>{question.title}</h3>
                {this.state.clickedQuestion[0].answers.map(question => (
                  <div key={question.answer}>
                    <p>{question.answer}</p>
                  </div>
                ))}
              </div>
            ))
          : null}
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
