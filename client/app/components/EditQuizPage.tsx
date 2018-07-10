import React, { Component } from 'react'
import moment from 'moment'
import numeral from 'numeral'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Spinner from 'react-spinkit'
import { startUpdateQuestionsDisplay } from '../actions/quizzes'

interface IProps {
  username: any
  quiz: any
}
const tagStyle = {
  background: 'green',
  borderRadius: 20,
  // margin: "20px",
  padding: '20px',
  width: '10%'
}
const questionsStyle = {
  background: '#86b2d8',
  borderRadius: 20,
  // margin: "20px",
  padding: '20px',
  width: '20%',
  cursor: 'pointer'
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

  // @ts-ignore
  render = () => {
    const { quiz } = this.props
    let count = 0
    return (
      <div className="viewQuizzes-page">
        {quiz.tags === undefined && (
          <Spinner className="loading-indicator" name="ball-spin-fade-loader" />
        )}
        {quiz.tags !== undefined && (
          <main>
            <h1>{quiz.title}</h1>

            {/* THERE IS STYLING BELOW THAT CAN BE TAKEN OUT, JUST THERE TO SHOW THAT QUESTIONS ARE IN THERE OWN DIV
        SO THEY CAN BE PUT INTO SOME KIND OF SCROLLABLE OBJECT LIKE THE FIGMA */}
            {quiz.tags.map(tag => (
              <div style={tagStyle} key={tag.allLowerCase}>
                {tag.allLowerCase}
              </div>
            ))}

            {/* THERE IS STYLING BELOW THAT CAN BE TAKEN OUT, JUST THERE TO SHOW THAT QUESTIONS ARE IN THERE OWN DIV
        SO THEY CAN BE PUT INTO SOME KIND OF SCROLLABLE OBJECT LIKE THE FIGMA */}
            <div style={questionsStyle}>
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
            <Link
              to={`/take-quiz/${quiz.uuid}`}
              className="unset-anchor nav-link"
            />

            {console.log(this.state.clickedQuestion)}
            {this.state.clickedQuestion !== undefined &&
              this.state.clickedQuestion.map(question => (
                <div key={question.uuid}>
                  <h1>Question {this.state.questionNumber}</h1>
                  <h3>{question.title}</h3>
                  {this.state.clickedQuestion[0].answers.map(question => (
                    <div key={question.answer}>
                      <p>{question.answer}</p>
                    </div>
                  ))}
                </div>
              ))}
          </main>
        )}
      </div>
    )
  }
}

// flag 2: quizzes.quizzes -> quizzes.all
const mapStateToProps = (state, props) => ({
  username: state.auth.username,
  quiz:
    state.quizzes.all !== undefined &&
    state.quizzes.all.find(quiz => quiz.uuid === props.match.params.uuid)
  // clickedQuestion: state.quizzes.clickedQuestion
})

export default connect(mapStateToProps)(EditQuizPage)
