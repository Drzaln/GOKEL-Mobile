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

export class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      harga: '',
      porsi: ''
    }
  }

  render () {
    return (
      <>
        <StatusBar backgroundColor='white' barStyle='dark-content' />
        <View style={{ padding: 16, backgroundColor: 'white', height: '100%' }}>
          <FAB
            label='Tambah Saldo'
            style={styles.fab}
            small
            icon='add'
            onPress={() => console.log('Pressed')}
          />
          <View style={styles.viewNama}>
            <View>
              <Text style={styles.fontBold}>Halo, Nama</Text>
              <Text style={styles.fontSaldo}>Saldo, Rp 20000</Text>
            </View>
            <View>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('ProfileBuyer')}>
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
      </>
    )
  }
}

export default Home

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
  textField: {
    borderColor: '#00C7D1',
    borderWidth: 2,
    width: '45%',
    borderRadius: 16,
    paddingHorizontal: 8
  },
  inputText: {
    fontFamily: 'Montserrat'
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
    backgroundColor: '#00ADB5',
  }
})
