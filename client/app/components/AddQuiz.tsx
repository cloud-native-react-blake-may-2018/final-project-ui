import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import fontawesome from '@fortawesome/fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export class AddQuizComponent extends Component {
  render() {
    return (
      <div>
        <form>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" />
          <label htmlFor="title">Description</label>
          <input type="text" id="title" />
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  username: state.auth.username,
  email: state.auth.email,
  firstname: state.auth.firstname
})

export default connect(mapStateToProps)(AddQuizComponent)
