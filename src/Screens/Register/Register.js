import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    TextInput,
    StatusBar,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


export default class Register extends Component {
    render(){
    return (
        <View style={styles.container}>
            <View style={styles.layRegister}>
                <Text style={styles.Register}>Sign Up</Text>
                <View style={styles.layInput}>
                    <View style={{ width: '80%' }}>
                        <View style={styles.flexRow}>
                            {/* <Icon size={24} name={'md-person'} style={styles.icon} /> */}
                            <TextInput
                                style={styles.input}
                                placeholder='Userame'
                                returnKeyType={'next'}
                                blurOnSubmit={false}
                                onSubmitEditing={() => {
                                    this.secondTextInput.focus()
                                }} />
                        </View>
                        <View style={styles.flexRow}>
                            {/* <Icon size={24} name={'md-lock'} style={styles.icon} /> */}
                            <TextInput
                                style={styles.input}
                                placeholder='Email'
                                ref={input => {
                                    this.secondTextInput = input
                                }}
                                onSubmitEditing={() => {
                                    this.secondTextInput.focus()
                                }} />
                        </View>
                        <View style={styles.flexRow}>
                            {/* <Icon size={24} name={'md-lock'} style={styles.icon} /> */}
                            <TextInput
                                style={styles.input}
                                placeholder='Password'
                                secureTextEntry={true}
                                ref={input => {
                                    this.secondTextInput = input
                                }} />
                        </View>
                        
                    </View>
                </View>
                <View style={{ alignItems: 'flex-end', marginRight: '10%', marginTop: 30 }}>
                    <TouchableOpacity style={styles.butSignUp} onPress={() => alert('Sudah di pencet')}>
                        <Text style={styles.textSignUp}>Sign Up</Text>
                        <Icon size={20} name={'md-arrow-forward'} style={styles.icon} />
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <TouchableOpacity onPress={()=> this.props.navigation.navigate('Login')}>
                <Text style={styles.Text}>
                    Sudah punya akun?
             <Text style={{ fontWeight: 'bold', color: '#00C7D1' }}> Login disini</Text></Text>
             </TouchableOpacity>
            </View>
        </View>
    )
}
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    },
    layRegister: {
        height: '50%',
        marginTop: '40%',
        justifyContent: 'center',
    },
    Register: {
        fontFamily: 'Montserrat',
        fontWeight: 'bold',
        textAlign: 'left',
        fontSize: 32,
        marginBottom: 30,
        marginLeft: 40
    },
    layInput: {
        width: '100%',
        marginHorizontal: '10%'
    },
    icon: {
        marginTop: 10,
        marginLeft: 10,
        color: 'white'
    },
    input: {
        paddingLeft: 10
    },
    flexRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#00C7D1'
    },
    butSignUp: {
        backgroundColor: '#00C7D1',
        paddingHorizontal: 10,
        width: 'auto',
        borderRadius: 5,
        width: 100,
        flexDirection: 'row',
        paddingBottom: 10,
        elevation: 2
    },
    textSignUp: {
        fontSize: 18,
        fontWeight: '500',
        color: 'white',
        fontFamily: 'Montserrat',
        marginTop: 10
    },
    Text: {
        fontWeight: '500',
        fontSize: 16,
        textAlign: 'right',
        marginRight: '10%',
        marginTop: 100

    }
});
