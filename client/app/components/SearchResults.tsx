import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import api from '../path-list'

interface IState {
  results: any | string
}

interface IProps {
  query: string
  showSearch: boolean
}

const matchFound = term => x =>
  x.word.toLowerCase().includes(term.toLowerCase()) || !term

export class SearchResults extends Component<IProps, IState> {
  state = {
    results: []
  }

  // @ts-ignore
  componentWillReceiveProps = async props => {
    const { query } = props
    console.log('props', query)
    if (query.length > 0) {
      let resultSet1 = await api.quizzes.searchByAuthor(query)
      let resultSet2 = await api.quizzes.searchByTag(query)

      resultSet1 = resultSet1.filter(result => result !== null)
      resultSet2 = resultSet2.filter(result => result !== null)

      console.log('resultsSet2', resultSet2)

      const results = [...resultSet1, ...resultSet2]

      results.length > 0 && this.setState({ results })
      results.length === 0 && this.setState({ results: ['none'] })
      console.log('results: ', results)
    }
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
                <div key={quiz.uuid} className="record">
                  <p className="title">{quiz.title}</p>
                  <p className="description">{quiz.description}</p>
                  <p className="author">{quiz.author}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  username: state.auth.username,
  searching: state.app.searching,
  results: state.app.results
})

export default connect(
  mapStateToProps,
  null
)(SearchResults)
