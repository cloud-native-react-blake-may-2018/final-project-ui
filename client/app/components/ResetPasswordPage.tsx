import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as awsCognito from 'amazon-cognito-identity-js'

interface IState {
  newPassword: string,
  oldPassword: string
}

export class ResetPasswordPage extends Component<null, IState> {
  state = {
    newPassword: '',
    oldPassword: '',
  }

  handleChange = e => {
    // const {newPassword} = this.state
    this.setState({
      newPassword: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    console.log(
      'stopping submission. When code is done, will submit new password: ',
      this.state.newPassword
    )
  }

// public getUser = () => {
//     let data = {
//       UserPoolId : 'us-east-2_fMMquWRem', // Your user pool id here
//       ClientId : '1q83lmu6khfnc0v8jjdrde9291' // Your client id here
//     };
//   let userPool = new awsCognito.CognitoUserPool(data);
//   let cognitoUser = userPool.getCurrentUser();
//   console.log(cognitoUser)
//   return cognitoUser;
// }

public changePassword = (e:any) => {
    e.preventDefault()

    let data = {
      UserPoolId : 'us-east-2_fMMquWRem', // Your user pool id here
      ClientId : '1q83lmu6khfnc0v8jjdrde9291' // Your client id here
    };
    let userPool = new awsCognito.CognitoUserPool(data);
    let cognitoUser = userPool.getCurrentUser();
    console.log(cognitoUser)

    // console.log(this.getUser())
    cognitoUser.getSession((err, session) => {
      if (err) {
        console.log('error getting session: ', err)
      }
        
      cognitoUser.changePassword(this.state.oldPassword, this.state.newPassword, function(err, result) {
        if (err) {
            console.log('error changing password: ', err)            
            return;
        }
        console.log('call result: ' + result);
    });     

    })
}

onFieldChange = ({ target }) => {
  const { name, value } : { name: keyof IState; value: string } = target
  this.setState({
    [name]: value
  } as any)
}

  // @ts-ignore
  public render = () => {
    return (
      <div>
        <Link to="/login">Logo</Link>
        <br />
        <form onSubmit={this.changePassword}
              onChange={this.onFieldChange}
              >
          <label htmlFor="password">Enter a old password</label>
          <input type="text" name="oldPassword" value={this.state.oldPassword}/>
          <label htmlFor="password">Enter a new password</label>
          <input type="text" name="newPassword" value={this.state.newPassword} />
          <button type="submit">Submit</button>
        </form>
        {/* <Link to="/login">login</Link> */}
      </div>
    )
  }
}

export default ResetPasswordPage