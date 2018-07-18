import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Alert } from 'reactstrap';



export class AlertComponent extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <div>
        <Alert color="dark">
           Password updated
        </Alert>
      </div>
    );
  }
}