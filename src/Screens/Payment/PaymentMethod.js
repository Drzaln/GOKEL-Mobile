import React, { Component } from 'react'
import {
  View,
  StatusBar,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity
} from 'react-native'

export class Payment extends Component {
  render () {
    return (
      <>
        <StatusBar backgroundColor='white' barStyle='dark-content' />
        <View
          style={{
            width: '100%',
            padding: 16,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Text
            style={{
              fontFamily: 'Montserrat-Bold',
              fontSize: 23,
              color: '#004145'
            }}
          >
            PEMBAYARAN
          </Text>
        </View>
        <View style={styles.background}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%'
            }}
          >
            <InputText placeholder='Harga...' autoFocus />
            <InputText placeholder='Porsi...' autoFocus={false} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                width: '100%'
              }}
            >
              <TouchableOpacity onPress={() => alert('kepencet')}>
                <View style={styles.buttonBayar}>
                  <Text style={styles.fontBayar}>KIRIM PESAN</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => alert('kepencet')}>
                <View style={styles.buttonTunai}>
                  <Text style={styles.fontTunai}>BAYAR TUNAI</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </>
    )
  }
}
export default Payment

class InputText extends Component {
  render () {
    return (
      <>
        <View style={styles.fieldText}>
          <TextInput
            autoFocus={this.props.autoFocus}
            style={styles.inputText}
            blurOnSubmit={false}
            onChangeText={this.props.onChangeText}
            onSubmitEditing={this.props.onSubmitEditing}
            returnKeyType={'done'}
            keyboardType='number-pad'
            placeholder={this.props.placeholder}
            placeholderTextColor='grey'
            clearTextOnFocus
          />
        </View>
      </>
    )
  }
}

const styles = StyleSheet.create({
  background: {
    padding: 16,
    backgroundColor: 'white',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  fieldText: {
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
  buttonBayar: {
    width: '100%',
    height: 40,
    backgroundColor: 'white',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderColor: '#ff6961',
    borderWidth: 2,
    padding: 16
  },
  fontBayar: {
    fontSize: 18,
    fontFamily: 'Montserrat',
    color: '#ff6961'
  },
  buttonTunai: {
    width: '100%',
    height: 40,
    backgroundColor: '#00ADB5',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderColor: '#00ADB5',
    borderWidth: 2,
    padding: 16
  },
  fontTunai: {
    fontSize: 18,
    fontFamily: 'Montserrat',
    color: '#fff'
  }
})
