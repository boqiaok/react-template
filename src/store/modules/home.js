import { observable } from 'mobx'

export default class Home {
  constructor(rootStore) {
    this.rootStore = rootStore
  }
  @observable home
}
