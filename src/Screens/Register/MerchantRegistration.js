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
import { connect } from 'react-redux'
import { Dropdown } from 'react-native-material-dropdown';
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
      allJajan: [],
      idJajan: 0,
      idCat: 0,
      makanan: [],
      minuman: [],
      sayur: [],
      snack: []
    }
  }

  // componentWillMount() {
  //   this.props.dispatch(getJajan())
  //     .then(result => {
  //       // console.warn("result jajan", result.value.data.result)
  //       let alldata = result.value.data.result
  //       alldata.map(item => {
  //         console.warn("item", item)
  //         if (item.id_category === 1) {
  //           this.setState({
  //             makanan: item
  //           })
  //         } else if (item.id_category === 2) {
  //           this.setState({
  //             minuman: item
  //           })
  //         } else if (item.id_category === 3) {
  //           this.setState({
  //             sayur: item
  //           })
  //         } else if (item.id_category === 4) {
  //           this.setState({
  //             snack: item
  //           })
  //         }
  //       })
  //     })
  // }

  newUserPedagang(data) {
    const { email, nama, username, no_hp, password, id_category, id_jajan } = this.state
    if (email === '' || nama === '' || username === '' || no_hp === '' || password === '') {
      alert('Lengkapi Form Yang Tersedia!!!')
    } else if(id_category === 0){
      alert('Masukkan Kategori Jualan Anda')
    } else if(id_jajan === 0){
      alert('Masukkan Jualan Anda')
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
          console.warn('error', error)
          console.warn('error', this.props)
          alert(`Error , Email/Username telah digunakan`)
            // this.setState({
            //   email: '',
            //   nama: '',
            //   username: '',
            //   no_hp: '',
            //   password: '',
            //   id_category: '0',
            //   id_jajan: '0'
            // })
        })

    }
  }

  render() {
    const { email, nama, username, no_hp, password, idCat, idJajan } = this.state
    const data = {
      email: email,
      nama: nama,
      username: username,
      no: no_hp,
      password: password,
      id_category: idCat,
      id_jajan: idJajan
    }
    console.warn("id category",idCat)
    console.warn("id", idJajan)

    return (
      <View style={styles.container}>
        <Spinner
          visible={this.state.spinner}
          textContent={'Loading...'}
          textStyle={{ color: '#fff' }}
        />
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
                  <Picker.Item label="Sayur" value="3" />
                  <Picker.Item label="Snack" value="4" />
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
                     <Picker.Item label="Siomay" value="1" />
                     <Picker.Item label="Bakso" value="2" />
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
                    <Picker.Item label="Es Dung-dung" value="1" />
                    <Picker.Item label="Es Doger" value="2" />
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
        </View>
        <View style={{ marginTop: 30, height: 40 }}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Login')}
            style={{ alignItems: 'flex-end', height: 30, marginTop: '30%', marginRight: '10%' }}
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
    height: '50%',
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
  }
})
