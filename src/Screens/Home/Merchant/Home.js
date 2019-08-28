import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Image
} from 'react-native'
import { FAB } from 'react-native-paper'
import Modal from 'react-native-modal'

export class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      harga: '',
      porsi: '',
      saldo: 2000,
      saldoBaru: 0,
      saldoTampil: 0
    }
  }

  componentDidMount () {
    const saldoTotal = Number(this.state.saldo) + Number(this.state.saldoBaru)

    this.setState({
      saldoTampil: saldoTotal
    })
  }

  state = {
    isModalVisible: false
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
    const saldoTotal = Number(this.state.saldo) + Number(this.state.saldoBaru)

    this.setState({
      saldo: saldoTotal,
      saldoTampil: saldoTotal,
      isModalVisible: !this.state.isModalVisible
    })
  }

  render () {
    return (
      <>
        <StatusBar backgroundColor='white' barStyle='dark-content' />
        <View>
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
            <View style={styles.viewNama}>
              <View>
                <Text style={styles.fontBold}>Halo, Nama</Text>
                <Text style={styles.fontSaldo}>
                  Saldo, Rp{' '}
                  {this.state.saldoTampil === 0 ? 0 : this.state.saldoTampil}
                </Text>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('ProfileBuyer')}
                >
                  <Image
                    source={{
                      uri: 'https://randomuser.me/api/portraits/men/76.jpg'
                    }}
                    style={styles.profil}
                  />
                </TouchableOpacity>
              </View>
            </View>
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
                  placeholder='Harga...'
                  placeholderTextColor='grey'
                  clearTextOnFocus
                  autoFocus
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
                    onChangeText={saldoBaru => this.setState({ saldoBaru }) }
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

export default App

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
    marginBottom: 32
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
