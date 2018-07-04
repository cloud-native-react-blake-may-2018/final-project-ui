import React from "react";
import api from "../path-list";

// export const persist = identity => ({
//   type: "PERSIST",
//   identity
// });

// export const startPersist = identity => {
//   return dispatch => {
//     dispatch(persist(identity))

//     return api.user.persistUser(identity).then(data => {
//       const user = {
//         ...data,
//         token: identity.token
//       }
//       return dispatch(login(user))
//     })
//   }
// }

export const createNewQuestion = newQuestion => ({
  type: "CREATE_NEW_QUESTION",
  newQuestion
});

export const startCreateNewQuestion = newQuestion => dispatch => {
  dispatch(createNewQuestion(newQuestion));
};

export const createNewQuiz = newQuiz => ({
  type: "CREATE_NEW_QUIZ",
  newQuiz
});

export const startCreateNewQuiz = newQuiz => dispatch => {
  dispatch(createNewQuiz(newQuiz));
};

// export const updateUser = user => ({
//   type: "UPDATE_USER",
//   user
// });

// export const startUpdateUser = user => dispatch => dispatch(updateUser(user));
