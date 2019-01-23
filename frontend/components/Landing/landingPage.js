import React, { Component } from 'react'
import Login from './Login/Login.js'
import './landing.less'

export default class LandingPage extends Component {
    render() {
        return(
            <div className='mainDiv'>
                <div className='header'>
                    <h1 className='title'>Backpaca</h1>
                    <Login />
                </div>
                <div className='mainContent'>
                    Backpaca is an web application that allows users to brag about their travel experiences and plan future adventures with their friends.
                </div>
            </div>
        )
    }
}
