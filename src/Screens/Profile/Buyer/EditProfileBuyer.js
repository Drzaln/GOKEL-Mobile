import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native'

export default class Profile extends Component {
    state = {
        name: 'name',
        phone: 'phone ',
        address: ''
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.layPhoto}>
                    <TouchableOpacity onPress={() => alert('upload foto')}>
                        <Image style={styles.photo} source={{ uri: 'https://randomuser.me/api/portraits/men/76.jpg' }} />
                    </TouchableOpacity>
                </View>
                <View style={styles.layText}>
                    <TextInput style={styles.input} placeholder='name' onChangeText={val => this.setState({ 'name': val })} value={this.state.name} />
                    <TextInput style={styles.input} placeholder='phone number' onChangeText={val => this.setState({ 'phone': val })} value={this.state.phone} />
                    <TextInput style={styles.input} placeholder='address' onChangeText={val => this.setState({ 'address': val })} value={this.state.address} />

                </View>
                <TouchableOpacity style={styles.butEdit} onPress={() => alert('ubah profile')}>
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
        marginHorizontal: 20
    },
    layPhoto: {
        flexDirection: 'row',
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