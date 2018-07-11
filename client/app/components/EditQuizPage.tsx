import React, { Component } from "react";
import moment from "moment";
import numeral from "numeral";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { startDeleteQuestion, startEditQuestion } from "../actions/questions";
import { editStoreQuiz, startUpdateQuestionsDisplay } from "../actions/quizzes";

interface IProps {
  username: any;
  quiz: any;
  quizzes: any[];
  editStoreQuiz: (any) => any;
  startEditQuestion: (any) => any;
  startDeleteQuestion: (author: string, title: any) => any;
  startDeleteJunction: (quizUUID: string, questionUUID: string) => any;
}
const tagStyle = {
  background: "green",
  borderRadius: 20,
  // margin: "20px",
  padding: "20px",
  width: "10%"
};
const questionsStyle = {
  background: "#86b2d8",
  borderRadius: 20,
  // margin: "20px",
  padding: "20px",
  width: "20%",
  cursor: "pointer"
};
const quizButton = {
  background: "#86b2d8",
  borderRadius: 20,
  // margin: "20px",
  padding: "20px",
  width: "5%"
};

export class EditQuizPage extends Component<IProps> {
  state = {
    clickedQuestion: {
      author: "",
      title: "",
      uuid: "",
      format: "",
      answers: [
        {
          answer: "",
          percentPoints: 0,
          feedback: ""
        }
      ]
    },
    questionNumber: 0,
    updatedQuestions: []
  };

  params = window.location.href.split("/");
  quizUUID = this.params[4];

  private updateArr = (e: any, arg1: number, arg2: string) => {
    let newAnswersArr = this.state.clickedQuestion.answers;
    newAnswersArr[arg1][arg2] = e.target.value;
    this.setState({
      currentQuestion: {
        ...this.state.clickedQuestion,
        answers: newAnswersArr
      }
    });
    console.log(this.state);
  };

  private updateQuiz = (e: any) => {
    for (let item of this.state.updatedQuestions)
      this.props.startEditQuestion(item);
  };

  private saveChangeToState = (e: any) => {
    let newQArr = this.state.updatedQuestions;
    newQArr.push(this.state.clickedQuestion);
    this.setState({
      ...this.state,
      updatedQuestions: newQArr
    });
    console.log(this.state.updatedQuestions);
  };

  private deletedTitle = (e: any) => {
    let title = this.state.clickedQuestion.title;
    title + "--This Question has been deleted";
    this.setState({
      clickedQuestion: {
        ...this.state.clickedQuestion,
        title: title
      }
    });
  };

  private deleteQuestion = (e: any) => {
    // Something that asks them if they really want to delete it
    this.updateStore();
    this.props.startDeleteQuestion(
      this.state.clickedQuestion.author,
      this.state.clickedQuestion.title
    );
    console.log(
      this.state.clickedQuestion.author,
      this.state.clickedQuestion.title
    )
  }

  private updateStore = () => {
    let modQuiz = this.props.quiz;
    for (let i = 0; i < modQuiz.questions.length; i++) {
      if ((modQuiz.questions[i].uuid = this.state.clickedQuestion.uuid)) {
        modQuiz.questions.splice(i, 1);
        //here is where we delete a question
      }
    }
    console.log("without deleted question: ", modQuiz);
    let quizList = this.props.quizzes;
    for (let i = 0; i < quizList.length; i++) {
      if ((quizList[i].uuid = this.props.quiz.uuid)) {
        quizList.splice(i, 1, modQuiz);
      }
    }
    console.log("Changed:", quizList);
    this.props.editStoreQuiz(quizList);
  };

  public showQuizQuestion = (question: any, count: number, e: any) => {
    e.preventDefault();
    this.setState({
      ...this.state,
      questionNumber: count,
      clickedQuestion: question
    });
  };

  // @ts-ignore
  render = () => {
    const { quiz } = this.props
    let count = 0
    return (
      <div className="edit-quiz-page">
        {/* {quiz.tags === undefined && (
          <Spinner className="loading-indicator" name="ball-spin-fade-loader" />
        )} */}
        {quiz.tags !== undefined && (
          <main>
            <h1>{quiz.title}</h1>
            {quiz.tags.map(tag => (
              <div style={tagStyle} key={tag.allLowerCase}>
                {tag.allLowerCase}
              </div>
            ))}
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
            >
              <div style={quizButton}>Take Quiz!</div>
            </Link>
            <button style={quizButton} onClick={this.deleteQuestion}>
              Delete this Question
            </button>
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

            {console.log(this.state.clickedQuestion)}
            {this.state.clickedQuestion.uuid && (
              <div key={this.state.clickedQuestion.uuid}>
                <h1>Question {this.state.questionNumber}</h1>
                <h3>{this.state.clickedQuestion.title}</h3>
                <form>
                  {this.state.clickedQuestion.answers.map((ans, index) => (
                    <div className="row" key={index}>
                      <label htmlFor="true-false-answer">Answer</label>
                      <input
                        type="text"
                        id="true-false-answer"
                        value={ans.answer}
                        onChange={(e: any) => {
                          this.updateArr(e, index, 'answer')
                        }}
                      />
                      <label htmlFor="true-false-percent-points">
                        Percent Points
                      </label>
                      <input
                        type="text"
                        id="true-false-percent-points"
                        value={ans.percentPoints}
                        onChange={(e: any) => {
                          this.updateArr(e, index, 'percentPoints')
                        }}
                      />
                      <label htmlFor="true-false-feed-back">feed Back</label>
                      <input
                        type="text"
                        id="true-false-feed-back"
                        value={ans.feedback}
                        onChange={(e: any) => {
                          this.updateArr(e, index, 'feedback')
                        }}
                      />
                    </div>
                  ))}
                </form>
              </div>
            )}
          </main>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  username: state.auth.username,
  quiz: state.quizzes.all.find(quiz => quiz.uuid === props.match.params.uuid),
  quizzes: state.quizzes.all
  // clickedQuestion: state.quizzes.clickedQuestion
});

export default connect(
  mapStateToProps,
  { editStoreQuiz, startDeleteQuestion, startEditQuestion }
)(EditQuizPage);
