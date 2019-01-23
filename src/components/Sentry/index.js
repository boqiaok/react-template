import React, { Component } from 'react'
import * as Sentry from '@sentry/browser'

Sentry.init({
  // dsn:
  //   'http://444bfa831797453582c0a98fe0c94535:c447b81c57a84faa988287ef49ccc40d@sentry.hualala.com/14',
})

export default class SentryBoundary extends Component {
  state = { error: null }

  componentDidCatch(error, errorInfo) {
    this.setState({ error })
    Sentry.withScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key])
      })
      Sentry.captureException(error)
    })
  }

  render() {
    const { children } = this.props
    const { error } = this.state
    if (error) {
      // render fallback UI
      return <a onClick={() => Sentry.showReportDialog()}>Report feedback</a>
    }
    // when there's not an error, render children untouched
    return children
  }
}
