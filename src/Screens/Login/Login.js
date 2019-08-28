import React, { Component } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  StatusBar,
  AsyncStorage,
  TouchableOpacity
} from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import Icon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import { PostLogin } from '../../Public/Redux/Action/User'

class Login extends Component {
  constructor() {
    super()
    this.state = {
      spinner: false,
      role: '',
      username: '',
      password: '',
      data: []
    }
  }

  isLogin = async () => {
    const { username, password } = this.state
    if (username !== '' && password !== '') {
      let data = {
        username: username,
        password: password
      }
      await this.props.dispatch(PostLogin(data))
        .then((result) => {
          alert('Berhasil Login, Selamat Datang ' + result.value.data.result.username)
          let role = result.value.data.result.role
          if (role === 'pembeli') {
            this.props.navigation.navigate('HomeBuyer')
          } else if (role === 'pedagang') {
            this.props.navigation.navigate('HomeSeller')
          } else {
            alert("ada kesalah!!! Hubungi penyedia layanan")
          }
        })
        .catch((error) => {
          alert("Username & Password tidak cocok", error)
        })
    } else {
      alert('Warning, please insert Data in form')
    }
  }

  componentWillMount() {
    AsyncStorage.getItem('Role', (error, result) => {
      console.warn("rolenya", result)
      if (result === 'pembeli') {
        this.setState({
          role: result
        })
        this.props.navigation.navigate('HomeBuyer')
      } else if (result === 'pedagang') {
        this.setState({
          role: result
        })
        this.props.navigation.navigate('HomeSeller')
      }
    })
  }

  render() {
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
                  onChangeText={username => this.setState({ username })}
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
                  onChangeText={password => this.setState({ password })}
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
              onPress={() => this.isLogin()}
            >
              <Text style={styles.textLogIn}>Log In</Text>
              <Icon size={20} name={'md-arrow-forward'} style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('ChooseRole')}
          style={{ alignItems: 'flex-end', marginTop: '10%', marginRight: '10%' }}
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
    )
  }
}

const mapStateToProps = state => {
  return {
    data: state.user
  }
}
export default connect(mapStateToProps)(Login)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center'
  },
  layLogin: {
    justifyContent: 'center',
    height: '80%'
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
    paddingLeft: 10,
    width: '100%'
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
  }
})
