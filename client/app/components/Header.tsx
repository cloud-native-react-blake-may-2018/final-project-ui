import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CoinIcon from '../../public/icons/coin-icon.svg'

import SearchResults from './SearchResults'
import { sidebar, startSearch } from '../actions/app'
import { startLogout } from '../actions/auth'

interface RProps {
  isAuthenticated: Boolean
  username: string
  photo?: string
  points: number
}

interface RState {
  sidebar?: any
  startSearch?: (query: string) => any
  startLogout: () => void
}

type Props = RProps & RState

export class Header extends Component<Props> {
  state = {
    dropdownOpen: false,
    showSearch: false,
    term: '',
    query: ''
  }

  toggleDropdown = () =>
    this.setState({ dropdownOpen: !this.state.dropdownOpen })

  // @ts-ignore
  // needs to be attached to document for click detection
  componentDidMount = () =>
    document.addEventListener('click', this.determineClick, false)

  //@ts-ignore
  // needs to be attached to document for click detection
  componentWillUnmount = () =>
    document.removeEventListener('click', this.determineClick)

  determineClick = e => {
    // if click outside modal or not typing in input, hide search
    if (!e.target.closest('.section') && !e.target.dataset.search) {
      this.hideSearch()
    }

    // else if you click inside or type in input, ...
  }

  showSearch = () => this.setState({ showSearch: true })

  hideSearch = () => this.setState({ showSearch: false })

  onFieldChange = async e => {
    const {
      target: { value }
    } = e
    const { startSearch } = this.props
    this.setState({
      term: value,
      query: value
    } as any)
    // send term to database
    // await startSearch(query)
  }

  handleSubmit = e => {
    e.preventDefault()
    this.setState({
      query: this.state.term
    })
  }

  // @ts-ignore
  render = () => {
    const { isAuthenticated, username, photo, points, startLogout } = this.props
    const { showSearch, term, query } = this.state

    return (
      <header className="nav-header">
        <SearchResults query={query} showSearch={showSearch} />
        <Link to="/dashboard">
          <h2 className="home-button">Quizzard</h2>
        </Link>
        <div className="search-group">
          <FontAwesomeIcon icon="search" className="icon" />
          <form className="submit" onSubmit={this.handleSubmit}>
            <input
              type="text"
              className="input spawnSearch"
              placeholder="Search"
              data-search={true}
              onFocus={this.showSearch}
              onChange={this.onFieldChange}
              value={term}
            />
          </form>
        </div>

        {points !== undefined && (
          <div className="coin-group">
            <CoinIcon className="coin-icon" />
            <p className="coin-total">{points}</p>
          </div>
        )}

        <Dropdown
          isOpen={this.state.dropdownOpen}
          toggle={this.toggleDropdown}
          className="dropdown-root"
        >
          <DropdownToggle className="dropdown-toggle">
            <div
              className="image"
              style={{
                background: `url(${photo}) center / cover no-repeat`
              }}
            />
            <p className="nav-username">{username}</p>
            <FontAwesomeIcon icon="angle-down" className="icon fa-angle-down" />
          </DropdownToggle>
          <DropdownMenu
            right
            className="dropdown-menu"
            style={{
              display: this.state.dropdownOpen === false ? 'none' : 'block'
            }}
          >
            <DropdownItem className="dropdown-item">
              <Link to="/profile" className="profile">
                Profile
              </Link>
            </DropdownItem>
            <DropdownItem
              className="dropdown-item"
              onClick={() => startLogout()}
            >
              {isAuthenticated ? <p className="logout">Logout</p> : null}
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </header>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: !!state.auth.token,
  username: state.auth.username,
  points: state.app.points
  // photo: state.auth.profileImage
})

export default connect<RProps, RState>(
  mapStateToProps,
  { sidebar, startSearch, startLogout }
)(Header)
