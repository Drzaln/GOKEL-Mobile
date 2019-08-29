import React, { Component } from 'react'
import {
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage,
  FlatList
} from 'react-native'
import { FlatGrid } from 'react-native-super-grid'
import firebase from 'react-native-firebase'
import geolocation from '@react-native-community/geolocation'
import { connect } from 'react-redux'
import { getUserPembeli } from '../../../Public/Redux/Action/User'

class Home extends Component {
  constructor () {
    super()
    this.state = {
      name: '',
      dataUser: '',
      data: [],
      allCoor: ''
    }
  }

  componentDidMount () {
    this.getLocation()
  }

  getLocation () {
    this.watchID = geolocation.getCurrentPosition(position => {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      })
    })
  }

  user = () => {
    firebase
      .database()
      .ref('users/')
      .on('value', result => {
        let data = result.val()
        let buyer = 'pembeli'
        console.warn('data', data)
        console.warn('nama', this.state.name)
        if (data.pembeli === buyer) {
          buyer = data.pembeli
        } else {
          this.setState(prevState => {
            return {
              allCoor: [...prevState.allCoor, data.pedagang]
            }
          })
        }
      })
  }

  componentWillMount () {
    AsyncStorage.getItem('Username', (err, result) => {
      if (result) {
        this.setState({ name: result })
      }
      this.props.dispatch(getUserPembeli(this.state.name)).then(result => {
        this.setState({
          data: result.value.data.result,
          dataUser: result.value.data.result[0]
        })
        this.updateToFirebase()
      })
    })
  }

  updateToFirebase = () => {
    const { name, dataUser } = this.state
    console.warn('utuk update', dataUser)
    firebase
      .database()
      .ref('/users/' + 'pembeli' + '/' + name)
      .update({
        username: dataUser.username,
        nama: dataUser.nama,
        photo: dataUser.foto,
        latitude: this.state.latitude,
        longitude: this.state.longitude
      })
  }

  render () {
    console.warn(this.state.data)

    const items = [
      { name: 'SAYUR', code: '#1abc9c', id: 4 },
      { name: 'MINUMAN', code: '#2ecc71', id: 2 },
      { name: 'SNACK', code: '#3498db', id: 3 },
      { name: 'MAKANAN', code: '#9b59b6', id: 1 }
    ]
    const jualan = [
      {
        nama_makanan: 'Siomay Kang Ucay',
        bacol: '#3D9499',
        gambar:
          'https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fsullezuka.files.wordpress.com%2F2012%2F01%2Fsiomay-bandung-2.png&f=1'
      },
      {
        nama_makanan: 'Sate Bu Siti',
        bacol: '#00B558',
        gambar:
          'https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fkawuloalitox.files.wordpress.com%2F2009%2F10%2Fsate-ayam.png&f=1'
      }
    ]
    console.warn('alldata', this.state.allCoor)
    const alldatatoMap = this.state.allCoor
    const list = this.state.data
    // list.push(this.state.name)
    return (
      <>
        <StatusBar backgroundColor='white' barStyle='dark-content' />
        <View>
          <View style={styles.background}>
            <View style={styles.viewNama}>
              <View>
                <Text style={styles.fontBold}>Halo, {this.state.name}</Text>
              </View>
              <View>
                {list.map((item, index) => {
                  console.warn('item', item)
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() =>
                        this.props.navigation.navigate('ProfileBuyer', item)
                      }
                    >
                      <Image
                        source={{
                          uri: `${item.foto}`
                        }}
                        style={styles.profil}
                      />
                    </TouchableOpacity>
                  )
                })}
              </View>
            </View>
          </View>
          <View style={styles.popularView}>
            <Text style={styles.textView}>Populer</Text>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={jualan}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => this.props.navigation.navigate('MapBuyer')}
                >
                  <View
                    style={{
                      width: 250,
                      height: 100,
                      borderRadius: 16,
                      marginLeft: 10,
                      elevation: 4,
                      marginBottom: 32,
                      marginTop: 8,
                      padding: 16,
                      backgroundColor: item.bacol
                    }}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                      }}
                    >
                      <View style={{ flex: 1 }}>
                        <Text
                          style={{
                            fontFamily: 'Montserrat-Bold',
                            color: '#FFFFFF',
                            fontSize: 15
                          }}
                        >
                          {item.nama_makanan}
                        </Text>
                      </View>
                      <View>
                        <Image
                          style={{ width: 120, height: 75 }}
                          source={{ uri: item.gambar }}
                        />
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
          <View
            style={{
              backgroundColor: 'white',
              height: '50%'
            }}
          >
            <View style={{ flexDirection: 'row', width: '100%' }}>
              <View style={{ flex: 1 }}>
                <Text style={styles.textView}>Kategori</Text>
              </View>
              <View style={styles.textLihat}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('MapBuyer', alldatatoMap)
                  }
                >
                  <Text style={styles.textLink}>Lihat semua</Text>
                </TouchableOpacity>
              </View>
            </View>
            <FlatGrid
              showsVerticalScrollIndicator={false}
              itemDimension={130}
              items={items}
              style={styles.gridView}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    this.props.navigation.navigate('MapBuyer', { idKategori: item.id })
                  }
                >
                  <View
                    style={[
                      styles.itemContainer,
                      { backgroundColor: item.code, elevation: 4 }
                    ]}
                  >
                    <Text style={styles.itemName}>{item.name}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    dataPembeli: state.user.detailPembeli
  }
}
export default connect(mapStateToProps)(Home)

const styles = StyleSheet.create({
  fontRegular: {
    fontFamily: 'Montserrat',
    color: '#004145'
  },
  fontBold: {
    fontFamily: 'Montserrat-Bold',
    color: '#004145',
    fontSize: 26
  },
  background: {
    backgroundColor: 'white',
    padding: 32
  },
  gridView: {
    flex: 1,
    width: '100%'
  },
  itemContainer: {
    justifyContent: 'center',
    borderRadius: 16,
    padding: 16,
    height: 100
  },
  itemName: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'Montserrat-Bold'
  },
  viewNama: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  profil: {
    width: 80,
    height: 80,
    borderRadius: 100
  },
  textView: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
    color: '#004145',
    paddingLeft: 32,
    marginBottom: 16
  },
  textLink: {
    fontFamily: 'Montserrat',
    fontSize: 15,
    color: '#004145',
    marginBottom: 16
  },
  popularView: {
    backgroundColor: 'white',
    marginBottom: 16
  },
  fab: {
    position: 'absolute',
    marginRight: 16,
    marginBottom: 25,
    right: 0,
    bottom: 0
  },
  textLihat: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 32,
    justifyContent: 'flex-end'
  }
})
