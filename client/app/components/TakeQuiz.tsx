import React, { Component } from 'react'
import moment from 'moment'
import numeral from 'numeral'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { startAddAnswerToArray } from '../actions/quizzes'
import Spinner from 'react-spinkit'

interface IProps {
  username: any
  quiz: any
  answerArray: object[]
  startAddAnswerToArray: (answers: {}) => any
}

const questionStyle = {
  cursor: 'poninter'
}

export class TakeQuizPage extends Component<IProps> {
  state = {
    clickedQuestion: [],
    questionNumber: 0,
    answerTrueFalseOrMultipleChoice: {
      author: '',
      title: '',
      answer: ''
    },
    answerMultipleSelect: {
      author: '',
      title: '',
      answer: []
    }
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
  public nextQuizQuestion = (choices: object) => {
    console.log(choices[this.state.questionNumber].format)
    if (
      choices[this.state.questionNumber].format === 'multiple-choice' ||
      choices[this.state.questionNumber].format === 'true-false'
    ) {
      this.props.startAddAnswerToArray(
        this.state.answerTrueFalseOrMultipleChoice
      )
      this.setState({
        ...this.state,
        questionNumber: (this.state.questionNumber += 1)
      })
    } else {
      this.props.startAddAnswerToArray(this.state.answerMultipleSelect)
      this.setState({
        ...this.state,
        questionNumber: (this.state.questionNumber += 1)
      })
    }
  }

  public addAnswerToObject = (choices: object, answer: any) => {
    // SPECIFIC ANSWER THAT USER HAS SELECTED
    console.log(answer.answer)
    // FORMAT OF THE QUESTION
    console.log(choices[this.state.questionNumber].title)
    console.log(choices[this.state.questionNumber].author)
    console.log(choices[this.state.questionNumber].format)
    // console.log(choices[this.state.questionNumber].answers)

    switch (choices[this.state.questionNumber].format) {
      case 'multiple-choice':
        this.setState({
          ...this.state,
          answerTrueFalseOrMultipleChoice: {
            author: choices[this.state.questionNumber].author,
            title: choices[this.state.questionNumber].title,
            answer: answer.answer
          }
        })
        console.log(this.state.answerTrueFalseOrMultipleChoice)
        break
      case 'multiple-select':
        if (this.state.answerMultipleSelect.answer.includes(answer.answer)) {
          const index = this.state.answerMultipleSelect.answer.indexOf(
            answer.answer
          )
          this.state.answerMultipleSelect.answer.splice(index, 1)
          this.setState({
            ...this.state,
            answerMultipleSelect: {
              author: choices[this.state.questionNumber].author,
              title: choices[this.state.questionNumber].title,
              answer: this.state.answerMultipleSelect.answer
            }
          })
        } else {
          this.setState({
            ...this.state,
            answerMultipleSelect: {
              author: choices[this.state.questionNumber].author,
              title: choices[this.state.questionNumber].title,
              answer: [...this.state.answerMultipleSelect.answer, answer.answer]
            }
          })
        }

        console.log(this.state.answerMultipleSelect)
        break

      case 'true-false':
        this.setState({
          ...this.state,
          answerTrueFalseOrMultipleChoice: {
            author: choices[this.state.questionNumber].author,
            title: choices[this.state.questionNumber].title,
            answer: answer.answer
          }
        })
        console.log(this.state.answerTrueFalseOrMultipleChoice)
        break
    }
  }

  public submit = () => {
    console.log(this.props.answerArray)
  }

  // @ts-ignore
  render = () => {
    const { quiz } = this.props
    const { questionNumber } = this.state
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
                <p className="title">{quiz.title}</p>
                <p className="progress">
                  Question {questionNumber + 1}/{quiz.questions.length}
                </p>
              </div>
              <p className="question">{quiz.questions[questionNumber].title}</p>
            </header>
            {/* DISPLAYS THE CHOICES */}
            <main>
              <div className="choices">
                {/* {console.log(quiz.questions)} */}
                {quiz.questions[questionNumber].answers.map(answers => (
                  <div key={answers.answer} className="choice">
                    <p
                      onClick={this.addAnswerToObject.bind(
                        this,
                        quiz.questions,
                        answers
                      )}
                    >
                      {answers.answer}
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
  quiz:
    state.quizzes.all !== undefined &&
    state.quizzes.all.find(quiz => quiz.uuid === props.match.params.uuid),
  answers: state.quizzes.answers
  // clickedQuestion: state.quizzes.clickedQuestion
})

export default connect(
  mapStateToProps,
  { startAddAnswerToArray }
)(TakeQuizPage)
