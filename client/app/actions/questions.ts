import React from "react";
import pathlist from "../path-list";

// export const createNewQuestion = newQuestion => ({
//   type: 'CREATE_NEW_QUESTION',
//   newQuestion
// })

// export const startCreateNewQuestion = newQuestion =>
//   // dispatch(createNewQuestion(newQuestion))

// export const createNewQuiz = newQuiz => ({
//   type: 'CREATE_NEW_QUIZ',
//   newQuiz
// })

// export const startCreateNewQuiz = newQuiz => dispatch => {
//   dispatch(createNewQuiz(newQuiz))
// }

export const editQuestion = question => ({
  type: "EDIT_QUESTION",
  question
});

export const startEditQuestion = question => dispatch => {
  pathlist.questions
    .edit(question)
    .then(question => dispatch(editQuestion(question)));
};

export const deleteQuestion = question => ({
  type: "DELETE_QUESTION",
  question
});

export const startDeleteQuestion = (author, title) => dispatch => {
  pathlist.questions
    .deleteQuestion(author, title)
    .then(question => dispatch(deleteQuestion(question)));
};

// export const deleteJunction = question => ({
//   type: "DELETE_JUNCTION",
//   question
// });

// export const startDeleteJunction = (quizUUID, questionUUID) => dispatch => {
//   pathlist.questions
//     .deleteJunction(quizUUID, questionUUID)
//     .then(question => dispatch(deleteJunction(question)));
// };
