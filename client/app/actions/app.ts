import React from 'react'
import api from '../path-list'

// change settings
// change theme

export const sidebar = bool => dispatch =>
  dispatch({
    type: 'SIDEBAR',
    bool
  })

export const searching = () => dispatch =>
  dispatch({
    type: 'SEARCH'
  })

export const startSearch = query => async dispatch => {
  const quizzesByAuthors = await api.quizzes.searchByAuthor(query)
  const quizzesByTags = await api.quizzes.searchByTag(query)

  const quizResults = {
    ...quizzesByAuthors,
    ...quizzesByTags
  }

  console.log('results from db ', quizResults)
  return dispatch(search(quizResults))
}

export const search = query => ({
  type: 'QUERY',
  query
})
