import React, { Component } from 'react'
import {
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage
} from 'react-native'
import { FAB } from 'react-native-paper'
import Modal from 'react-native-modal'
import firebase from 'react-native-firebase'
import geolocation from '@react-native-community/geolocation'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import { PostTransaksi } from '../../../Public/Redux/Action/Transaksi'
import { connect } from 'react-redux'

export class Maps extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isModalVisible: false,
      idKategori: this.props.navigation.getParam('idKategori'),
      users: [],
      nama: '',
      username: '',
      foto: '',
      porsi: 0,
      harga: 0
    }
  }

  getData = () => {
    firebase
      .database()
      .ref('users/pedagang')
      .on('child_added', data => {
        let user = data.val()
        user.username = data.key
        if (user.idCat != this.state.idKategori) {
          this.setState(prevData => {
            return {
              users: [...prevData.users, user]
            }
          })
        }
      })
  }

  componentDidMount () {
    this.getData()
    this.getLocation()
  }

  getLocation () {
    this.watchID = geolocation.getCurrentPosition(
      position => {
        let region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.00922 * 1.5,
          longitudeDelta: 0.00421 * 1.5
        }
        this.onRegionChange(region, region.latitude, region.longitude)
      },
      error => console.log(error)
    )
  }

  onRegionChange (region, lastLat, lastLong) {
    this.setState({
      mapRegion: region,
      // // If there are no new values set the current ones
      lastLat: lastLat || this.state.lastLat,
      lastLong: lastLong || this.state.lastLong
    })
  }

  toggleModal = () => {
    this.setState({
      isModalVisible: !this.state.isModalVisible
    })
  }

  modalOut = marker => {
    let region = {
      latitude: marker.latitude,
      longitude: marker.longitude,
      latitudeDelta: 0.00922 * 1,
      longitudeDelta: 0.00421 * 1
    }
    this.setState({
      isModalVisible: !this.state.isModalVisible,
      mapRegion: region,
      nama: marker.nama,
      username: marker.username,
      foto: marker.foto,
      porsi: marker.stok,
      harga: marker.harga
    })
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

  keBeli = async () => {
    console.warn(`porrrpppps`, this.props)
    const dataUsername = await AsyncStorage.getItem('Username')
    const data = {
      username_pembeli: dataUsername,
      username_pedagang: this.state.nama
    }
    this.props
      .dispatch(PostTransaksi(data))
      .then(() => {
        this.toggleModal()
        this.props.navigation.navigate('Payment', {
          username_pembeli: dataUsername,
          username_pedagang: this.state.nama
        })
      })
      .catch(() => {
        console.warn('meh')
      })
  }

  render () {
    const { goBack } = this.props.navigation
    return (
      <>
        <StatusBar
          translucent
          backgroundColor='rgba(0, 0, 0, 0.05)'
          barStyle='dark-content'
        />
        <View style={{ flex: 1 }}>
          <MapView
            ref={map => (this.map = map)}
            showsCompass={false}
            showsUserLocation
            followsUserLocation
            showsMyLocationButton={false}
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={this.state.mapRegion}
          >
            {this.state.users.map((marker, index) => {
              return (
                <Marker
                  key={index}
                  onPress={() => this.modalOut(marker)}
                  coordinate={{
                    latitude: marker.latitude,
                    longitude: marker.longitude
                  }}
                />
              )
            })}
          </MapView>
          <Modal
            onSwipeComplete={() => this.toggleModal()}
            onBackdropPress={() => this.toggleModal()}
            isVisible={this.state.isModalVisible}
            swipeDirection='down'
            scrollTo={this.handleScrollTo}
            scrollOffset={this.state.scrollOffset}
            scrollOffsetMax={400 - 300}
            backdropOpacity={0.1}
            style={styles.bottomModal}
          >
            <View style={styles.scrollableModal}>
              <View style={{ height: '15%' }} />
              <View style={styles.scrollableModalContent1}>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ marginRight: 16 }}>
                    <Image
                      source={{
                        uri: this.state.foto
                      }}
                      style={styles.profil}
                    />
                  </View>
                  <View style={{ flex: 2 }}>
                    <Text style={styles.fontNama}>{this.state.nama}</Text>
                    <Text style={styles.fontPorsi}>Sisa ± 30 Porsi </Text>
                    <Text style={styles.fontHarga}>Rp 5000</Text>
                    <TouchableOpacity onPress={() => this.keBeli()}>
                      <View style={styles.buttonBeli}>
                        <Text style={styles.fontBeli}>BELI</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate('Chat', {
                          username: this.state.username
                        })
                      }
                    >
                      <View style={styles.buttonPesan}>
                        <Text style={styles.fontPesan}>KIRIM PESAN</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.viewBuletan}>
                    <View style={styles.buletan} />
                  </View>
                </View>
              </View>
            </View>
          </Modal>
          <FAB
            color='#00ADB5'
            style={styles.fabBack}
            small
            icon='arrow-back'
            onPress={() => goBack()}
          />
          <FAB
            small
            color='#00ADB5'
            style={styles.fabLoc}
            icon='my-location'
            onPress={() => this.getLocation()}
          />
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

export default connect(mapStateToProps)(Maps)

const styles = StyleSheet.create({
  fabBack: {
    position: 'absolute',
    margin: 16,
    left: 0,
    top: '3%',
    backgroundColor: 'white',
    color: '#00ADB5'
  },
  fabLoc: {
    position: 'absolute',
    margin: 16,
    right: 0,
    top: '3%',
    backgroundColor: 'white',
    color: '#00ADB5'
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
    alignItems: 'center',
    padding: 16
  },
  scrollableModalText1: {
    fontSize: 20,
    color: 'green'
  },
  map: {
    flex: 1
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
  },
  buttonPesan: {
    width: '100%',
    height: 40,
    backgroundColor: 'white',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderColor: '#00ADB5',
    borderWidth: 2
  },
  fontPesan: {
    fontSize: 18,
    fontFamily: 'Montserrat',
    color: '#004145'
  },
  viewBuletan: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 8
  },
  buletan: {
    borderRadius: 100,
    backgroundColor: '#6BEC56',
    width: 30,
    height: 30
  }
})
