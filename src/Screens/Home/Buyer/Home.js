import React, { Component } from 'react'
import {
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList
} from 'react-native'
import { FlatGrid } from 'react-native-super-grid'

export class Home extends Component {
  render () {
    const items = [
      { name: 'SAYUR', code: '#1abc9c' },
      { name: 'MINUMAN', code: '#2ecc71' },
      { name: 'JAJANAN', code: '#3498db' },
      { name: 'MAKANAN', code: '#9b59b6' }
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

    return (
      <>
        <StatusBar backgroundColor='white' barStyle='dark-content' />
        <View>
          <View style={styles.background}>
            <View style={styles.viewNama}>
              <View>
                <Text style={styles.fontBold}>Halo, Nama</Text>
              </View>
              <View>
                <TouchableOpacity onPress={()=> this.props.navigation.navigate('Profile')}>
                  <Image
                    source={{
                      uri: 'https://randomuser.me/api/portraits/men/76.jpg'
                    }}
                    style={styles.profil}
                  />
                </TouchableOpacity>
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
                  onPress={() => alert(`kepencet ${index}`)}
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
                <TouchableOpacity onPress={() => alert('kepencet')}>
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
                  onPress={() => alert(`kepencet ${item.name}`)}
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

export default Home

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