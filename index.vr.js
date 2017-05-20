import React, {Component} from 'react'
import {Provider} from 'react-redux'
import Studio from './studio'
import createStore from './redux/index'
import {AppRegistry} from 'react-vr';

class App extends Component {
  render() {
    const store = createStore()

    return (
      <Provider store={store}>
        <Studio />
      </Provider>
    )
  }
}

export default App

AppRegistry.registerComponent('App', () => App);
