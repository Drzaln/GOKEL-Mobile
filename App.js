import React from 'react'
import MainNavigation from './src/Navigation/MainNavigation'
import store from './src/Public/Redux/Store'
import {Provider} from 'react-redux'
import axios from 'axios'

export default class App extends React.Component {
  render() {
    axios.defaults.headers.common['authorization'] = 'gokel'
    return (
      <Provider store={store}>
        <MainNavigation />
      </Provider>
    )
  }
}
