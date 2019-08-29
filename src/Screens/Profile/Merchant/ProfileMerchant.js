import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  AsyncStorage,
  StatusBar
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Menu, { MenuItem } from 'react-native-material-menu'
import { DetailTransaksiPenjual } from '../../../Public/Redux/Action/Transaksi'
import { connect } from 'react-redux'

class ProfileMerchant extends Component {
  constructor (props) {
    super(props)
    this.state = {
      foto: props.navigation.getParam('foto'),
      nama: props.navigation.getParam('nama'),
      email: props.navigation.getParam('email'),
      no_hp: props.navigation.getParam('no_hp'),
      idCat: props.navigation.getParam('id_category'),
      idJajan: props.navigation.getParam('id_jajan'),
      stock: props.navigation.getParam('stok'),
      harga: props.navigation.getParam('harga'),
      username: props.navigation.getParam('username')
    }
  }

  _menu = null

  setMenuRef = ref => {
    this._menu = ref
  }

  showMenu = () => {
    this._menu.show()
  }

  hideMenu = () => {
    this._menu.hide()
  }

  islogout () {
    AsyncStorage.clear()
    alert('Berhasil Keluar')
    this.props.navigation.navigate('Login')
  }

  componentDidMount = async () => {
    const Username = await AsyncStorage.getItem('Username')
    await this.props.dispatch(DetailTransaksiPenjual(Username)).then(res => {
      console.warn(res)
      console.warn(this.props.detailTransaksi)
    })
  }

  render () {
    const { goBack } = this.props.navigation
    const { foto, nama, email, no_hp, username } = this.state
    let data = { foto, nama, email, no_hp, username }
    return (
      <View>
        <StatusBar backgroundColor='#1abc9c' barStyle='dark-content' />
        <View style={styles.layout}>
          <View style={{ flexDirection: 'row', width: '100%' }}>
            <TouchableOpacity
              style={{ marginTop: 20, alignItems: 'flex-start', flex: 1 }}
            >
              <Icon
                size={34}
                name={'md-arrow-back'}
                onPress={() => goBack()}
                style={styles.icon}
              />
            </TouchableOpacity>
            <View style={{ marginTop: 20, alignItems: 'flex-end', flex: 1 }}>
              <Menu
                ref={this.setMenuRef}
                button={
                  <Icon
                    size={34}
                    onPress={this.showMenu}
                    name={'md-more'}
                    style={styles.icon}
                  />
                }
              >
                <MenuItem
                  onPress={() =>
                    this.props.navigation.navigate('EditProfileSeller', data) &&
                    this.hideMenu()
                  }
                >
                  Edit
                </MenuItem>
                <MenuItem onPress={() => this.islogout() && this.hideMenu()}>
                  Logout
                </MenuItem>
              </Menu>
            </View>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 15 }}>
            <Image
              style={styles.photo}
              source={{ uri: `${this.props.navigation.getParam('foto')}` }}
            />
            <View style={styles.layText}>
              <Text style={styles.nameUser}>
                {this.props.navigation.getParam('nama')}
              </Text>
              <Text style={styles.email}>
                {this.props.navigation.getParam('email')}
              </Text>
              <Text style={styles.hp}>
                {this.props.navigation.getParam('no_hp')}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.layHistory}>
          <Text style={styles.textHistory}>Riwayat Penjualan</Text>
          {this.props.detailTransaksi.map(item => {
            return (
              <View style={styles.layMenu}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}
                >
                  <View style={{ marginLeft: 20 }}>
                    <Text style={styles.menu}>
                      Nama Pembeli: {item.pembeli}
                    </Text>
                    <Text style={styles.price}>
                      Total Harga: {item.total_harga}
                    </Text>
                  </View>
                  <View style={{ justifyContent: 'center' }}>
                    <TouchableOpacity>
                      <View style={styles.buttonKonf}>
                        <Text style={styles.textKonf}>Konfirmasi</Text>
                      </View>
                    </TouchableOpacity>
                    {/* tombol mati */}
                    <View style={styles.buttonKonfMati}>
                      <Text style={styles.textKonf}>Konfirmasi</Text>
                    </View>
                  </View>
                </View>
              </View>
            )
          })}
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    detailTransaksi: state.transaksi.detailTransaksi
  }
}

export default connect(mapStateToProps)(ProfileMerchant)

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 40
  },
  layout: {
    width: '100%',
    height: '45%',
    backgroundColor: '#1abc9c',
    paddingHorizontal: '10%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  layPhoto: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    width: '100%'
  },
  photo: {
    backgroundColor: 'white',
    width: 100,
    height: 130,
    borderRadius: 10,
    elevation: 10
  },
  layText: {
    marginTop: 10,
    marginLeft: 20,
    width: '60%'
  },
  nameUser: {
    fontSize: 24,
    color: '#3e383e',
    fontFamily: 'Montserrat-Bold'
  },
  email: {
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
    color: '#333'
  },
  hp: {
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
    color: '#333'
  },
  role: {
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
    color: '#333'
  },
  butEdit: {
    backgroundColor: '#dcdcdc',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginTop: 20
  },
  textEdit: {
    fontFamily: 'Montserrat-Bold',
    color: '#3e383e',
    fontSize: 15
  },
  butLogout: {
    backgroundColor: '#eb2323',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginTop: 10
  },
  textLogout: {
    fontFamily: 'Montserrat-Bold',
    color: 'white',
    fontSize: 15
  },
  layHistory: {
    marginTop: 50,
    marginHorizontal: '10%'
  },
  textHistory: {
    fontFamily: 'Montserrat-Bold',
    color: '#3e383e',
    fontSize: 24
  },
  layMenu: {
    marginLeft: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10
  },
  number: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16
  },
  menu: {
    fontSize: 16,
    fontFamily: 'Montserrat-Bold'
  },
  buttonKonf: {
    width: '120%',
    height: 40,
    marginLeft: 16,
    borderRadius: 16,
    backgroundColor: '#1abc9c',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonKonfMati: {
    width: '120%',
    height: 40,
    marginLeft: 16,
    borderRadius: 16,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textKonf: {
    fontFamily: 'Montserrat-Medium',
    color: 'white'
  }
})
