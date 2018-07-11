import React, { Component } from 'react'
import moment from 'moment'
import numeral from 'numeral'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Spinner from 'react-spinkit'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  startDeleteJunction,
  startDeleteQuestion,
  startEditQuestion
} from '../actions/questions'
import { editStoreQuiz, startUpdateQuestionsDisplay } from '../actions/quizzes'

interface IProps {
  username: any
  quiz: any
  quizzes: any[]
  editStoreQuiz: (any) => any
  startEditQuestion: (any) => any
  startDeleteQuestion: (author: string, title: any) => any
  startDeleteJunction: (quizUUID: string, questionUUID: string) => any
}

const quizButton = {
  background: '#86b2d8',
  borderRadius: 20,
  // margin: "20px",
  padding: '20px',
  width: '5%'
}

export class EditQuizPage extends Component<IProps> {
  state = {
    page: 1,
    clickedQuestion: {
      author: '',
      title: '',
      uuid: '',
      format: '',
      answers: [
        {
          answer: '',
          percentPoints: 0,
          feedback: ''
        }
      ]
    },
    questionNumber: 0,
    updatedQuestions: []
  }

  params = window.location.href.split('/')
  quizUUID = this.params[4]

  page1 = () => this.setState({ page: 1 })

  page2 = () => this.setState({ page: 2 })

  private updateArr = (e: any, arg1: number, arg2: string) => {
    let newAnswersArr = this.state.clickedQuestion.answers
    newAnswersArr[arg1][arg2] = e.target.value
    this.setState({
      currentQuestion: {
        ...this.state.clickedQuestion,
        answers: newAnswersArr
      }
    })
    console.log(this.state)
  }

  private updateQuiz = (e: any) => {
    for (let item of this.state.updatedQuestions)
      this.props.startEditQuestion(item)
  }

  private saveChangeToState = (e: any) => {
    let newQArr = this.state.updatedQuestions
    newQArr.push(this.state.clickedQuestion)
    this.setState({
      ...this.state,
      updatedQuestions: newQArr
    })
    console.log(this.state.updatedQuestions)
  }

  private deletedTitle = (e: any) => {
    let title = this.state.clickedQuestion.title
    title + '--This Question has been deleted'
    this.setState({
      clickedQuestion: {
        ...this.state.clickedQuestion,
        title: title
      }
    })
  }

  private deleteQuestion = (e: any) => {
    // Something that asks them if they really want to delete it
    this.updateStore()
    this.props.startDeleteQuestion(
      this.state.clickedQuestion.author,
      this.state.clickedQuestion.title
    )
    console.log(
      this.state.clickedQuestion.author,
      this.state.clickedQuestion.title
    )
  }

  private updateStore = () => {
    let modQuiz = this.props.quiz
    for (let i = 0; i < modQuiz.questions.length; i++) {
      if ((modQuiz.questions[i].uuid = this.state.clickedQuestion.uuid)) {
        modQuiz.questions.splice(i, 1)
        //here is where we delete a question
      }
    }
    console.log('without deleted question: ', modQuiz)
    let quizList = this.props.quizzes
    for (let i = 0; i < quizList.length; i++) {
      if ((quizList[i].uuid = this.props.quiz.uuid)) {
        quizList.splice(i, 1, modQuiz)
      }
    }
    console.log('Changed:', quizList)
    this.props.editStoreQuiz(quizList)
  }

  public showQuizQuestion = (question: any, count: number, e: any) => {
    e.preventDefault()
    this.setState({
      ...this.state,
      questionNumber: count,
      clickedQuestion: question
    })
  }

  // @ts-ignore
  render = () => {
    const { quiz } = this.props
    const { page, clickedQuestion, questionNumber } = this.state
    let count = 0
    return (
      <div className="edit-quiz-page">
        {quiz.tags === undefined && (
          <Spinner className="loading-indicator" name="ball-spin-fade-loader" />
        )}
        {quiz.tags !== undefined && (
          <main>
            <div className="quiz-container">
              <h1 className="title">{quiz.title}</h1>
              <div className="close">
                {/* <div className="close" onClick={this.onClose}> */}
                <FontAwesomeIcon icon="times" />
              </div>
              <div className="tags">
                {quiz.tags.length === 0 && <p className="tag">No tags</p>}
                {quiz.tags.length > 0 &&
                  quiz.tags.map(tag => (
                    <p key={tag.allLowerCase} className="tag">
                      {tag.allLowerCase}
                    </p>
                  ))}
              </div>
              <p className="add-tag">+ tag</p>
              <div className="questions">
                {quiz.questions.map(tag => (
                  <div key={tag.allLowerCase}>
                    <p
                      className="question"
                      onClick={this.showQuizQuestion.bind(
                        this,
                        quiz.questions[count],
                        count + 1
                      )}
                    >
                      Question {(count += 1)}
                    </p>
                  </div>
                ))}
                <p className="add-question">+ question</p>
              </div>

              <Link
                to={`/take-quiz/${quiz.uuid}`}
                className="unset-anchor nav-link"
              >
                <div style={quizButton}>Test Quiz</div>
              </Link>
              <button
                style={quizButton}
                onClick={this.saveChangeToState}
                className="btn btn-success"
              >
                Save Changes to Question
              </button>
              <button
                style={quizButton}
                onClick={this.updateQuiz}
                className="btn btn-success"
              >
                Save Changes to Quiz
              </button>
            </div>

            {/* {console.log(clickedQuestion)} */}
            {clickedQuestion.uuid && (
              <div key={clickedQuestion.uuid} className="question-container">
                <p className="title">Edit question</p>
                <div className="close" onClick={this.deleteQuestion}>
                  <FontAwesomeIcon icon="times" />
                </div>
                {page === 1 && (
                  <form>
                    <div className="group">
                      <label>Question {questionNumber}</label>
                      <input placeholder={clickedQuestion.title} />
                    </div>
                    <div className="group">
                      <label>Tags</label>
                      <input placeholder="Assign tags to this question" />
                    </div>
                    <div className="group">
                      <label>Type</label>
                      <input placeholder="Assign tags to this question" />
                    </div>
                    <div className="group">
                      <label>Image</label>
                      <input
                        type="file"
                        placeholder="Upload an image for this question"
                      />
                    </div>
                  </form>
                )}
                {page === 2 && (
                  <div>
                    <form>
                      <label>Question {questionNumber}</label>
                      <input placeholder={clickedQuestion.title} />
                    </form>
                    <form className="options">
                      {clickedQuestion.answers.map((ans, index) => (
                        <div key={ans.answer}>
                          <div className="group">
                            <label
                              htmlFor="true-false-answer"
                              className="label"
                            >
                              Choice
                            </label>
                            <textarea
                              id="true-false-answer"
                              value={ans.answer}
                              className="input"
                              onChange={(e: any) => {
                                this.updateArr(e, index, 'answer')
                              }}
                            />
                          </div>
                          <div className="group">
                            <label
                              htmlFor="true-false-percent-points"
                              className="input"
                            >
                              Percent Points
                            </label>
                            <textarea
                              id="true-false-percent-points"
                              value={ans.percentPoints}
                              onChange={(e: any) => {
                                this.updateArr(e, index, 'percentPoints')
                              }}
                            />
                          </div>
                          <div className="group">
                            <label htmlFor="true-false-feed-back">
                              Feedback
                            </label>
                            <textarea
                              id="true-false-feed-back"
                              value={ans.feedback}
                              className="input"
                              onChange={(e: any) => {
                                this.updateArr(e, index, 'feedback')
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </form>
                  </div>
                )}
                <div className="page-navigation">
                  <p className="page-1" onClick={this.page1}>
                    1
                  </p>
                  <p className="page-2" onClick={this.page2}>
                    2
                  </p>
                </div>
              </div>
            )}
          </main>
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
  quizzes: state.quizzes.all
  // clickedQuestion: state.quizzes.clickedQuestion
})

export default connect(
  mapStateToProps,
  { editStoreQuiz, startDeleteJunction, startDeleteQuestion, startEditQuestion }
)(EditQuizPage)
