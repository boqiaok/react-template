import { observable } from 'mobx'
import Home from './modules/home'

class Store {
  constructor() {
    this.home = new Home(this)
  }

  @observable userinfo = {}
}

export default function configureStore() {
  const rootStore = new Store()
  return rootStore
}
