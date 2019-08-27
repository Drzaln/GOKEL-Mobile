import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'

export default class Profile extends Component {
    render() {
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
            <View style={styles.container}>
                <View style={styles.layPhoto}>
                    <Image style={styles.photo} source={{uri: 'https://randomuser.me/api/portraits/men/76.jpg'}} />
                    <View style={styles.layText}>
                        <Text style={styles.nameUser}>Name of user</Text>
                        <Text style={styles.role}>name of Role</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.butEdit} onPress={()=> this.props.navigation.navigate('EditProfileUser')}>
                    <Text style={styles.textEdit}>Edit Profile</Text>
                </TouchableOpacity>
                <View style={styles.layHistory}>
                    <Text style={styles.textHistory}>History</Text>
                    <View style={styles.layMenu}>
                        <Text style={styles.number}>1</Text>
                        <View style={{marginLeft:20}}>
                            <Text style={styles.menu}>Name of Menu</Text>
                            <Text style={styles.price}>Rp. 9000</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20
    },
    layPhoto: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        width: '100%'
    },
    photo: {
        width: 90,
        height: 90,
        borderRadius: 10
    },
    layText: {
        marginLeft: 20,
        width: '60%'
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
        backgroundColor:'#dcdcdc',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 15,
        marginTop: 20
    },
    textEdit:{
        fontFamily: 'Montserrat-Bold',
        color: '#3e383e',
        fontSize: 15
    },
    layHistory:{
        marginTop: 20
    },
    textHistory:{
        fontFamily: 'Montserrat-Bold',
        color: '#3e383e',
        fontSize: 20
    },
    layMenu:{
        marginLeft: 20,
        justifyContent:'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 10
    },
    number:{
        fontFamily: 'Montserrat-Bold',
        fontSize: 16
    },
    menu:{
        fontSize: 16,
        fontFamily: 'Montserrat-Bold',
    }
})