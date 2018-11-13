import React, { Component } from 'react'
import { Provider } from 'mobx-react'
import { hot } from 'react-hot-loader'
import configureStore from './store'
import Router from './router'

class App extends Component {
  render() {
    return (
      <Provider store={configureStore()}>
        <Router />
      </Provider>
    )
  }
}

export default hot(module)(App)
