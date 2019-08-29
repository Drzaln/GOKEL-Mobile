import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  AsyncStorage,
  Image,
  TouchableOpacity,
  FlatList
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import firebase from 'react-native-firebase'
import {
  GiftedChat,
  InputToolbar,
  Send,
  Bubble,
  Time
} from 'react-native-gifted-chat'

export class Chat extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: 'Siomay Kang Ucay',
      uid: 1,
      myuid: 2,
      role: '',
      myname: 'Jakun',
      avatar: '',
      image: 'blabla',
      textMessage: '',
      messageList: [],
      myUsername: '',
      username: this.props.navigation.getParam('username')
    }
    AsyncStorage.getItem('Role', (error, result) => {
      this.setState({
        role: result
      })
    })
    AsyncStorage.getItem('Username', (error, result) => {
      this.setState({
        myUsername: result
      })
    })
  }

  db = firebase.database()

  async componentDidMount () {
    await this.db
      .ref('messages')
      .child(this.state.myUsername)
      .child(this.state.username)
      .on('child_added', value => {
        this.setState(previousState => {
          return {
            messageList: GiftedChat.append(
              previousState.messageList,
              value.val()
            )
          }
        })
      })
  }

  sendMessage = async () => {
    if (this.state.textMessage.length > 0) {
      let msgId = this.db
        .ref('messages')
        .child(this.state.myUsername)
        .child(this.state.username)
        .push().key
      let updates = {}
      let message = {
        _id: msgId,
        text: this.state.textMessage,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        user: {
          _id: this.state.myUsername,
          name: this.state.myUsername,
          avatar: this.state.avatar
        }
      }
      updates[
        'messages/' +
          this.state.myUsername +
          '/' +
          this.state.username +
          '/' +
          msgId
      ] = message
      updates[
        'messages/' +
          this.state.username +
          '/' +
          this.state.myUsername +
          '/' +
          msgId
      ] = message
      this.db.ref().update(updates)
      this.setState({ textMessage: '' })
    }
  }

  inputToolbar = props => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          borderWidth: 2,
          borderColor: '#00ADB5',
          borderRadius: 16,
          marginHorizontal: 16
        }}
      />
    )
  }

  sendButton = props => {
    return (
      <Send
        {...props}
        containerStyle={{
          borderRadius: 16,
          borderColor: '#fff',
          borderWidth: 0,
          margin: 4
        }}
      >
        <Icon size={40} name={'md-send'} style={styles.icon} />
      </Send>
    )
  }

  renderBubble = props => {
    return (
      <Bubble
        {...props}
        textStyle={{
          right: {
            color: '#fff',
            fontFamily: 'Montserrat-Medium'
          },
          left: {
            color: '#000',
            fontFamily: 'Montserrat-Medium'
          }
        }}
        wrapperStyle={{
          left: { backgroundColor: '#00DAE6' },
          right: { backgroundColor: '#003D40' }
        }}
      />
    )
  }

  renderTime = props => {
    return (
      <Time
        {...props}
        textStyle={{
          left: {
            color: '#000'
          }
        }}
      />
    )
  }

  checkRole = async () => {
    const { role } = this.state
    if (role === 'pembeli') {
      this.props.navigation.navigate('MapBuyer')
    } else if (role === 'pedagang') {
      this.props.navigation.navigate('MapSeller')
    } else {
      alert('ada kesalah!!! Hubungi penyedia layanan')
    }
  }

  render () {
    const { goBack } = this.props.navigation
    return (
      <>
        <StatusBar backgroundColor='white' barStyle='dark-content' />
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.arrow}
              onPress={() => this.checkRole()}
            >
              <Icon
                size={30}
                name={'md-arrow-back'}
                style={{ color: '#00ADB5', marginRight: 16 }}
              />
            </TouchableOpacity>
            <View style={styles.headerLeft}>
              <Text style={styles.name}>Siomay Kang Ucay</Text>
            </View>
          </View>
          <GiftedChat
            placeholder='Tulis pesan...'
            text={this.state.textMessage}
            messages={this.state.messageList}
            onSend={this.sendMessage}
            user={{
              _id: this.state.myUsername,
              name: this.state.myUsername,
              avatar: this.state.avatar
            }}
            onInputTextChanged={value => this.setState({ textMessage: value })}
            isLoadingEarlier
            isAnimated
            renderInputToolbar={this.inputToolbar}
            renderSend={this.sendButton}
            alwaysShowSend
            renderBubble={this.renderBubble}
            renderTime={this.renderTime}
          />
        </View>
      </>
    )
  }
}

export default Chat

const styles = StyleSheet.create({
  background: {
    padding: 16,
    backgroundColor: 'white',
    height: '100%'
  },
  container: {
    backgroundColor: 'white',
    height: '100%'
  },
  header: {
    height: 65,
    backgroundColor: 'white',
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row'
  },
  arrow: {
    alignItems: 'flex-start',
    marginLeft: 20
  },
  locate: {
    alignItems: 'flex-end'
  },
  image: {
    width: 40,
    height: 40,
    marginLeft: 15
  },
  headerLeft: {
    width: '60%',
    marginLeft: 10,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  name: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 22,
    color: '#004145'
  },
  status: {
    fontSize: 16,
    marginTop: -3
  },
  input: {
    padding: 10,
    marginLeft: 5,
    borderWidth: 2,
    borderColor: '#00ADB5',
    width: '85%',
    height: 45,
    borderRadius: 16
  },
  icon: {
    color: '#00ADB5',
    marginRight: 8
  },
  autoText: {
    paddingVertical: 3,
    paddingHorizontal: 5,
    marginTop: -1,
    marginRight: 10,
    borderWidth: 0.5,
    borderColor: 'white',
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,0.8)'
  },
  viewInput: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
