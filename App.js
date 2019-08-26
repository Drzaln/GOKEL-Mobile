import React, { Component } from 'react'
import { Text, View, StatusBar } from 'react-native'
import Registration from './screen/Registration'

export class App extends Component {
  render () {
    return (
      <>
        <StatusBar backgroundColor='white' barStyle='dark-content' />
        <View>
          <Registration />
        </View>
      </>
    )
  }
}

export default App
