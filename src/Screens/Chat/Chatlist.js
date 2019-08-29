import React, { Component } from 'react'
import { TouchableOpacity, FlatList, StyleSheet, View, Text, StatusBar, AsyncStorage } from 'react-native'
import firebase from 'react-native-firebase'

export default class Chatlist extends Component {
    constructor() {
        super()
        this.state = {
            data: [],
            name: ''
        }
        AsyncStorage.getItem('Username', (err, result) => {
            if (result) {
              this.setState({ name: result })
            }
        })
    }

    componentWillMount () {
      this.getFirebase()
    }

    getFirebase (){
        let dbRef = firebase.database().ref('users/pembeli' );
        dbRef.on('child_added', (val) => {
            let user = val.val();
            console.warn('person',user)
            if ( user !== '') {
                this.setState((prevState) => {
                    return {
                        data: [...prevState.data, user]
                    }
                })
            }
        })
    }

    _renderItem =({item}) =>{
        console.warn("item",item)
        return( 
            <TouchableOpacity
            style={styles.contact}>
            <View style={{ width: '50%', marginLeft: 10 }}>
                <Text style={styles.name}>{item.username}</Text>
            </View>
        </TouchableOpacity>
        )
    }
    render(){
        console.warn("data", this.state.data)
        return(
            <View style={styles.container}>
            <StatusBar backgroundColor="white" barStyle="dark-content" />
            <View style={styles.header}>
                <Text style={styles.logoText}>Chat List</Text>
            </View>
            <FlatList
                data={this.state.data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={this._renderItem}
                style={styles.flatlist}
            />
        </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    logo: {
        rotation: -90,
        marginTop: -85,
        marginLeft: -50,
        scaleX: 0.2,
        scaleY: 0.2
    },
    header: {
        height: 65,
        backgroundColor: 'white',
        elevation: 2,
        alignItems: 'center',
        width: '100%'
    },
    logoText: {
        fontWeight: '900',
        marginTop: 15,
        fontSize: 28,
        alignItems: 'center',
        color: '#333'
    },
    flatlist: {
        paddingVertical: 10,
    },
    contact: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 0.4,
        borderBottomColor: '#aaa',
        paddingVertical: 10
    },
    image: {
        height: 60,
        width: 60,
        borderRadius: 50
    },
    name: {
        fontSize: 20,
        fontWeight: '900',
        width: '50%',
        color: '#666'
    },
    indicatorOn: {
        color: 'green',
        marginRight: 5
    },
    indicatorOff: {
        color: 'grey',
        marginRight: 5
    }
});
