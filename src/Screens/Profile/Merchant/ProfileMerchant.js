import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    AsyncStorage,
    StatusBar,
    ScrollView
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Menu, { MenuItem } from 'react-native-material-menu'
import { DetailTransaksiPenjual, UpdateKonfirmasi } from '../../../Public/Redux/Action/Transaksi'
import { connect } from 'react-redux'

class ProfileMerchant extends Component {
    constructor(props) {
        super(props)
        this.state = {
            foto: props.navigation.getParam('foto'),
            nama: props.navigation.getParam('nama'),
            email: props.navigation.getParam('email'),
            no_hp: props.navigation.getParam('no_hp'),
            idCat: props.navigation.getParam('id_category'),
            idJajan: props.navigation.getParam('id_jajan'),
            stock: props.navigation.getParam('stok'),
            harga: props.navigation.getParam('harga'),
            username: this.props.navigation.getParam('username'),
            data:[]
        }
        
    }

    // componentDidMount()

    validation = () => {
        if (this.state.nama !== this.props.navigation.getParam('nama') || this.state.no_hp !== this.props.navigation.getParam('no_hp') || this.state.foto !== this.props.navigation.getParam('foto')) {
            this.setState({
                foto: this.props.navigation.getParam('foto'),
                nama: this.props.navigation.getParam('nama'),
                no_hp: this.props.navigation.getParam('no_hp'),
            })
        }
    }

    _menu = null

    setMenuRef = ref => {
        this._menu = ref
    }

    showMenu = () => {
        this._menu.show()
    }

    hideMenu = () => {
        this._menu.hide()
    }

    islogout() {
        AsyncStorage.clear()
        alert('Berhasil Keluar')
        this.props.navigation.navigate('Login')
    }

    componentDidMount = async () => {
        const Username = await AsyncStorage.getItem('Username')
        await this.props.dispatch(DetailTransaksiPenjual(Username)).then(res => {
            console.warn(res)
            // console.warn('transaksi', this.props.detailTransaksi)
            this.setState({data:this.props.detailTransaksi})
        })
    }

    handleConfirm = async (pembeli,harga) => {
        // console.warn('pembeli ',this.state.username)
        const username = await AsyncStorage.getItem('Username')
        const saldo = Number(this.props.navigation.getParam('saldo'))
        let hasil = saldo - (Number(harga) * 0.1)    
        console.warn('saldo ',hasil )    
        const data  = {
            saldo: hasil,
            username_pembeli:pembeli,
            username_pedagang :username
        }
        this.props.dispatch(UpdateKonfirmasi(data))
        .then(data => {
            console.warn(data);
            
        })
        .catch(err => {
            console.warn(err);
            
        })
    }

    render() {
        console.warn('state ',this.state.nama)
        console.warn('props ',this.props.navigation.getParam('nama'))
        this.validation()

        const { goBack } = this.props.navigation;
        const { foto, nama, email, no_hp, username } = this.state
        let data = { foto, nama, email, no_hp, username }
        return (
            <View>
                <StatusBar backgroundColor='#1abc9c' barStyle='dark-content' />
                <View style={styles.layout}>
                    <View style={{ flexDirection: 'row', width: '100%' }}>
                        <TouchableOpacity style={{ marginTop: 20, alignItems: 'flex-start', flex: 1 }}>
                            <Icon size={34} name={'md-arrow-back'} onPress={() => this.props.navigation.navigate('HomeSell', data)} style={styles.icon} />
                        </TouchableOpacity>
                        <View style={{ marginTop: 20, alignItems: 'flex-end', flex: 1 }}>
                            <Menu
                                ref={this.setMenuRef}
                                button={
                                    <Icon
                                        size={34}
                                        onPress={this.showMenu}
                                        name={'md-more'}
                                        style={styles.icon}
                                    />
                                }
                            >
                                <MenuItem
                                    onPress={() =>
                                        this.props.navigation.navigate('EditProfileSeller', data) &&
                                        this.hideMenu()
                                    }
                                >
                                    Edit
                </MenuItem>
                                <MenuItem onPress={() => this.islogout() && this.hideMenu()}>
                                    Logout
                </MenuItem>
                            </Menu>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 15 }}>
                        <Image style={styles.photo} source={{ uri: `${foto}` }} />
                        <View style={styles.layText}>
                            <Text style={styles.nameUser}>{nama}</Text>
                            <Text style={styles.email}>{email}</Text>
                            <Text style={styles.hp}>{no_hp}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.layHistory}>
                    <Text style={styles.textHistory}>Riwayat Penjualan</Text>
                    <View style={{ height: '74%', width: '100%', paddingBottom: 20 }}>
                        <ScrollView >
                            {this.state.data.map(item => {
                                return (
                                    <View style={styles.layMenu}>
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                width: '100%'
                                            }}
                                        >
                                            <View style={{ marginLeft: 5, marginRight: -40}}>
                                                <Text style={styles.menu}>
                                                    Nama Pembeli: {item.pembeli}
                                                </Text>
                                                <Text style={styles.price}>
                                                    Total Harga: {item.total_harga}
                                                </Text>
                                            </View>
                                            <View style={{ justifyContent: 'center' }}>
                                                {Number(item.status) === 0  ?<TouchableOpacity onPress={()=>{
                                                    this.handleConfirm(item.pembeli,item.total_harga)
                                                }}>
                                                    <View style={styles.buttonKonf}>
                                                        <Text style={styles.textKonf}>Konfirmasi</Text>
                                                    </View>
                                                </TouchableOpacity>:
                                                <View style={styles.buttonKonfMati}>
                                                    <Text style={styles.textKonf}>Konfirmasi</Text>
                                                </View>

                                                }
                                                
                                                
                                            </View>
                                        </View>
                                    </View>
                                )
                            })}
                        </ScrollView>
                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        detailTransaksi: state.transaksi.detailTransaksi,
        transaksi : state.transaksi
    }
}

export default connect(mapStateToProps)(ProfileMerchant)

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 40
    },
    layout: {
        width: '100%',
        height: '28%',
        backgroundColor: '#1abc9c',
        paddingHorizontal: '10%',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    layPhoto: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        width: '100%'
    },
    photo: {
        backgroundColor: 'white',
        width: 100,
        height: 130,
        borderRadius: 10,
        elevation: 10
    },
    layText: {
        marginTop: 10,
        marginLeft: 20,
        width: '60%'
    },
    nameUser: {
        fontSize: 24,
        color: '#3e383e',
        fontFamily: 'Montserrat-Bold'
    },
    email: {
        fontSize: 16,
        fontFamily: 'Montserrat-Medium',
        color: '#333'
    },
    hp: {
        fontSize: 16,
        fontFamily: 'Montserrat-Medium',
        color: '#333'
    },
    role: {
        fontSize: 16,
        fontFamily: 'Montserrat-Medium',
        color: '#333'
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
    butLogout: {
        backgroundColor: '#eb2323',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 15,
        marginTop: 10
    },
    textLogout: {
        fontFamily: 'Montserrat-Bold',
        color: 'white',
        fontSize: 15
    },
    layHistory: {
        marginTop: 50,
        marginHorizontal: '10%'
    },
    textHistory: {
        fontFamily: 'Montserrat-Bold',
        color: '#3e383e',
        fontSize: 24
    },
    layMenu: {
        width: '100%',
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
        fontFamily: 'Montserrat-Bold'
    },
    buttonKonf: {
        width: '120%',
        height: 40,
        marginLeft: 16,
        borderRadius: 16,
        marginLeft: -7,
        backgroundColor: '#1abc9c',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonKonfMati: {
        width: '120%',
        height: 40,
        marginLeft: 16,
        marginLeft: -7,
        borderRadius: 16,
        backgroundColor: 'grey',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textKonf: {
        fontFamily: 'Montserrat-Medium',
        color: 'white'
    }
})
