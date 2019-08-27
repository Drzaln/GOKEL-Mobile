import React, { Component } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  StatusBar,
  Alert,
  TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { connect} from 'react-redux'
import { PostRegisterPembeli } from '../../Public/Redux/Action/UserBuyer'

class Register extends Component {
  constructor(){
    super()
    this.state = {
      email : '',
      nama: '',
      username: '',
      no_hp: '',
      password: '',
      data: []
    }
  }

  newUserPembeli(data) {
    const {email, nama, username, no_hp, password} = this.state
    if(email === '' || nama === '' || username === '' || no_hp === '' || password === ''){
     alert('Lengkapi Form Yang Tersedia!!!')
    } else {
    this.props.dispatch(PostRegisterPembeli(data))
    .then((Response) => {
      this.setState({
        data: this.props.userBuyer
    })
    console.warn("response", Response)
    console.warn('error', this.props)
    Alert.alert(
      'Success',
      'Berhasil Registrasi',
      [
          { text: 'OK', onPress: () => this.props.navigation.navigate('Login') },
      ],
      { cancelable: false },
  );
    })
    .catch((error) => {
      console.warn('error', error)
      console.warn('error', this.props)
      alert(`Error , Email/Username telah digunakan`)
      this.setState({
        email: '',
        nama:'',
        username: '',
        no_hp: '',
        password: ''
      })
    })
    
  }
}

  render () {
    const {email, nama, username, no_hp, password} = this.state
    const data = {
      email: email,
      nama: nama,
      username: username,
      no: no_hp,
      password: password
    }
    return (
      <View style={styles.container}>
        <View style={styles.layRegister}>
          <Text style={styles.Register}>DAFTAR</Text>
          <View style={styles.layInput}>
            <View style={{ width: '80%' }}>
            <View style={styles.flexRow}>
                {/* <Icon size={24} name={'md-person'} style={styles.icon} /> */}
                <TextInput
                  autoFocus
                  style={styles.input}
                  placeholder='Nama Lengkap'
                  returnKeyType={'next'}
                  blurOnSubmit={false}
                  onSubmitEditing={() => {
                    this.Username.focus()
                  }}
                  onChangeText={nama => this.setState({ nama })}
                />
              </View>
            <View style={styles.flexRow}>
                {/* <Icon size={24} name={'md-person'} style={styles.icon} /> */}
                <TextInput
                  autoFocus
                  style={styles.input}
                  placeholder='Username'
                  returnKeyType={'next'}
                  blurOnSubmit={false}
                  ref={input => {
                    this.Username = input
                  }}
                  onSubmitEditing={() => {
                    this.Email.focus()
                  }}
                  onChangeText={username => this.setState({ username })}
                />
              </View>
              <View style={styles.flexRow}>
                {/* <Icon size={24} name={'md-person'} style={styles.icon} /> */}
                <TextInput
                  autoFocus
                  style={styles.input}
                  placeholder='Email'
                  returnKeyType={'next'}
                  blurOnSubmit={false}
                  ref={input => {
                    this.Email = input
                  }}
                  onSubmitEditing={() => {
                    this.NomorHp.focus()
                  }}
                  onChangeText={email => this.setState({ email })}
                />
              </View>
              <View style={styles.flexRow}>
                {/* <Icon size={24} name={'md-lock'} style={styles.icon} /> */}
                <TextInput
                  returnKeyType={'next'}
                  style={styles.input}
                  placeholder='Nomor HP'
                  ref={input => {
                    this.NomorHp = input
                  }}
                  onSubmitEditing={() => {
                    this.Password.focus()
                  }}
                  onChangeText={no_hp => this.setState({ no_hp })}
                />
              </View>
              <View style={styles.flexRow}>
                {/* <Icon size={24} name={'md-lock'} style={styles.icon} /> */}
                <TextInput
                  style={styles.input}
                  placeholder='Password'
                  secureTextEntry
                  ref={input => {
                    this.Password = input
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
              style={styles.butSignUp}
              onPress={() => this.newUserPembeli(data)}
            >
              <Text style={styles.textSignUp}>DAFTAR</Text>
              <Icon size={20} name={'md-arrow-forward'} style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => alert('sudah dipencet')}
          >
            <Text style={styles.Text}>
              Sudah punya akun?
              <Text style={{ fontWeight: 'bold', color: '#00C7D1' }}>
                {' '}
                Login disini
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
      userBuyer: state.userBuyer
  };
};

export default connect(mapStateToProps)(Register);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center'
  },
  layRegister: {
    height: '50%',
    marginTop: '40%',
    justifyContent: 'center'
  },
  Register: {
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
  butSignUp: {
    backgroundColor: '#00C7D1',
    paddingHorizontal: 10,
    width: 'auto',
    borderRadius: 16,
    flexDirection: 'row',
    paddingBottom: 10,
    elevation: 2
  },
  textSignUp: {
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
