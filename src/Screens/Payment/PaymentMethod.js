import React, { Component } from 'react'
import {
  View,
  StatusBar,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import Spinner from "react-native-loading-spinner-overlay";
import { DeleteTransaksi, UpdateTransaksi } from '../../Public/Redux/Action/Transaksi'

export class Payment extends Component {
  constructor (props) {
    super(props)
    this.state = {
      spinner: false,
      username_pembeli: this.props.navigation.getParam('username_pembeli'),
      username_pedagang: this.props.navigation.getParam('username_pedagang'),
      harga: '',
      porsi: ''
    }
  }

  buttonBatal = () => {
    console.warn(`pembeli`, this.state.username_pembeli)
    console.warn(`pedagang`, this.state.username_pedagang)
    const data = {
      username_pembeli: this.state.username_pembeli,
      username_pedagang: this.state.username_pedagang
    }
    this.props.dispatch(DeleteTransaksi(data)).then(() => {
      this.props.navigation.navigate('MapBuyer')
    })
  }
  
  buttonBayar = () => {
    this.setState({
      spinner: true
    })
    const {harga, porsi} = this.state
    if (harga !== '' && porsi !== '' ) {
      const data ={
        username_pembeli: this.state.username_pembeli,
        username_pedagang: this.state.username_pedagang,
        jumlah: this.state.porsi,
        total_harga: this.state.harga
      }
      this.props.dispatch(UpdateTransaksi(data)).then(() => {
        this.setState({
          spinner: false
        })
        this.props.navigation.navigate('HomeBuy')
      })
    }else{
      this.setState({
        spinner: false
      })
      alert('Harga dan total tidak boleh kosong')
    }
  }

  render () {
    return (
      <>
        <StatusBar backgroundColor='white' barStyle='dark-content' />
        <View style={styles.headers}>
        <Spinner
          visible={this.state.spinner}
          textContent={'Loading...'}
          textStyle={{ color: '#fff' }}
        />
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
            <InputText
              placeholder='Harga...'
              onChangeText={harga => this.setState({ harga })}
              autoFocus
            />
            <InputText
              placeholder='Porsi...'
              onChangeText={porsi => this.setState({ porsi })}
              autoFocus={false}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                width: '100%'
              }}
            >
              <TouchableOpacity onPress={() => this.buttonBatal()}>
                <View style={styles.buttonBayar}>
                  <Text style={styles.fontBayar}>BATAL</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.buttonBayar()}>
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
const mapStateToProps = state => {
  return {
    transaksi: state.transaksi
  }
}

export default connect(mapStateToProps)(Payment)

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
    paddingHorizontal: '13%'
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
  },
  headers: {
    width: '100%',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
