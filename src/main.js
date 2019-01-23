import React, { Component } from 'react'
import { Provider } from 'mobx-react'
import { hot } from 'react-hot-loader'
import SentryBoundary from '@/components/Sentry'
import configureStore from './store'
import Router from './router'

class App extends Component {
  render() {
    return (
      <SentryBoundary>
        <Provider store={configureStore()}>
          <Router />
        </Provider>
      </SentryBoundary>
    )
  }
}

export default hot(module)(App)
