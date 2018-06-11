import React, { Component } from 'react'
import App from '../components/home'
import {
  BrowserRouter,
} from 'react-router-dom'

export default class Router extends Component {
  render () {
    return (
      <BrowserRouter>
        <App name="js-transmission-doc"
             author="Ed Me"
             GitHub="https://github.com/noteScript/js-transmission.git"/>
      </BrowserRouter>
    )
  }
}
