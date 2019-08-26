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

export class App extends Component {
  render () {
    return (
      <>
        <StatusBar backgroundColor='white' barStyle='dark-content' />
        <View>
          <View style={styles.background}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <View>
                <Text style={styles.fontBold}>Halo, Nama</Text>
              </View>
              <View>
                <TouchableOpacity onPress={() => alert('kepencet')}>
                  <Image
                    source={{
                      uri: 'https://randomuser.me/api/portraits/men/76.jpg'
                    }}
                    style={{ width: 80, height: 80, borderRadius: 100 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{ backgroundColor: 'white' }}>
            <Text
              style={{
                fontFamily: 'Montserrat-Bold',
                fontSize: 18,
                color: '#004145',
                paddingLeft: 32,
                marginBottom: 16
              }}
            >
              Populer
            </Text>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={[
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
              ]}
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
                      marginLeft: 16,
                      elevation: 2,
                      marginBottom: 32,
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
              height: '100%',
              paddingHorizontal: 32
            }}
          >
            <Text
              style={{
                fontFamily: 'Montserrat-Bold',
                fontSize: 18,
                color: '#004145',
                marginBottom: 16
              }}
            >
              Kategori
            </Text>
          </View>
        </View>
      </>
    )
  }
}

export default App

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
  }
})
