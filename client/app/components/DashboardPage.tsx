import React, { Component } from 'react'
import moment from 'moment'
import numeral from 'numeral'
import { Link } from 'react-router-dom'

export const DashboardPage = props => (
  <div className="dashboard-page">
    <h1>dashboard</h1>
    <Link to="/create-quiz" className="link">
      Create A Quiz
    </Link>
    <Link to="/view-quizzes" className="link">
      Take A Quiz
    </Link>
  </div>
)

export default DashboardPage
