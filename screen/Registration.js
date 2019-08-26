import React, { Fragment } from 'react';
import {
  SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, TextInput, TouchableOpacity, Alert, AsyncStorage
} from 'react-native';
import { Button } from 'react-native-paper';



class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null
  }

  state = {
    name: '',
    email: '',
    password: ''
  }

  submitForm = () => {
    Alert.alert('Success', 'oke regis')
  }

  render() {
    return (
      <View style={styles.background}>
        <View>
          <Text style={styles.fontBold}>DAFTAR</Text>
        </View>
        <View >
          <TextInput style={styles.input} placeholder='username' onChangeText={val => this.setState({ 'username': val })} value={this.state.username}>

          </TextInput>
          <TextInput style={styles.input} placeholder='email' onChangeText={val => this.setState({ 'email': val })} value={this.state.email}>

          </TextInput>
          <TextInput style={styles.input} placeholder='password' onChangeText={val => this.setState({ 'password': val })} value={this.state.password}>

          </TextInput>

        </View>
        <View style={styles.button}>
          <TouchableOpacity onPress={() => Alert.alert('Success', 'oke regis')} >
            {/* validasi juga jika akun sudah ada maka tidak bisa regis */}
            {/* change to button */}
            <Button onPress={() => Alert.alert('Success', 'oke regis')}>
              DAFTAR
              </Button>
            {/* <Text>
                DAFTAR
              </Text> */}
          </TouchableOpacity>


        </View>
        <Text>
          Sudah punya akun? <Text onPress={() => Alert.alert('pindah ke Log in')} style={styles.btnText}>Masuk di sini</Text>
        </Text>


        {/* isiin tawaran buat login kalo udah punya akun */}

      </View>
    );
  }

};

const styles = StyleSheet.create({
  input: {
    padding: 10,
    // borderWidth: 1,
    borderColor: '#ccc',
    width: '80%',
    marginBottom: 10,
    marginLeft: 5,
    borderRadius: 5,
    borderBottomColor: '#33DDFF',
    borderBottomWidth: 1
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#33DDFF',
    padding: 10,
    justifyContent: 'flex-end'
  },
  background: {
    backgroundColor: 'white',
    height: '100%',
    paddingHorizontal: 16,
    paddingTop: '15%',
    paddingBottom: 32,
    justifyContent: 'center'

  },
  fontBold: {
    fontFamily: 'Montserrat-Bold',
    color: '#004145',
    fontSize: 25,
    marginBottom: 32
  },
  btnText: {
    color: 'blue'
  }
})



export default LoginScreen;
