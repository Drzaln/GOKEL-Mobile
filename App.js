import React from 'react'
import MainNavigation from './src/Navigation/MainNavigation'
import store from './src/Public/Redux/Store'
import { Provider } from 'react-redux'
import axios from 'axios'
import OneSignal from 'react-native-onesignal'

export default class App extends React.Component {
  constructor (properties) {
    super(properties)
    OneSignal.init('97d05ad5-a2ee-4b2a-a4b0-d15e66a97979')

    OneSignal.addEventListener('received', this.onReceived)
    OneSignal.addEventListener('opened', this.onOpened)
    OneSignal.addEventListener('ids', this.onIds)
    OneSignal.configure() // triggers the ids event
    OneSignal.enableSound(true)
    OneSignal.inFocusDisplaying(2)
    OneSignal.enableVibrate(true)
  }

  componentWillUnmount () {
    OneSignal.removeEventListener('received', this.onReceived)
    OneSignal.removeEventListener('opened', this.onOpened)
    OneSignal.removeEventListener('ids', this.onIds)
  }

  onReceived (notification) {
    console.log('Notification received: ', notification)
  }

  onOpened (openResult) {
    console.log('Message: ', openResult.notification.payload.body)
    console.log('Data: ', openResult.notification.payload.additionalData)
    console.log('isActive: ', openResult.notification.isAppInFocus)
    console.log('openResult: ', openResult)
  }

  onIds (device) {
    console.log('Device info: ', device)
  }

  render () {
    axios.defaults.headers.common['authorization'] = 'gokel'
    return (
      <Provider store={store}>
        <MainNavigation />
      </Provider>
    )
  }
}
