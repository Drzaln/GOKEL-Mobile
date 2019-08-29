import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  Image
} from 'react-native'
import { FAB } from 'react-native-paper'
import Modal from 'react-native-modal'
import firebase from 'react-native-firebase'
import Spinner from 'react-native-loading-spinner-overlay'
import geolocation from '@react-native-community/geolocation';
import { connect } from 'react-redux'
import { getUserPedagang, updateSaldo, updateStock } from '../../../Public/Redux/Action/User'

class HomeSeller extends Component {
  constructor(props) {
    super(props)
    this.state = {
      spinner: false,
      harga: 0,
      porsi: 0,
      data: [],
      dataUser: '',
      saldo: 0,
      saldoBaru: 0,
      saldoTampil: 0,
      username: '',
    }
  }

  componentWillMount() {
    this.setState({
      spinner: true
    })
    AsyncStorage.getItem('Username', (err, result) => {
      if (result) {
        this.setState({ name: result })
      }
      this.props.dispatch(getUserPedagang(this.state.name))
        .then((result) => {
          console.warn('data', result.value.data.result[0])
          this.setState({
            saldoTampil: result.value.data.result[0].saldo,
            username: result.value.data.result[0].username
          })
          this.setState({
            data: result.value.data.result,
            dataUser: result.value.data.result[0],
            spinner: false
          })
          this.updateToFirebase()
        })

    })
  }

  componentDidMount() {
    this.getLocation()
    const saldoTotal = Number(this.state.saldoTampil) + Number(this.state.saldoBaru)
    this.setState({
      saldoTampil: saldoTotal
    })
  }

  getLocation() {
    this.watchID = geolocation.getCurrentPosition((position) => {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      })
    })
  }

  state = {
    isModalVisible: false
  }

  updateToFirebase = () => {
    const { name, dataUser } = this.state
    console.warn('utuk update', dataUser)
    firebase.database().ref('/users/' + 'pedagang' + '/' + name).update({
      idCat: dataUser.id_category,
      idJajan: dataUser.id_jajan,
      saldo: dataUser.saldo,
      stock: dataUser.stok,
      foto: "http://res.cloudinary.com/ayiangio/image/upload/v1567092668/fehuyhtjksk0qcqxjssa.jpg",
      harga: dataUser.harga,
      username: dataUser.username,
      nama: dataUser.nama,
      latitude: this.state.latitude,
      longitude: this.state.longitude
    })

  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible })
  }

  handleScrollTo = p => {
    if (this.scrollViewRef) {
      this.scrollViewRef.scrollTo(p)
    }
  }

  handleOnScroll = event => {
    this.setState({
      scrollOffset: event.nativeEvent.contentOffset.y
    })
  }

  handleChange = event => {
    this.setState({
      saldo: event.target.value
    })
  }

  submitSaldo = () => {
    const saldoTotal = Number(this.state.saldoTampil) + Number(this.state.saldoBaru)
    this.props.dispatch(updateSaldo(this.state.username, saldoTotal))
    this.setState({
      saldo: saldoTotal,
      saldoTampil: saldoTotal,
      isModalVisible: !this.state.isModalVisible
    })
  }

  mulaiDagang = () => {
    const { name, harga, porsi, saldoTampil } = this.state
    console.warn('utuk update', name)
    console.warn('utuk harga', harga)
    console.warn('utuk porsi', porsi)
    console.warn('utuk saldo', saldoTampil)
    let data = {
      stok: porsi,
      harga: harga
    }
    if (saldoTampil <= 5000) {
      alert("Saldo Tidak Mencukupi. Isi ulang saldo sekarang dengan minimum 5000")
    } else if(harga === 0){
      alert('Harap Masukkan Harga Minimal')
    } else if(porsi === 0){
      alert('Harap Masukkan Banyaknya Jualan Anda')
    } else {
      firebase.database().ref('/users/' + 'pedagang' + '/' + name).update({
        harga: harga,
        porsi: porsi,
      })
      this.props.dispatch(updateStock(name, data))
        .then((result) => {
          console.warn("result", result)
          this.props.navigation.navigate('MapSeller')
        })
        .catch((error) => {
          console.warn("error", error)
        })

    }
  }

  render() {
    return (
      <>
        <StatusBar backgroundColor='white' barStyle='dark-content' />
        <View>
          <Spinner
            visible={this.state.spinner}
            textContent={'Loading...'}
            textStyle={{ color: '#fff' }}
          />
          <View
            style={{ padding: 16, backgroundColor: 'white', height: '100%' }}
          >
            <FAB
              label='Tambah Saldo'
              style={styles.fab}
              small
              icon='add'
              onPress={() => this.toggleModal()}
            />
            {
              this.state.data.map(item => {
                console.warn("item", item)
                return (
                  <View style={styles.viewNama}>
                    <View>
                      <Text style={styles.fontBold}>Halo, {item.nama}</Text>
                      <Text style={styles.fontSaldo}>
                        Saldo, Rp{' '}
                        {this.state.saldoTampil === 0 ? 0 : this.state.saldoTampil}
                      </Text>
                    </View>
                    <View>

                      <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('ProfileSeller', item)}
                      >
                        <Image
                          source={{
                            uri: `${item.foto}`
                          }}
                          style={styles.profil}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                )
              })
            }
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-around' }}
            >
              <View style={styles.textField}>
                <TextInput
                  style={styles.inputText}
                  blurOnSubmit={false}
                  onSubmitEditing={() => {
                    this.firstTextInput.focus()
                  }}
                  onChangeText={harga => this.setState({ harga })}
                  returnKeyType={'next'}
                  keyboardType='number-pad'
                  placeholder='Harga Minimal...'
                  placeholderTextColor='grey'
                  clearTextOnFocus
                />
              </View>
              <View style={styles.textField}>
                <TextInput
                  ref={input => {
                    this.firstTextInput = input
                  }}
                  style={styles.inputText}
                  blurOnSubmit={false}
                  onChangeText={porsi => this.setState({ porsi })}
                  returnKeyType={'done'}
                  keyboardType='number-pad'
                  placeholder='Perkiraan Porsi...'
                  placeholderTextColor='grey'
                  clearTextOnFocus
                />
              </View>
            </View>
            <View style={styles.drumGede}>
              <TouchableOpacity
                onPress={this.props.suara}
                rippleColor='rgba(0, 0, 0, .32)'
                onPress={() => this.mulaiDagang()}
              >
                <View style={styles.drumGedeLuar}>
                  <View style={styles.drumGedeDalem}>
                    <Text
                      style={{
                        fontFamily: 'Montserrat-Bold',
                        color: 'white',
                        fontSize: 30,
                        textAlign: 'center'
                      }}
                    >
                      MULAI DAGANG
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <Modal
            onSwipeComplete={() => this.toggleModal()}
            onBackdropPress={() => this.toggleModal()}
            isVisible={this.state.isModalVisible}
            swipeDirection='down'
            scrollTo={this.handleScrollTo}
            scrollOffset={this.state.scrollOffset}
            scrollOffsetMax={400 - 300}
            backdropOpacity={0.3}
            style={styles.bottomModal}
          >
            <View style={styles.scrollableModal}>
              <View style={{ height: '15%' }} />
              <View style={styles.scrollableModalContent1}>
                <Text style={styles.fontSaldo}>Isi Saldo</Text>
                <View style={styles.fieldSaldo}>
                  <TextInput
                    autoFocus
                    style={styles.inputText}
                    blurOnSubmit={false}
                    onChangeText={saldoBaru => this.setState({ saldoBaru })}
                    onSubmitEditing={() => this.submitSaldo()}
                    returnKeyType={'done'}
                    keyboardType='number-pad'
                    placeholder='Masukkan saldo...'
                    placeholderTextColor='grey'
                    clearTextOnFocus
                  />
                </View>
                <TouchableOpacity ref onPress={() => this.submitSaldo()}>
                  <View style={styles.buttonBeli}>
                    <Text style={styles.fontBeli}>ISI SALDO</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    dataPembeli: state.user.detailPembeli,
    updateSaldo: state.user.updateSaldo
  }
}
export default connect(mapStateToProps)(HomeSeller)

const styles = StyleSheet.create({
  fontSaldo: {
    fontFamily: 'Montserrat-Bold',
    color: '#007980',
    fontSize: 15,
    marginBottom: 8
  },
  viewNama: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
    width: '100%'
  },
  profil: {
    width: 80,
    height: 80,
    borderRadius: 100
  },
  fontBold: {
    fontFamily: 'Montserrat-Bold',
    color: '#004145',
    fontSize: 26
  },
  fontSaldo: {
    fontFamily: 'Montserrat-Bold',
    color: '#004145',
    fontSize: 26,
    marginBottom: 16
  },
  textField: {
    borderColor: '#00C7D1',
    borderWidth: 2,
    width: '45%',
    borderRadius: 16,
    paddingHorizontal: 8
  },
  fieldSaldo: {
    borderColor: '#00C7D1',
    borderWidth: 2,
    width: '100%',
    borderRadius: 16,
    paddingHorizontal: 8,
    marginBottom: 16
  },
  inputText: {
    fontFamily: 'Montserrat',
    fontSize: 17
  },
  drumGedeLuar: {
    width: 300,
    height: 300,
    borderRadius: 300 / 2,
    backgroundColor: '#393E46',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8
  },
  drumGedeDalem: {
    width: 200,
    height: 200,
    borderRadius: 200 / 2,
    backgroundColor: '#00ADB5',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  },
  drumGede: {
    width: '100%',
    height: 20,
    top: '35%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#00ADB5'
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0
  },
  scrollableModal: {
    height: 300
  },
  scrollableModalContent1: {
    height: 700,
    backgroundColor: 'white',
    padding: 16
  },
  scrollableModalText1: {
    fontSize: 20,
    color: 'green'
  },
  profil: {
    width: 80,
    height: 80,
    borderRadius: 100
  },
  fontNama: {
    fontFamily: 'Montserrat-Bold',
    color: '#004145',
    fontSize: 23,
    marginBottom: 8
  },
  fontPorsi: {
    fontFamily: 'Montserrat-Bold',
    color: '#00ACB6',
    fontSize: 14,
    marginBottom: 8
  },
  fontHarga: {
    fontFamily: 'Montserrat-Bold',
    color: '#007980',
    fontSize: 20,
    marginBottom: 8
  },
  buttonBeli: {
    width: '100%',
    height: 40,
    backgroundColor: '#00ADB5',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8
  },
  fontBeli: {
    fontSize: 18,
    fontFamily: 'Montserrat',
    color: 'white'
  }
})
