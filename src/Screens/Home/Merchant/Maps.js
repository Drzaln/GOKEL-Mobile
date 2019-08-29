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
import geolocation from '@react-native-community/geolocation';
import firebase from 'react-native-firebase'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'

export class Maps extends Component {
  constructor() {
    super()
    this.state = {
      longitude: 0,
      latitude: 0
    }
    this.apagitu()
  }

  apagitu () {
    setInterval(() => this.getLocation(), 10000);
    setInterval(() => this.updateLocation(), 10000);
  }

  updateLocation = async () => {
    let myname = await AsyncStorage.getItem('Username')
    console.warn("myname", myname)
    console.warn("latitude", this.state.latitude)
    console.warn("lon gitude", this.state.longitude)
    firebase.database().ref('/users/pedagang/' + myname).update({ latitude: this.state.latitude, longitude: this.state.longitude })
  }

  getLocation() {
    this.watchID = geolocation.getCurrentPosition((position) => {
      let region = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.00922 * 1.5,
        longitudeDelta: 0.00421 * 1.5
      }

      this.onRegionChange(region, region.latitude, region.longitude);
    }, (error) => console.log(error));
  }

  onRegionChange(region, lastLat, lastLong) {
    console.warn("region", region)
    this.setState({
      mapRegion: region,
      // // If there are no new values set the current ones
      latitude: lastLat || this.state.lastLat,
      longitude: lastLong || this.state.lastLong
    });
  }

  render() {
    const { goBack } = this.props.navigation;
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
            <Marker
              coordinate={{
                latitude: 37.78825,
                longitude: -122.4324
              }}
            />
          </MapView>
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
          <FAB
            color='#00ADB5'
            style={styles.fabMes}
            icon='message'
            onPress={() => this.props.navigation.navigate('Chatlist')}
          />
        </View>
      </>
    )
  }
}

export default Maps

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
  fabMes: {
    position: 'absolute',
    margin: 16,
    left: 0,
    bottom: 0,
    backgroundColor: 'white',
    color: '#00ADB5',
    borderRadius: 16,
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
