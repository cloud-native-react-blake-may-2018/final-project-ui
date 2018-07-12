import React, { Component } from 'react'
import { connect } from 'react-redux'
import Dropzone from 'react-dropzone'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as awsCognito from 'amazon-cognito-identity-js';
import Axios from '../../../node_modules/axios';
import { text } from '../../../node_modules/@fortawesome/fontawesome-svg-core';

interface IProps {
  bio
  name
  email
  username
  profileImage
}

const data = {
  UserPoolId: 'us-east-2_fMMquWRem',
  ClientId: '1q83lmu6khfnc0v8jjdrde9291'
}
const userPool = new awsCognito.CognitoUserPool(data);
const userData = {
  Username: JSON.parse(localStorage.getItem('userInfoToken')).username,
  Pool: userPool
}
const cognitoUser = new awsCognito.CognitoUser(userData);
console.log(cognitoUser);


export class ProfilePage extends React.Component<IProps> {
  state = {
    editing: false,
    url: ''
  }

  constructor(props: any) {
    super(props);
    // Retreive token for reading attributes
    this.setState({
      token: localStorage.getItem('userInfoToken')
    })
  }

  public componentDidMount() {
    // Don't forget to update endpoint
    Axios.get('endpoint coming soon')
      .then(resp => {
        this.setState({
          url: resp.data
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  public updateName = () => {
    console.log("updating the name");
    let nameField = document.getElementById("name");
    nameField.remove();
    const form = document.createElement('form');
    form.setAttribute('onsubmit','submitName');
    const updateField = document.createElement('input');
    updateField.setAttribute('type', 'text');
    updateField.setAttribute('className', 'name');
    updateField.setAttribute('id', 'updateNameField');
    updateField.addEventListener("keydown", this.submitName.bind(this));
    form.appendChild(updateField);
    const nameInsertionPoint = document.getElementsByClassName('name-container');
    nameInsertionPoint[0].appendChild(updateField);
  }

  public submitName = (e) => {
    console.log("submit name");
    console.log(e.keyCode);
    if (e.keyCode === 13) {
      let updateField = document.getElementById('updateNameField');
      const name = updateField.innerHTML;
      /** Edit and push userInfoToken here */
      const token = JSON.parse(localStorage.getItem('userInfoToken'));
      
      Axios.patch('endpoint in progress', {
        'headers': {
          // Potentially just a CORS access
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        'email': token.email,
        'name': token.name,
        'username': token.username
      })
        .then(resp => {
          const stringResp = JSON.stringify(resp.data);
          localStorage.setItem('userInfoToken', stringResp);
        })
        .catch(err => {
          console.log(err.stack);
        })

      /** Updated */
      let nameField = document.createElement('p');
      nameField.innerHTML = name;
      nameField.setAttribute('className','name');
      nameField.setAttribute('id','name');
      const nameInsertionPoint = document.getElementsByClassName('name-container');
      nameInsertionPoint[0].appendChild(nameField);
      const nameEditIcon = document.getElementById('nameEdit');
      nameEditIcon.remove();
      nameInsertionPoint[0].appendChild(nameEditIcon);
    }
  }

  public onDrop = (files: any) => {
    const file = files[0];
    console.log(file);
    Axios.get('endpoint coming soon' + file.name)
      .then(resp => {
        Axios.put(resp.data, file)
          .then(uploadResp => {
            alert(uploadResp.status);
          })
          .catch(err => {
            console.log(err);
          })
      })
      .catch(err => {
        console.log(err);
      })
  }

  // @ts-ignore
  render = () => {
    const { name, bio } = this.props
    const { editing } = this.state

    return (
      <div className="profile-page">
        <div className="main">
          <section className="profile-top">
            <Dropzone className="dropzone" onDrop={this.onDrop}>
              <div className="image">
                <p className="text">Image here</p>
              </div>
            </Dropzone>
            <div className="bio">
              <div className="name-container">
                <p className = "name" id="name">{name}</p>
                {/* <input type="text" className = "name" id="name" placeholder={name}/> */}
                <div onClick={this.updateName} id="nameEdit">
                  <FontAwesomeIcon icon="pencil-alt" className="name-edit" />
                </div>
              </div>
              <div className="about-container">
                <p className="about">Javascript developer</p>
                <FontAwesomeIcon icon="pencil-alt" className="about-edit" />
              </div>
              {/* <p className="about">{bio}</p> */}
            </div>
          </section>
          <section className="profile-bottom">
            <p className="info">Profile data</p>
          </section>
        </div>

        {/* <div className="profile-pic-div">
            <div
              className="profile-image"
              style={{
                background: `url(${this.props.profileImage})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: '50% 50%',
                width: 300,
                height: 300
              }}
            />
          </div>*/}
      </div>
    )
  }
}


const mapStateToProps = state => ({
  bio: state.auth.bio,
  name: state.auth.name,
  email: state.auth.email,
  username: state.auth.username,
  profileImage: state.auth.profileImage
})

export default connect(mapStateToProps)(ProfilePage)
