import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import Home from '../Home'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route component={Home} />
      </BrowserRouter>
    )
  }
}

export default hot(module)(App)
