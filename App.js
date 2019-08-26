import React, { Component } from 'react'
import {
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList
} from 'react-native'
import { FlatGrid } from 'react-native-super-grid'

export class App extends Component {
  render () {
    return (
      <>
        <StatusBar
          translucent
          backgroundColor='rgba(0, 0, 0, 0.05)'
          barStyle='dark-content'
        />
        <View>

        </View>
      </>
    )
  }
}

export default App

const styles = StyleSheet.create({
})
