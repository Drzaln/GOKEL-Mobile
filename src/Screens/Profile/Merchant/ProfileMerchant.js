import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native'

export default class Profile extends Component {
    render() {
        const jualan = [
            {
                nama_makanan: 'Siomay Kang Ucay',
                bacol: '#003D40',
                gambar:
                    'https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fsullezuka.files.wordpress.com%2F2012%2F01%2Fsiomay-bandung-2.png&f=1'
            }
        ]
        return (
            <View style={styles.container}>
                <View style={styles.layPhoto}>
                    <TouchableOpacity onPress={() => alert('upload foto')}>
                        <Image style={styles.photo} source={{ uri: 'https://randomuser.me/api/portraits/men/76.jpg' }} />
                    </TouchableOpacity>
                    <View style={styles.layText}>
                        <Text style={styles.nameUser}>Name of user</Text>
                        <Text style={styles.role}>name of Role</Text>
                    </View>
                </View>


                <Text
                    style={{
                        marginLeft: 10,
                        marginTop: 10,
                        fontFamily: 'Montserrat',
                        color: '#00ACB6',
                        fontSize: 14
                    }}>
                    Daganganmu :
                </Text>
                <View style={{
                    flexDirection: 'row'
                }}>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        data={jualan}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => this.props.navigation.navigate('EditPrice')}
                            >
                                <View
                                    style={{
                                        width: 200,
                                        height: 200,
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
                                            flexDirection: 'column',
                                            // justifyContent: 'space-between'
                                        }}
                                    >
                                        <View style={{
                                            // justifyContent: 'flex-end',
                                            alignSelf: 'flex-end'
                                        }}>
                                            <Image
                                                style={{ width: 120, height: 75, }}
                                                source={{ uri: item.gambar }}
                                            />
                                        </View>
                                        <View >
                                            <Text
                                                style={{
                                                    fontFamily: 'Montserrat-Bold',
                                                    color: '#FFC300',
                                                    fontSize: 16
                                                }}
                                            >
                                                {item.nama_makanan}
                                            </Text>
                                            <Text style={{
                                                fontFamily: 'Montserrat-Bold',
                                                color: '#00ACB6',
                                                fontSize: 12
                                            }}>
                                                30 porsi
                                        </Text>
                                            <Text style={{
                                                fontFamily: 'Montserrat-Bold',
                                                color: '#007980',
                                                fontSize: 15
                                            }}>
                                                Rp. 5000
                                        </Text>
                                        </View>

                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                    />

                </View>
                <TouchableOpacity style={styles.butEdit} onPress={() => this.props.navigation.navigate('EditProfileUser')}>
                    <Text style={styles.textEdit}>Edit Profile</Text>
                </TouchableOpacity>
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
        width: '100%',
        paddingBottom: 3,
        borderBottomWidth: 1
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