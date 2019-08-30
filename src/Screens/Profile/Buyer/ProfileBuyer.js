import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, AsyncStorage, StatusBar, ScrollView, AppState , FlatList} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Menu, { MenuItem } from 'react-native-material-menu';
import Spinner from 'react-native-loading-spinner-overlay'
import { DetailTransaksiPembeli } from '../../../Public/Redux/Action/Transaksi'
import { connect } from 'react-redux'

class ProfileBuyer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            foto: props.navigation.getParam('foto'),
            nama: props.navigation.getParam('nama'),
            email: props.navigation.getParam('email'),
            no_hp: props.navigation.getParam('no_hp'),
            username: props.navigation.getParam('username'),

        }
    }

    _menu = null;

    setMenuRef = ref => {
        this._menu = ref;
    };

    showMenu = () => {
        this._menu.show();
    };

    hideMenu = () => {
        this._menu.hide();
    };

    islogout() {
        AsyncStorage.clear()
        alert('Berhasil Keluar')
        this.props.navigation.navigate('Login')
    }

    componentWillMount = async () => {
        await this.getTransaksi()
    }

    getTransaksi = async () => {
        this.setState({
            spinner: true
        })
        const Username = await AsyncStorage.getItem('Username')
        await this.props.dispatch(DetailTransaksiPembeli(Username))
            .then((res) => {
                console.warn(res);
                this.setState({
                    spinner: false,
                    data: this.props.detailTransaksi
                })
            })
    }

    renderRow = ({ item }) => {
        // console.warn("item", item)
        return (
                <View style={{marginBottom: 10 }}>
                    <Text style={styles.menu}>Pedagang : {item.pedagang}</Text>
                    <Text style={styles.name}>Harga : Rp {item.total_harga}</Text>
                    <Text style={styles.phone}>Jumlah :{item.jumlah}</Text>
                </View>
        )
    }

    validation = () => {
        if (this.state.nama !== this.props.navigation.getParam('nama') || this.state.no_hp !== this.props.navigation.getParam('no_hp') || this.state.foto !== this.props.navigation.getParam('foto')) {
            this.setState({
                foto: this.props.navigation.getParam('foto'),
                nama: this.props.navigation.getParam('nama'),
                no_hp: this.props.navigation.getParam('no_hp'),
            })
        }
    }

    render() {
        this.validation()
        const { goBack } = this.props.navigation;
        const { foto, nama, email, no_hp, username } = this.state
        const data = { foto, nama, email, no_hp, username }

        return (
            <View>
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Loading...'}
                    textStyle={{ color: '#fff' }}
                />
                <StatusBar backgroundColor="#1abc9c" barStyle="dark-content" />
                <View style={styles.layout}>
                    <View style={{ flexDirection: 'row', width: '100%' }}>
                        <TouchableOpacity style={{ marginTop: 20, alignItems: 'flex-start', flex: 1 }}>
                            <Icon size={34} name={'md-arrow-back'} onPress={() => this.props.navigation.navigate('HomeBuy', data)} style={styles.icon} />
                        </TouchableOpacity>
                        <View style={{ marginTop: 20, alignItems: 'flex-end', flex: 1, height: '50%' }}>
                            <Menu
                                ref={this.setMenuRef}
                                button={<Icon size={34} onPress={this.showMenu} name={'md-more'} style={styles.icon} />}
                            >
                                <MenuItem onPress={() => this.props.navigation.navigate('EditProfileBuyer', data) && this.hideMenu()}>Edit</MenuItem>
                                <MenuItem onPress={() => this.islogout() && this.hideMenu()}>Logout</MenuItem>
                            </Menu>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: '5%' }}>
                        <Image style={styles.photo} source={{ uri: `${this.props.navigation.getParam('foto')}` }} />
                        <View style={styles.layText}>
                            <Text style={styles.nameUser}>{this.props.navigation.getParam('nama')}</Text>
                            <Text style={styles.email}>{email}</Text>
                            <Text style={styles.hp}>{this.props.navigation.getParam('no_hp')}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.layHistory}>

                    <Text style={styles.textHistory}>Riwayat Pembelian</Text>
                    <View style={{ height: '74%', paddingBottom: 20 }}>
                        {
                            console.warn("data ", this.props.detailTransaksi)
                        }
                        <FlatList
                            data={this.state.data}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={this.renderRow}
                        />
                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        detailTransaksi: state.transaksi.detailTransaksi
    }
}

export default connect(mapStateToProps)(ProfileBuyer)

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
        width: '100%',
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
        marginTop: '5%',
        marginHorizontal: '10%'
    },
    textHistory: {
        fontFamily: 'Montserrat-Bold',
        color: '#3e383e',
        textAlign: 'center',
        marginBottom: '3%',
        fontSize: 30
    },
    layMenu: {
        marginLeft: 20,
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