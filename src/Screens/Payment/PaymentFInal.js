import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'

export default class Payment extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={{height: '85%', alignItems: 'center'}}>
                <Text style={styles.title}>Payment Detail</Text>
                <View style={styles.layPayment}>
                    <Text style={styles.number}>1</Text>
                    <Image style={styles.image} source={require('../../../asset/penjual.png')} />
                    <Text style={styles.menu}>Name of Menu sdsdddwdwffwf</Text>
                    <Text style={styles.price}>Rp. 9000</Text>
                </View>
                <View style={styles.layPayment}>
                    <Text style={styles.number}>1</Text>
                    <Image style={styles.image} ssource={require('../../../asset/penjual.png')} />
                    <Text style={styles.menu}>Name of Menu sdsdddwdwffwf</Text>
                    <Text style={styles.price}>Rp. 9000</Text>
                </View>
                <View style={styles.layPayment}>
                    <Text style={styles.number}>1</Text>
                    <Image style={styles.image} source={require('../../../asset/pembeli.png')}/>
                    <Text style={styles.menu}>Name of Menu sdsdddwdwffwf</Text>
                    <Text style={styles.price}>Rp. 9000</Text>
                </View>
                </View>
                <View style={styles.Final}>
                    <Text style={styles.total}>Total</Text>
                    <Text style={styles.price}>Rp. 27.000</Text>
                </View>
                <View style={styles.Final}>
                <TouchableOpacity style={styles.butFinal}>
                    <Text style={styles.textBayar}>Bayar</Text>
                </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    title: {
        marginTop: 20,
        fontFamily: 'Montserrat-Bold',
        fontSize: 24,
        marginBottom: 30
    },
    layPayment: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomWidth: 0.4,
        padding: 10,
        paddingHorizontal: 20,
        width: '85%',
        borderBottomColor: '#bbb'
    },
    number: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 20
    },
    image: {
        width: 40,
        height: 40,
        marginLeft: 10,
        marginRight: 10
    },
    number: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 16
    },
    menu: {
        fontSize: 15,
        fontFamily: 'Montserrat-Bold',
        width: '60%'
    },
    price: {
        width: '20%'
    },
    Final: {
        flexDirection: 'row',
        borderWidth: 0.6,
        padding: 10,
        alignItems: 'center',
    },
    total: {
        width: '60%',
        fontFamily: 'Montserrat-Bold',
        fontSize: 20,
        marginLeft: 40,
    },
    butFinal: {
        flexDirection: 'row',
        borderWidth: 0.6,
        padding: 10,
        alignItems: 'center',
        backgroundColor: 'green'
    },
    textBayar: {
        width: '60%',
        fontFamily: 'Montserrat-Bold',
        fontSize: 20,
        marginLeft: 40,
    }
})