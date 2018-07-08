import React, { Component } from 'react'
import moment from 'moment'
import numeral from 'numeral'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { startAddAnswerToObject } from '../actions/quizzes'
import { AnswersObj } from '../models/AnswersObj'

interface IProps {
  username: any
  quiz: any
  answers: AnswersObj[]
  startAddAnswerToObject: (answers: AnswersObj[]) => any
}

const questionStyle = {
  cursor: 'poninter'
}

export class TakeQuizPage extends Component<IProps> {
  state = {
    clickedQuestion: [],
    questionNumber: 0
  }

  params = window.location.href.split('/')
  quizUUID = this.params[4]

  public previousQuizQuestion = (e: any) => {
    e.preventDefault()
    this.setState({
      ...this.state,
      questionNumber: (this.state.questionNumber -= 1)
    })
  }
  public nextQuizQuestion = (e: any) => {
    e.preventDefault()
    this.setState({
      ...this.state,
      questionNumber: (this.state.questionNumber += 1)
    })
  }

  public addAnswerToObject = (answer: any) => {
    console.log(answer)
    answer.selected = true
    console.log(answer)
    this.props.startAddAnswerToObject(answer)
    // console.log(this.props.answerObject)
  }

  public submit = () => {
    console.log(this.props.answers)
  }

  render() {
    const { quiz } = this.props
    return (
      <div className="viewQuizzes-page">
        {/* DISPLAYS QUIZ TITLE */}
        <h1>{quiz.title}</h1>
        {/* DISPLAYS WHAT QUESTION NUMBER THE USER IS ON */}
        <h3>Question {this.state.questionNumber + 1}</h3>
        {/* DISPLAYS THE QUESTION */}
        <h5>{quiz.questions[this.state.questionNumber].title}</h5>
        {/* DISPLAYS THE QUESTION NUMBER THEY ARE ON OUT OF TOTAL */}
        <h3>
          Question {this.state.questionNumber + 1}/{quiz.questions.length}
        </h3>
        {/* DISPLAYS THE CHOICES */}
        <div>
          {console.log(quiz.questions)}
          {quiz.questions[this.state.questionNumber].answers.map(answers => (
            <div style={questionStyle} key={answers.answer}>
              <p onClick={this.addAnswerToObject.bind(this, answers.answer)}>
                {answers.answer}
              </p>
            </div>
          ))}
        </div>

        {this.state.questionNumber !== 0 ? (
          <button onClick={this.previousQuizQuestion}>previous</button>
        ) : null}
        {this.state.questionNumber + 1 !== quiz.questions.length ? (
          <button onClick={this.nextQuizQuestion}>next</button>
        ) : (
          <button onClick={this.submit}>Submit</button>
        )}

        {/* {console.log(this.state.clickedQuestion)}
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
          : null} */}
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  username: state.auth.username,
  quiz: state.quizzes.quizzes.find(
    quiz => quiz.uuid === props.match.params.uuid
  ),
  answers: state.quizzes.answers
  // clickedQuestion: state.quizzes.clickedQuestion
})

export default connect(
  mapStateToProps,
  { startAddAnswerToObject }
)(TakeQuizPage)
