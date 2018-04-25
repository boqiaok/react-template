import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { hot } from 'react-hot-loader'
import configureStore from '../../store'
import Home from '../Home'
import './index.scss'

class App extends Component {
  render() {
    return (
      <Provider store={configureStore()}>
        <BrowserRouter>
          <Route component={Home} />
        </BrowserRouter>
      </Provider>
    )
  }
}

export default hot(module)(App)
