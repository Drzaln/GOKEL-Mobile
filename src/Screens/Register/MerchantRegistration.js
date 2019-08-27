import React, { Fragment } from 'react';
import {
  SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, TextInput, TouchableOpacity, Alert, Picker, AsyncStorage
} from 'react-native';
import { Button } from 'react-native-paper';



class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null
  }

  state = {
    name: '',
    email: '',
    password: '',
    id_jajan: '',
    id_kategori: ''
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
          <TextInput style={styles.input} placeholder='email' onChangeText={val => this.setState({ 'email': val })} value={this.state.email} />
          <TextInput style={styles.input} placeholder='username' onChangeText={val => this.setState({ 'username': val })} value={this.state.username} />
          <TextInput style={styles.input} placeholder='phone number' onChangeText={val => this.setState({ 'password': val })} value={this.state.password} />

          <Text>
            Kategori makanan
          </Text>
          <Picker
            style={styles.picker}
            selectedValue={(this.state && this.state.id_kategori) || '1'}
            onValueChange={(value) => {
              this.setState({ id_kategori: value });
            }} >
            <Picker.Item label={'Makanan Pokok'} value={'1'} />
            <Picker.Item label={'Sayuran'} value={'2'} />
          </Picker>

          <Text>
            Jenis jajanan
          </Text>
          <Picker
            style={styles.picker}
            selectedValue={(this.state && this.state.id_jajan) || '1'}
            onValueChange={(value) => {
              this.setState({ id_jajan: value });
            }} >
            <Picker.Item label={'Sayur mayur'} value={'1'} />
            <Picker.Item label={'Kentang rebus'} value={'2'} />
          </Picker>


        </View>
        <View style={styles.button}>
          <TouchableOpacity onPress={() => Alert.alert('Success', 'oke regis')} >

            <Button onPress={() => Alert.alert('Success', 'oke regis')}>
              DAFTAR
              </Button>

          </TouchableOpacity>


        </View>
        <Text>
          Sudah punya akun? <Text onPress={() => this.props.navigation.navigate('Login')} style={styles.btnText}>Masuk di sini</Text>
        </Text>



      </View>
    );
  }

};

const styles = StyleSheet.create({
  picker: {
    width: '80%'
  },
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
