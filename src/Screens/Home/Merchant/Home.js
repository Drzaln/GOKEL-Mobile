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
          <View style={styles.viewNama}>
            <View>
              <Text style={styles.fontBold}>Halo, Nama</Text>
              <Text style={styles.fontSaldo}>Saldo, Rp 20000</Text>
            </View>
            <View>
              <TouchableOpacity onPress={() => alert('kepencet')}>
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
  }
})
