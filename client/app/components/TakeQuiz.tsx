import React, { Component } from 'react'
import moment from 'moment'
import numeral from 'numeral'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  startAddAnswerToArray,
  changeQuestionNumber,
  addMultipleSelectAnswer,
  addMultipleChoiceAnswer,
  updateMultipleSelectAnswer
} from '../actions/quizzes'
import Spinner from 'react-spinkit'

interface IProps {
  username: any
  quiz: any
  questionNumber: any
  multipleSelectAnswer: any
  multipleChoiceAnswer: any[]
  answerArray: any
  changeQuestionNumber: (questionNumber: number) => void
  startAddAnswerToArray: (answerObj: {}) => void
  addMultipleChoiceAnswer: (answerObj: {}) => void
  addMultipleSelectAnswer: (answerObj: {}) => void
  updateMultipleSelectAnswer: (answerArray: any[]) => void
}

const questionStyle = {
  cursor: 'poninter'
}

export class TakeQuizPage extends Component<IProps, any> {
  constructor(props) {
    super(props)
  }

  params = window.location.href.split('/')
  quizUUID = this.params[4]

  public previousQuizQuestion = (e: any) => {
    e.preventDefault()
    this.props.changeQuestionNumber(this.props.questionNumber - 1)
  }
  public nextQuizQuestion = (choices: object) => {
    // console.log(choices[this.props.questionNumber].format)
    if (
      this.props.multipleSelectAnswer.answer.length > 0 ||
      this.props.multipleChoiceAnswer !== null
    ) {
      if (
        choices[this.props.questionNumber].format === 'multiple-choice' ||
        choices[this.props.questionNumber].format === 'true-false'
      ) {
        this.props.startAddAnswerToArray(this.props.multipleChoiceAnswer)
        this.props.changeQuestionNumber(this.props.questionNumber + 1)
      } else if (
        choices[this.props.questionNumber].format === 'multiple-select'
      ) {
        this.props.startAddAnswerToArray(this.props.multipleSelectAnswer)
        this.props.changeQuestionNumber(this.props.questionNumber + 1)
      }
    } else {
      this.props.changeQuestionNumber(this.props.questionNumber + 1)
    }
  }

  public addAnswerToObject = (choices: object, answer: any) => {
    switch (choices[this.props.questionNumber].format) {
      case 'multiple-choice':
        // console.log(choices[this.props.questionNumber])
        console.log(this.props.answerArray)
        //   if(this.props.answerArray.includes(choices[this.props.questionNumber].title)){

        //   }
        //   else{

        //   }
        this.props.addMultipleChoiceAnswer({
          author: choices[this.props.questionNumber].author,
          title: choices[this.props.questionNumber].title,
          answer: answer.answer
        })
        break
      case 'multiple-select':
        console.log(this.props.answerArray)

        let newArray: any[]
        if (this.props.multipleSelectAnswer.answer.includes(answer.answer)) {
          console.log('here')
          const index = this.props.multipleSelectAnswer.answer.indexOf(
            answer.answer
          )
          console.log(`index: ${index}`)
          newArray = this.props.multipleSelectAnswer.answer
          console.log(`index: ${newArray}`)
          newArray.splice(index, 1)
          console.log(`index: ${newArray}`)
          this.props.updateMultipleSelectAnswer(newArray)
        } else {
          newArray = this.props.multipleSelectAnswer.answer
          newArray.push(answer.answer)
          this.props.addMultipleSelectAnswer({
            author: choices[this.props.questionNumber].author,
            title: choices[this.props.questionNumber].title,
            answer: newArray
          })
        }
        break

      case 'true-false':
        console.log(this.props.answerArray)

        this.props.addMultipleChoiceAnswer({
          author: choices[this.props.questionNumber].author,
          title: choices[this.props.questionNumber].title,
          answer: answer.answer
        })
        break
    }
  }

  public submit = () => {}

  // @ts-ignore
  render = () => {
    const { quiz, questionNumber } = this.props
    return (
      <div className="take-quiz-page">
        {quiz.questions === undefined && (
          <Spinner className="loading-indicator" name="ball-spin-fade-loader" />
        )}
        {quiz.questions !== undefined && (
          <div className="main">
            <header>
              <div className="meta">
                <p className="current">Question {questionNumber + 1}</p>
                {/* <p className="title">{quiz.title}</p> */}
                <p className="progress">
                  Question {questionNumber + 1}/{quiz.questions.length}
                </p>
              </div>
              <p className="question">{quiz.questions[questionNumber].title}</p>
            </header>
            {/* DISPLAYS THE CHOICES */}
            <main>
              <div className="choices">
                {quiz.questions[questionNumber].answers.map(answers => (
                  <div key={answers.answer.answer} className="choice">
                    <p
                      onClick={this.addAnswerToObject.bind(
                        this,
                        quiz.questions,
                        answers
                      )}
                    >
                      {answers.answer.answer}
                    </p>
                  </div>
                ))}
              </div>
              <div className="buttons">
                {questionNumber !== 0 && (
                  <button
                    onClick={this.previousQuizQuestion}
                    className="previous-button"
                  >
                    previous
                  </button>
                )}
                {questionNumber + 1 !== quiz.questions.length ? (
                  <button
                    onClick={this.nextQuizQuestion.bind(this, quiz.questions)}
                    className="next-button"
                  >
                    next
                  </button>
                ) : (
                  <button onClick={this.submit} className="submit-button">
                    Submit
                  </button>
                )}
              </div>
            </main>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  username: state.auth.username,
  // quiz: state.takeQuiz.quizAttemptInfoObj,
  quiz:
    state.takeQuiz.quizAttemptInfoObj !== null &&
    state.takeQuiz.quizAttemptInfoObj,
  answers: state.takeQuiz.answers,
  answerArray: state.takeQuiz.answerArray,
  questionNumber: state.takeQuiz.questionNumber,
  multipleSelectAnswer: state.takeQuiz.multipleSelectAnswer,
  multipleChoiceAnswer: state.takeQuiz.multipleChoiceAnswer
  // clickedQuestion: state.quizzes.clickedQuestion
})

export default connect(
  mapStateToProps,
  {
    startAddAnswerToArray,
    changeQuestionNumber,
    addMultipleChoiceAnswer,
    addMultipleSelectAnswer,
    updateMultipleSelectAnswer
  }
)(TakeQuizPage)
