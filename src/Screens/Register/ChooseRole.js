import React, { Component } from 'react'
import {
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native'

export class ChooseRoleScreen extends Component {
  render () {
    return (
      <>
        <StatusBar backgroundColor='white' barStyle='dark-content' />
        <View style={styles.background}>
          <View>
            <Text style={styles.fontBold}>SIAPA KAMU?</Text>
          </View>
          <View>
            <ChooseRole
              aksi={() => alert('kepencet')}
              gambar={require('../../../asset/penjual.png')}
              nama={'PENJUAL'}
            />
            <ChooseRole
              aksi={() => this.props.navigation.navigate('Register')}
              gambar={require('../../../asset/pembeli.png')}
              nama={'PEMBELI'}
            />
          </View>
        </View>
      </>
    )
  }
}

export default ChooseRoleScreen

class ChooseRole extends Component {
  render () {
    return (
      <TouchableOpacity onPress={this.props.aksi}>
        <View style={styles.roleView}>
          <View style={styles.containView}>
            <Image style={styles.image} source={this.props.gambar} />
            <Text style={styles.fontRegular}>{this.props.nama}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  roleView: {
    width: '100%',
    elevation: 2,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32
  },
  containView: {
    alignItems: 'center',
    marginVertical: '10%'
  },
  image: {
    height: 110,
    width: 110,
    marginBottom: 6
  },
  fontRegular: {
    fontFamily: 'Montserrat',
    color: '#004145'
  },
  fontBold: {
    fontFamily: 'Montserrat-Bold',
    color: '#004145',
    fontSize: 25,
    marginBottom: 32
  },
  background: {
    backgroundColor: 'white',
    height: '100%',
    paddingHorizontal: 16,
    paddingTop: '15%',
    paddingBottom: 32
  }
})
