import React, { Component } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  StatusBar,
  TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

export default class Login extends Component {
  render () {
    return (
      <View style={styles.container}>
        <View style={styles.layLogin}>
          <Text style={styles.Login}>Log In</Text>
          <View style={styles.layInput}>
            <View style={{ width: '80%' }}>
              <View style={styles.flexRow}>
                {/* <Icon size={24} name={'md-person'} style={styles.icon} /> */}
                <TextInput
                  style={styles.input}
                  placeholder='Username'
                  autoFocus
                  returnKeyType={'next'}
                  blurOnSubmit={false}
                  onSubmitEditing={() => {
                    this.secondTextInput.focus()
                  }}
                />
              </View>
              <View style={styles.flexRow}>
                {/* <Icon size={24} name={'md-lock'} style={styles.icon} /> */}
                <TextInput
                  style={styles.input}
                  placeholder='Password'
                  secureTextEntry
                  ref={input => {
                    this.secondTextInput = input
                  }}
                />
              </View>
            </View>
          </View>
          <View
            style={{
              alignItems: 'flex-end',
              marginRight: '10%',
              marginTop: 30
            }}
          >
            <TouchableOpacity
              style={styles.butLogIn}
              onPress={() => this.props.navigation.navigate('Home')}
            >
              <Text style={styles.textLogIn}>Log In</Text>
              <Icon size={20} name={'md-arrow-forward'} style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('ChooseRoleScreen')}
          >
            <Text style={styles.Text}>
              Tidak punya akun?
              <Text style={{ fontWeight: 'bold', color: '#00C7D1' }}>
                {' '}
                Daftar disini
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center'
  },
  layLogin: {
    height: '50%',
    marginTop: '40%',
    justifyContent: 'center'
  },
  Login: {
    fontFamily: 'Montserrat-Bold',
    textAlign: 'left',
    fontSize: 32,
    marginBottom: 30,
    marginLeft: 40,
    color: '#004145'
  },
  layInput: {
    width: '100%',
    marginHorizontal: '10%'
  },
  icon: {
    marginTop: 10,
    marginLeft: 10,
    color: 'white'
  },
  input: {
    paddingLeft: 10
  },
  flexRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#00C7D1'
  },
  butLogIn: {
    backgroundColor: '#00C7D1',
    paddingHorizontal: 10,
    width: 'auto',
    borderRadius: 16,
    width: 100,
    flexDirection: 'row',
    paddingBottom: 10,
    elevation: 2
  },
  textLogIn: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
    fontFamily: 'Montserrat',
    marginTop: 10
  },
  Text: {
    fontWeight: '500',
    fontSize: 16,
    textAlign: 'right',
    marginRight: '10%',
    marginTop: 100
  }
})
