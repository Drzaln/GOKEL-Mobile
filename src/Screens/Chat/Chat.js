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

export class Chat extends Component {
  renderRow = ({ item }) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          width: 'auto',
          alignSelf: item.from === this.state.myid ? 'flex-end' : 'flex-start',
          backgroundColor:
            item.from === this.state.myid ? '#003D40' : '#00DAE6',
          borderRadius: 5,
          marginBottom: 10
        }}
      >
        <Text
          style={{
            color: item.from === this.state.myid ? '#FFFFFF' : '#000000',
            padding: 7,
            fontSize: 16
          }}
        >
          {item.message}
        </Text>
        <Text style={{ color: '#eee', padding: 3, fontSize: 12 }}>
          {this.convertTIme(item.time)}
        </Text>
      </View>
    )
  }

  render () {
    return (
      <>
        <StatusBar backgroundColor='white' barStyle='dark-content' />
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.arrow}
              onPress={() => this.props.navigation.navigate('Friend')}
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
          <FlatList
            style={{ padding: 10, height: '80%' }}
            // data={this.state.messageList}
            renderItem={this.renderRow}
            keyExtractor={(Item, index) => index.toString()}
          />
          <View
            style={{
              marginBottom: 400,
              paddingHorizontal: 16
            }}
          >
            <View style={styles.viewInput}>
              <TextInput
                multiline
                style={styles.input}
                // value={this.state.textMessage}
                placeholder='Tulis Pesan...'
                // onChangeText={this.handleOnChange('textMessage')}
              />
              <TouchableOpacity onPress={() => alert('kepencet')}>
                <Icon size={40} name={'md-send'} style={styles.icon} />
              </TouchableOpacity>
            </View>
          </View>
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
    backgroundColor: 'white'
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
    marginLeft: 16
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
