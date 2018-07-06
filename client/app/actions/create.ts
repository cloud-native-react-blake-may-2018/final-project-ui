import React from 'react'
import api from '../path-list'

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
  type: 'CREATE_NEW_QUESTION',
  newQuestion
})

export const startCreateNewQuestion = newQuestion => dispatch => {
  api.create
    .addQuestion(newQuestion)
    .then(data => console.log(data)) // add uid to the lambda dispatch(createNewQuestion(data)))
    .catch(err => console.log(err))
}

export const createNewQuiz = quizID => ({
  type: 'CREATE_NEW_QUIZ',
  quizID
})

export const startCreateNewQuiz = newQuiz => dispatch =>
  new Promise(function(resolve, reject) {
    api.create
      .addQuiz(newQuiz)
      .then(data => {
        dispatch(createNewQuiz(data))
        console.log(data)
        resolve(data)
      })
      .catch(err => {
        reject(err)
      })
  })

// export const updateUser = user => ({
//   type: "UPDATE_USER",
//   user
// });

// export const startUpdateUser = user => dispatch => dispatch(updateUser(user));
