import React, { Component } from "react";
import moment from "moment";
import numeral from "numeral";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  startDeleteJunction,
  startDeleteQuestion,
  startEditQuestion
} from "../actions/questions";
import { startUpdateQuestionsDisplay } from "../actions/quizzes";

interface IProps {
  username: any;
  quiz: any;
  startEditQuestion: (any) => any;
  startDeleteQuestion: (author: string, title: string) => any;
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
    this.props.startDeleteQuestion(
      this.state.clickedQuestion.author,
      this.state.clickedQuestion.title
    );
    console.log(
      this.state.clickedQuestion.author,
      this.state.clickedQuestion.title
    );
    // this.props.startDeleteJunction(
    //   this.props.quiz.uuid,
    //   this.state.clickedQuestion.uuid
    // );
    //worked
    this.deletedTitle; //doesn't do much since it's not on the store. But If I knew how to reach the store I would just delete it from there!
  };

  public showQuizQuestion = (question: any, count: number, e: any) => {
    e.preventDefault();
    this.setState({
      ...this.state,
      questionNumber: count,
      clickedQuestion: question
    });
  };

  render() {
    const { quiz } = this.props;
    let count = 0;
    return (
      <div className="viewQuizzes-page">
        <h1>{quiz.title}</h1>

        {/* THERE IS STYLING BELOW THAT CAN BE TAKEN OUT, JUST THERE TO SHOW THAT QUESTIONS ARE IN THEIR OWN DIV
        SO THEY CAN BE PUT INTO SOME KIND OF SCROLLABLE OBJECT LIKE THE FIGMA */}
        {quiz.tags.map(tag => (
          <div style={tagStyle} key={tag.allLowerCase}>
            {tag.allLowerCase}
          </div>
        ))}

        {/* THERE IS STYLING BELOW THAT CAN BE TAKEN OUT, JUST THERE TO SHOW THAT QUESTIONS ARE IN THEIR OWN DIV
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
        {/* <button> */}
        <Link to={`/take-quiz/${quiz.uuid}`} className="unset-anchor nav-link">
          <div style={quizButton}>Take Quiz!</div>
        </Link>
        {/* </button> */}
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
        {this.state.clickedQuestion.uuid ? (
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
                      this.updateArr(e, index, "answer");
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
                      this.updateArr(e, index, "percentPoints");
                    }}
                  />
                  <label htmlFor="true-false-feed-back">feed Back</label>
                  <input
                    type="text"
                    id="true-false-feed-back"
                    value={ans.feedback}
                    onChange={(e: any) => {
                      this.updateArr(e, index, "feedback");
                    }}
                  />
                </div>
              ))}
            </form>
          </div>
        ) : // ? this.state.clickedQuestion.map(question => (

        //         // <div key={question.answer}>
        //         //   <p>{question.answer}</p>
        //         // </div>
        //       ))}
        //     </div>
        //   ))
        null}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  username: state.auth.username,
  quiz: state.quizzes.quizzes.find(
    quiz => quiz.uuid === props.match.params.uuid
  )
  // clickedQuestion: state.quizzes.clickedQuestion
});

export default connect(
  mapStateToProps,
  { startDeleteJunction, startDeleteQuestion, startEditQuestion }
)(EditQuizPage);
