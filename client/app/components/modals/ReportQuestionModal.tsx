import React, { Component } from 'react'
import { connect } from 'react-redux'
import { RouteProps, withRouter } from 'react-router'
import Modal from '../Modal'
import { hideModal } from '../../actions/modal'
import { FontAwesomeIcon } from '../../../../node_modules/@fortawesome/react-fontawesome'

interface IProps {
  hideModal: () => any
}

export class ReportQuestionModal extends Component<IProps> {
  onClose = () => this.props.hideModal()

  //@ts-ignore
  render = () => {
    return (
      <Modal onClose={this.onClose}>
        <div className="report-question-modal">
          <div className="close" onClick={this.onClose}>
            <FontAwesomeIcon icon="times" />
          </div>
          <p className="title">What is wrong with this question?</p>
          <form>
            <label className="container">
              <input type="radio" name="radio" />
              <p className="reason">Incorrect</p>
              <span className="checkmark" />
            </label>

            <label className="container">
              <input type="radio" name="radio" />
              <p className="reason">Badly worded</p>
              <span className="checkmark" />
            </label>

            <label className="container">
              <input type="radio" name="radio" />
              <p className="reason">No valid answer</p>
              <span className="checkmark" />
            </label>

            <label className="container">
              <input type="radio" name="radio" />
              <p className="reason">Other</p>
              <span className="checkmark" />
            </label>
          </form>

          <div className="button-group">
            <button onClick={this.onClose} className="cancel">
              Cancel
            </button>
            <button className="submit">Report</button>
          </div>
        </div>
      </Modal>
    )
  }
}

const mapStateToProps = state => ({
  username: state.auth.username
})

export default connect(
  mapStateToProps,
  { hideModal }
)(ReportQuestionModal)

// export default withRouter(
//   connect(
//     mapStateToProps,
//     { hideModal }
//   )(ReportQuestionModal)
// )
