import React, { Component, Fragment } from 'react';
import Router from 'next/router';
import axios from 'axios';

// axios.defaults.withCredentials = true;

const URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:4000'
    : 'https://backpaca-yoga.herokuapp.com';

export default class extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: false
    }
  }

  componentDidMount() {
    axios.get(`${URL}/api/current_user`)
      .then(res => {
        if (res.data.id) {
          Router.push('/test2');
        }
      })
      .catch(err => console.log(err))

    // if (res.data.id !== undefined) {
    //   this.setState({
    //     isLoggedIn: true,
    //   });
    //   Router.push('/travels')
    // }
  }

  render(){
    if (!this.state.isLoggedIn) {
      return (<div>Loggin you in....</div>)
    }

  }

}
