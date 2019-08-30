import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native'
import ImagePicker from 'react-native-image-picker'
import { connect } from 'react-redux'
import { updateUserPedagang } from '../../../Public/Redux/Action/User'
import { withNavigation } from 'react-navigation'

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nama: props.navigation.getParam('nama'),
            no_hp: props.navigation.getParam('no_hp'),
            foto: props.navigation.getParam('foto'),
            fotobaru: null,
            username: props.navigation.getParam('username'),
            email: props.navigation.getParam('email'),
        }
    }

    handleChoosePhoto = () => {
        const options = {
            noData: true
        }
        ImagePicker.showImagePicker(options, response => {
            console.warn("response", response.uri);
            if (response.uri) {
                this.setState({ fotobaru: response })
            }
        })
        // console.warn(this.state.fotobaru)
    }

    editProfile = () => {
        if (this.state.fotobaru) {
            dataFile = new FormData(),
                dataFile.append('foto',
                    {
                        uri: this.state.fotobaru.uri,
                        type: 'image/jpg',
                        name: 'terserah'
                    }
                ),
                dataFile.append('email', this.state.email),
                dataFile.append('username', this.state.username),
                dataFile.append('nama', this.state.nama),
                dataFile.append('no', this.state.no_hp)
            let item = {
                nama: this.state.nama,
                no_hp: this.state.no_hp,
                foto: this.state.fotobaru.uri,
                username: this.state.username,
                email: this.state.email,

            }

            const username = this.state.username
            this.props.dispatch(updateUserPedagang(username, dataFile))
            this.props.navigation.navigate('ProfileSeller', item)

        } else {
            dataFile = new FormData(),
                dataFile.append('foto',
                    {
                        uri: this.state.foto,
                        type: 'image/jpg',
                        name: 'terserah'
                    }
                ),
                dataFile.append('email', this.state.email),
                dataFile.append('username', this.state.username),
                dataFile.append('nama', this.state.nama),
                dataFile.append('no', this.state.no_hp)
            let item = {
                nama: this.state.nama,
                no_hp: this.state.no_hp,
                foto: this.state.foto,
                username: this.state.username,
                email: this.state.email,

            }

            const username = this.state.username
            this.props.dispatch(updateUserPedagang(username, dataFile))
            this.props.navigation.navigate('ProfileSeller', item)

            // this.setState({ flag: 'true' })
        }
    }

    render() {
        console.warn(this.state.foto)
        const { foto, nama, no_hp, fotobaru } = this.state
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.handleChoosePhoto}>
                    <View style={styles.layPhoto}>
                    {fotobaru && (<Image style={styles.photo} source={{ uri: fotobaru.uri }} />) ||
                            foto && (<Image style={styles.photo} source={{ uri: foto }} />)}
                    </View>
                </TouchableOpacity>
                <View style={styles.layText}>
                    <TextInput style={styles.input} placeholder={nama} onChangeText={val => this.setState({ 'nama': val })} value={this.state.nama} />
                    <TextInput style={styles.input} placeholder={no_hp} onChangeText={val => this.setState({ 'no_hp': val })} value={this.state.no_hp} />



                </View>
                <TouchableOpacity style={styles.butEdit} onPress={this.editProfile}>
                    <Text style={styles.textEdit}>Submit Changes</Text>
                </TouchableOpacity>

            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.dataPedagang
    }
}

export default connect(mapStateToProps)(withNavigation(Profile))

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