import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native'

export default class Profile extends Component {
    state = {
        harga: 'Rp 5.000.000',
        stock: '2.000.002',
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.layPhoto}>
                    <TouchableOpacity onPress={() => alert('upload foto')}>

                        <Image style={{ width: 120, height: 75 }} source={{ uri: 'https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fsullezuka.files.wordpress.com%2F2012%2F01%2Fsiomay-bandung-2.png&f=1' }} />
                    </TouchableOpacity>
                    <Text style={styles.nameUser}>
                        Siomay Kang Ucay
                    </Text>
                </View>
                <View style={styles.layText}>
                    <Text style={{fontFamily: 'Montserrat-Bold'}}>
                        Harga
                    </Text>
                    <TextInput style={styles.input} placeholder='harga' onChangeText={val => this.setState({ 'harga': val })} value={this.state.harga} />
                    <Text style={{fontFamily: 'Montserrat-Bold'}}>
                        Stock Tersedia
                    </Text>
                    <TextInput style={styles.input} placeholder='stock' onChangeText={val => this.setState({ 'stock': val })} value={this.state.stock} />



                </View>
                <TouchableOpacity style={styles.butEdit} onPress={() => alert('ubah stock dan harga')}>
                    <Text style={styles.textEdit}>Submit Changes</Text>
                </TouchableOpacity>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        padding: 10,
        // borderWidth: 1,
        borderColor: '#ccc',
        width: '85%',
        marginBottom: 10,
        marginLeft: 5,
        borderRadius: 5,
        borderBottomColor: '#33DDFF',
        borderBottomWidth: 1
    },
    container: {
        marginHorizontal: 20,
    },
    layPhoto: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        width: '100%',
    },
    photo: {
        width: 90,
        height: 90,
        borderRadius: 10
    },
    layText: {
        marginLeft: 20,
        width: '100%',
        paddingTop: 30
    },
    nameUser: {
        fontSize: 24,
        color: '#444',
        fontFamily: 'Montserrat-Bold'
    },
    role: {
        fontSize: 18,
        fontFamily: 'Montserrat-Medium'
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
    layHistory: {
        marginTop: 20
    },
    textHistory: {
        fontFamily: 'Montserrat-Bold',
        color: '#3e383e',
        fontSize: 20
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
        fontFamily: 'Montserrat-Bold',
    }
})