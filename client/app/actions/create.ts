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
  api.create
    .addQuestion(newQuestion)
    .then(data => console.log(data)) // add uid to the lambda dispatch(createNewQuestion(data)))
    .catch(err => console.log(err));
};

export const createNewQuiz = quizID => ({
  type: "CREATE_NEW_QUIZ",
  quizID
});

export const startCreateNewQuiz = newQuiz => dispatch =>
  new Promise(function(resolve, reject) {
    api.create
      .addQuiz(newQuiz)
      .then(data => {
        dispatch(createNewQuiz(data));
        console.log(data);
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });

export const batchCreateQuestions = questions => ({
  type: "BATCH_CREATE_QUESTIONS",
  questions
});

export const startBatchCreateQuestions = incoming => async dispatch => {
  const data = await api.create.batchAddQuestion(incoming.newQuestions);

  const arrOfUuids = data.map(question => question.uuid);
  const shouldBeStoredInJunctionTable = await api.create.addJunction(
    incoming.quizID,
    arrOfUuids
  );

  return;
  // return dispatch(batchCreateQuestions(data));
};
// new Promise(function(resolve, reject) {
//   api.create
//     .batchAddQuestion(newQuestions)
//     .then(data => {
//       dispatch(batchCreateQuestions(data));
//       console.log(data);
//       setTimeout(() => resolve(data), 3000);
//     })
//     .catch(err => {
//       reject(err);
//     });
// });
// original action
// export const startBatchCreateQuestions = newQuestions => dispatch =>
//   new Promise(function(resolve, reject) {
//     api.create
//       .batchAddQuestion(newQuestions)
//       .then(data => {
//         dispatch(batchCreateQuestions(data));
//         console.log(data);
//         setTimeout(() => resolve(data), 3000);
//       })
//       .catch(err => {
//         reject(err);
//       });
//   });

// export const addJunctionItem = (quizID, questionIDs) => ({
//   type: "ADD_JUNCTION",
//   quizID,
//   questionIDs
// });

// export const startaddJunctionItem = (quizID, questionIDs) => dispatch =>
//   new Promise(function(resolve, reject) {
//     api.create
//       .addJunction(quizID, questionIDs)
//       .then(data => {
//         dispatch(addJunctionItem(quizID, questionIDs));
//         resolve(data);
//       })
//       .catch(err => {
//         reject(err);
//       });
//   });
