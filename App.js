import React, { Component } from 'react'
import { Text, View, StatusBar } from 'react-native'

export class App extends Component {
  render () {
    return (
      <>
        <StatusBar backgroundColor='white' barStyle='dark-content' />
        <View>
          <Text> Semua Screen ada di screen/ </Text>
        </View>
      </>
    )
  }
}

export default App
