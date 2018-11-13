import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Loadable from 'react-loadable'

import Loading from 'Views/Loading'

const HomeAsync = Loadable({
  loader: () => import('Views/Home'),
  loading() {
    return <Loading />
  },
})

const AboutAsync = Loadable({
  loader: () => import('Views/About'),
  loading() {
    return <Loading />
  },
})

const router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={HomeAsync} />
      <Route path="/about" component={AboutAsync} />
    </Switch>
  </BrowserRouter>
)

export default router
