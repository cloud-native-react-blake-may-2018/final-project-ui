import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import api from '../path-list'
import { startGetSearchedQuiz } from '../actions/quizzes'

interface IState {
  results: any | string
}

interface IProps {
  query: string
  quizzes: any
  showSearch: boolean
  startGetSearchedQuiz: (quiz: any) => any
}

// const matchFound = term => x =>
//   x.word.toLowerCase().includes(term.toLowerCase()) || !term

export class SearchResults extends Component<IProps, IState> {
  state = {
    results: []
  }

  // @ts-ignore
  componentWillReceiveProps = async props => {
    const { query } = props

    if (query.length > 0) {
      let resultSet1 = await api.quizzes.searchByAuthor(query)
      let resultSet2 = await api.quizzes.searchByTag(query.toLowerCase())

      resultSet1 = resultSet1.filter(result => result !== null)
      resultSet2 = resultSet2.filter(
        // both must return true to stay in returned array
        // "if every uuid in resultSet1 does not match this result.uuid in resultSet2"
        result =>
          result !== null &&
          resultSet1.every(result1 => result1.uuid !== result.uuid)
      )

      // console.log('resultsSet1', resultSet1)
      // console.log('resultsSet2', resultSet2)

      const results = [...resultSet1, ...resultSet2]

      this.setState(prevState => ({ results }))

      // original
      // prevState ensures state updates each time
      // results.length > 0 && this.setState(prevState => ({ results }))

      // results.length === 0 &&
      //   this.setState(prevState => ({ results: ['none'] }))
      // console.log('results: ', results)
    }
  }

  fetchQuiz = e => {
    const { quizzes, startGetSearchedQuiz } = this.props
    const uuid = e.currentTarget.dataset.uuid
    const username = e.currentTarget.dataset.author
    const ownQuiz = quizzes.some(quiz => quiz.uuid === uuid)

    if (!ownQuiz) startGetSearchedQuiz({ uuid, username })
  }

  // @ts-ignore
  render = () => {
    const { showSearch } = this.props
    const { results } = this.state
    return (
      <div className={showSearch ? 'section focus' : 'section blur'}>
        <div className="search-results-bg" />
        <div className="search-results">
          <p className="header">Results</p>
          <div className="container">
            {results[0] === 'none' && (
              <p key={0} className="none-found">
                No results found.
              </p>
            )}
            {results.length > 0 &&
              results[0] !== 'none' &&
              results.map(quiz => (
                <Link
                  key={quiz.uuid + new Date()}
                  to={`/view-quiz/${quiz.uuid}`}
                  data-uuid={quiz.uuid}
                  data-author={quiz.author}
                  onClick={this.fetchQuiz}
                >
                  <div className="record">
                    <p className="title">{quiz.title}</p>
                    <p className="description">{quiz.description}</p>
                    <p className="author">{quiz.author}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  username: state.auth.username,
  quizzes: state.quizzes.all,
  searching: state.app.searching,
  results: state.app.results
})

export default connect(
  mapStateToProps,
  { startGetSearchedQuiz }
)(SearchResults)
