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
  Picker,
  TouchableOpacity
} from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import Icon from 'react-native-vector-icons/Ionicons'
import firebase from 'react-native-firebase'
import geolocation from '@react-native-community/geolocation';
import { connect } from 'react-redux'
import { PostRegisterPedagang } from '../../Public/Redux/Action/User'

class Register extends Component {
  constructor() {
    super()
    this.state = {
      spinner: false,
      email: '',
      nama: '',
      username: '',
      no_hp: '',
      password: '',
      data: [],
      idJajan: 0,
      idCat: 0,
      latitude: 0,
      longitude: 0

    }
  }
  
   componentDidMount() {
    // await this.user()
    this.watchID = geolocation.getCurrentPosition((position) => {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      })
    })
  }

  newUserPedagang(data) {
    const { email, nama, username, no_hp, password, idCat, idJajan } = this.state
    this.setState({
      spinner: true
    })
    if (email === '' || nama === '' || username === '' || no_hp === '' || password === '' ) {
      alert('Lengkapi Form Yang Tersedia!!!')
      this.setState({
        spinner: false
      })
    } else if(idCat === 0){
      alert('Masukkan Kategori Jualan Anda')
      this.setState({
        spinner: false
      })
    } else if(idJajan === 0){
      alert('Masukkan Jualan Anda')
      this.setState({
        spinner: false
      })
    } else {
      this.props.dispatch(PostRegisterPedagang(data))
        .then((Response) => {
          this.setState({
            data: this.props.userBuyer,
            spinner: false
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
          alert(`Error , Email/Username telah digunakan`)
          this.setState({
            email: '',
            nama:'',
            username: '',
            no_hp: '',
            password: '',
            spinner: false
          })
        })

    }
  }

  render() {
    const { email, nama, username, no_hp, password, idCat, idJajan, latitude, longitude } = this.state
    const data = {
      email: email,
      nama: nama,
      username: username,
      no: no_hp,
      password: password,
      id_category: idCat,
      id_jajan: idJajan
    }
    // console.warn("latitude",latitude)
    // console.warn("longitufe", longitude)

    return (
      <View style={styles.container}>
        <Spinner
          visible={this.state.spinner}
          textContent={'Loading...'}
          textStyle={{ color: '#fff' }}
        />
        <Text style={styles.Register}>DAFTAR</Text>
        <ScrollView style={styles.layRegister}>
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
                  value={this.state.nama}
                  onChangeText={nama => this.setState({ nama })}
                />
              </View>
              <View style={styles.flexRow}>
                {/* <Icon size={24} name={'md-person'} style={styles.icon} /> */}
                <TextInput
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
                  value={this.state.username}
                  onChangeText={username => this.setState({ username })}
                />
              </View>
              <View style={styles.flexRow}>
                {/* <Icon size={24} name={'md-person'} style={styles.icon} /> */}
                <TextInput
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
                  value={this.state.email}
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
                  value={this.state.no_hp}
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
                  value={this.state.password}
                  onChangeText={password => this.setState({ password })}
                />
              </View>
              <View style={styles.flexRow}>
                <Picker
                  selectedValue={idCat}
                  style={{ height: 50, width: 300 }}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ idCat: itemValue })
                  }>
                  <Picker.Item label="Pilih Kategori" value="0" />
                  <Picker.Item label="Makanan" value="1" />
                  <Picker.Item label="Minuman" value="2" />
                  <Picker.Item label="Snack" value="3" />
                  <Picker.Item label="Sayur" value="4" />
                </Picker>
              </View>
                {
                  this.state.idCat === '1'
                    ?
                    <View style={styles.flexRow}>
                    <Picker
                      selectedValue={idJajan}
                      style={{ height: 50, width: 300 }}
                      onValueChange={(Value, itemIndex) =>
                        this.setState({ idJajan: Value })
                      }>
                        <Picker.Item label="Pilih Macam-macam Makanan" value="0" />
                     <Picker.Item label="Bakso" value="1" />
                     <Picker.Item label="Mie Ayam" value="2" />
                     <Picker.Item label="Bubur Ayam" value="3" />
                     <Picker.Item label="Nasi Goreng" value="4" />
                     <Picker.Item label="Sate" value="14" />
                    </Picker>
                    </View>
                    :  
                    this.state.idCat === '2'
                    ?
                    <View style={styles.flexRow}>
                    <Picker
                    selectedValue={idJajan}
                    style={{ height: 50, width: 300 }}
                    onValueChange={(Value, itemIndex) =>
                      this.setState({ idJajan: Value })
                    }>
                      <Picker.Item label="Pilih Macam-macam Minuman" value="0" />
                    <Picker.Item label="Es Dungdung" value="5" />
                    <Picker.Item label="Es Doger" value="6" />
                    <Picker.Item label="Es Kelapa" value="7" />
                    <Picker.Item label="Es Dawet" value="8" />
                  </Picker>
                  </View>
                  :
                  this.state.idCat === '3'
                    ?
                    <View style={styles.flexRow}>
                    <Picker
                    selectedValue={idJajan}
                    style={{ height: 50, width: 300 }}
                    onValueChange={(Value, itemIndex) =>
                      this.setState({ idJajan: Value })
                    }>
                      <Picker.Item label="Pilih Macam-macam Snack" value="0" />
                    <Picker.Item label="Pentol" value="9" />
                    <Picker.Item label="Tahu Bulat" value="10" />
                    <Picker.Item label="Siomay" value="11" />
                    <Picker.Item label="Roti" value="12" />
                  </Picker>
                  </View>
                  :
                  this.state.idCat === '4'
                    ?
                    <View style={styles.flexRow}>
                    <Picker
                    selectedValue={idJajan}
                    style={{ height: 50, width: 300 }}
                    onValueChange={(Value, itemIndex) =>
                      this.setState({ idJajan: Value })
                    }>
                      <Picker.Item label="Pilih Macam-macam Sayur" value="0" />
                    <Picker.Item label="Sayur" value="13" />
                  </Picker>
                  </View>
                  :
                  <View style={styles.flexRow}>
                  <Picker
                    selectedValue={idJajan}
                    style={{ height: 50, width: 300 }}
                    onValueChange={(Value, itemIndex) =>
                      this.setState({ idJajan: Value })
                    }>
                          <Picker.Item label='Pilih Category Terlebih dahulu' value="0"/>
                  </Picker>
                  </View>
                }
             
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
              onPress={() => this.newUserPedagang(data)}
            >
              <Text style={styles.textSignUp}>DAFTAR</Text>
              <Icon size={20} name={'md-arrow-forward'} style={styles.icon} />
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View style={{ height: 20, marginBottom:10 }}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Login')}
            style={{ alignItems: 'flex-end', height: 20, marginRight: '10%' }}
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
    userBuyer: state.user
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
    height: '100%',
    paddingBottom: 20
  },
  Register: {
    fontFamily: 'Montserrat-Bold',
    textAlign: 'left',
    fontSize: 32,
    marginTop: '10%',
    marginLeft: 40,
    marginBottom: '7%',
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
  }
})
