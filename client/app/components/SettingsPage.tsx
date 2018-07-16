import React, { Component } from 'react'
import { connect } from 'react-redux'
import Dropzone from 'react-dropzone'
import axios from 'axios'
import * as awsCognito from 'amazon-cognito-identity-js'
import * as AWS from 'aws-sdk'
import { Modal } from './Modal'
import { startUpdateEmail, startUpdateName } from '../actions/auth'
import Axios from '../../../node_modules/axios'
// import { startUpdateUser } from '../actions/auth'
interface ClassProps {
  email: string
  username: string
  photo: string
  name: string
  file: string
  startUpdateUser?: (any) => any
  startUpdateName?: (name: string) => void
  startUpdateEmail?: (email: string) => void
}

if (localStorage.getItem('refresh_token') !== 'undefined') {
  const data = {
    UserPoolId: 'us-east-2_fMMquWRem',
    ClientId: '1q83lmu6khfnc0v8jjdrde9291'
  }

  const token = JSON.parse(localStorage.getItem('userInfoToken'))
  const userPool = new awsCognito.CognitoUserPool(data)
  const userData = {
    Username: token !== null && token.username,
    Pool: userPool
  }

  var cognitoUser = new awsCognito.CognitoUser(userData)
  // const cognitoUser = userPool.getCurrentUser();
  console.log(cognitoUser)

  if (cognitoUser !== null) {
    const token1 = localStorage.getItem('id_token')
    const idToken = new awsCognito.CognitoIdToken({
      IdToken: token1 !== null && token1
    })
    const token2 = localStorage.getItem('access_token')
    const accessToken = new awsCognito.CognitoAccessToken({
      AccessToken: token2 !== null && token2
    })
    const token3 = localStorage.getItem('refresh_token')
    const refreshToken = new awsCognito.CognitoRefreshToken({
      RefreshToken: token3 !== null && token3
    })

    let tokenData = {
      IdToken: idToken,
      AccessToken: accessToken,
      RefreshToken: refreshToken
    }

    // console.log(tokenData);
    let session = new awsCognito.CognitoUserSession(tokenData)
    // console.log(session)
    cognitoUser.setSignInUserSession(session)

    cognitoUser.getSession((err, session) => {
      if (err) {
          console.log(err);
          return;
      } else
      console.log('session validity: ' + session.isValid());
        
      var attributeList = [];
      cognitoUser.getUserAttributes((err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        for (let i=0; i < result.length; i++) {
          attributeList.push({Name: result[i].getName(), Value: result[i].getValue()});
        }
      })
      console.log(attributeList)
    })
  }
}

export class SettingsPage extends Component<ClassProps> {
  constructor(props) {
    super(props)
  }
  state = {
    page: 'General',
    name: this.props.name,
    email: this.props.email,
    url: '',
    file: ''
  }
  // declare ref
  private photoUpload: HTMLInputElement
  private isAuthenticated: boolean = false

  setPage = e => {
    console.log('target: ', e.target.textContent)
    this.setState({ page: e.target.textContent })
  }

  // updateProfile = e => {
  //   let password: string = '';
  //   if (!this.isAuthenticated) {
  //     return (
  //       <Modal onClose={this.onClose}>
  //         <div className="report-question-modal">
  //           <div className="close">
  //             <FontAwesomeIcon icon="times" />
  //           </div>
  //           <p className="title">Enter your password</p>
  //           <form>
  //             <label className="container">
  //               <input type="password" id="password" />
  //               <p className="confirm">Password</p>
  //               <span className="checkmark" />
  //             </label>
  //           </form>
  //           <div className="button-group">
  //             <button onClick={this.onClose} type="button" className="cancel">
  //               Cancel
  //             </button>
  //             <button type="submit" onSubmit={this.authenticate} className="submit">Report</button>
  //           </div>
  //         </div>
  //       </Modal>
  //     )
  //   }
  // }

  onFieldChange = e => {
    e.props = ({
      [e.target.name]: e.target.value
    })
    // this.updateName(e)
    // console.log(this.state)
  }
  fileSelectedHandler = e => this.setState({ selectedFile: e.target.files[0] })
  generalUploadHandler = async e => {
    e.preventDefault()
    const { file, url, name, email } = this.state
    const { username, startUpdateUser } = this.props
    const fullname = name.split(' ')
    const data = {
      username,
      firstname: fullname[0],
      lastname: fullname[1],
      email,
      url
    }
    try {
      // send file to s3 bucket
      const s3upload = await axios.put(url, file)
    } catch (e) {
      console.log('error uploading to s3', e)
    }
    try {
      const dynamoUpload = await axios
        .post(
          'https://njn4fv1tr6.execute-api.us-east-2.amazonaws.com/prod/update-user',
          data
        )
        .then(res => res.data)
      startUpdateUser(data)
    } catch (e) {
      console.log('error uploading to lambda', e)
    }
  }
  onDrop = (files: any) => {
    // get most recent file
    const file = files[0]
    // build url to s3 bucket
    const profileUrl =
      'http://vocab-app-pics.s3.amazonaws.com/' +
      this.props.username +
      '/' +
      file.name
    this.setState({
      file,
      url: profileUrl
    })
  }

  updateProfile = e => {
    e.preventDefault()
    console.log(e.target.namefield.value);
    const formObj = {
      Name: 'name',
      Value: e.target.namefield.value
    }
    if(cognitoUser !== null) {
      cognitoUser.updateAttributes([formObj], (err, result) => {
        if (err) {
          alert(err);
          return;
        }
        console.log('call result: ' + result);
      })
    }
    // const fullName = document.getElementById('fullname').value;
    // const email = document.getElementById('email').value;
    // console.log(`Name: ${fullName}\nEmail: ${email}`);
  }

  /*updateName = (e: any) => {
    const nameField = e.target.name
    const name = nameField.value
    // this.props.startUpdateName(name)
    this.setState({
      name: name
    })
    // ({
    //   [e.target.name]: e.target.value
    // })
  }*/

  // @ts-ignore
  render = () => {
    const { username, email, photo } = this.props
    let { page, name } = this.state
    page = page.toLowerCase()
    return (
      <div className="settings-page">
        <div className="main">
          <aside>
            <p
              className={page === 'general' ? 'active' : null}
              onClick={this.setPage}
            >
              General
            </p>
            <p
              className={page === 'password' ? 'active' : null}
              onClick={this.setPage}
            >
              Password
            </p>
            <p
              className={page === 'transfers' ? 'active' : null}
              onClick={this.setPage}
            >
              Themes
            </p>
          </aside>
          {this.state.page.toLowerCase() == 'general' && (
            <main>
              <div className="input-group">
                <label htmlFor="photo">Photo</label>
                <div
                  className="photo-container"
                  onClick={() => this.photoUpload.click()}
                >
                  <Dropzone onDrop={this.onDrop} className="dropzone" />
                  {/* <div
                    className="photo"
                    style={{
                      background: `url(${photo}) center / cover no-repeat`
                    }}
                  /> */}
                </div>
                <input
                  className="file-upload"
                  style={{ display: 'none' }}
                  name="file"
                  type="file"
                  onChange={this.fileSelectedHandler}
                  ref={photoUpload => (this.photoUpload = photoUpload)}
                  data-cloudinary-field="image_id" // ?
                />
              </div>
              <form
                className="settings-form"
                onChange={this.onFieldChange}
                onSubmit={this.updateProfile}
              >
                <div className="input-group">
                  <label htmlFor="fullname">Full Name</label>
                  <input
                    type="text"
                    name="fullname"
                    placeholder={name}
                    id="namefield"
                    // onChange={(e: any) => {
                    //   this.updateName(e)
                    // }}
                    // value={this.state.name}
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder={email}
                    readOnly
                    value={this.state.email}
                  />
                </div>
                <div className="input-group">
                  <button
                    className="save-button"
                    type="submit"
                    onSubmit={this.updateProfile}
                  >
                    Save changes
                  </button>
                </div>
              </form>
            </main>
          )}
          {this.state.page.toLowerCase() == 'password' && (
            <main>
              <form className="settings-form" onChange={this.onFieldChange}>
                <div className="input-group">
                  <label htmlFor="old">Old Password</label>
                  <input type="text" name="old" />
                </div>
                <div className="input-group">
                  <label htmlFor="new">New Password</label>
                  <input type="text" name="new" />
                </div>
                <div className="input-group">
                  <label htmlFor="retype">Retype Password</label>
                  <input type="text" name="retype" />
                </div>
                <div className="input-group">
                  <button className="save-button" type="submit">
                    Save changes
                  </button>
                </div>
              </form>
            </main>
          )}
          {this.state.page.toLowerCase() == 'themes' && (
            <main>
              <form className="settings-form" onChange={this.onFieldChange}>
                <div className="input-group">
                  <label htmlFor="interest">Theme</label>
                  <input
                    type="text"
                    name="interest"
                    placeholder="Coming soon!"
                  />
                </div>
                <div className="input-group">
                  <button className="save-button" type="submit">
                    Save changes
                  </button>
                </div>
              </form>
            </main>
          )}
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  name: state.auth.name,
  username: state.auth.username,
  email: state.auth.email,
  photo: state.auth.profileImage
})
export default connect(
  mapStateToProps,
  { startUpdateName, startUpdateEmail }
)(SettingsPage)
