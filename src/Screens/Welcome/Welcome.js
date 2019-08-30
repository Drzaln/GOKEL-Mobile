import React from 'react';
import { StyleSheet, View, Text, Image, StatusBar, AsyncStorage } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

const slides = [
    {
        key: 'somethun',
        title: 'Title 1',
        text: 'Description.\nSay something cool',
        image: require('../../../asset/pembeli.png'),
        backgroundColor: '#59b2ab',
    },
    {
        key: 'somethun-dos',
        title: 'Title 2',
        text: 'Other cool stuff',
        image: require('../../../asset/penjual.png'),
        backgroundColor: '#febe29',
    },
    {
        key: 'somethun1',
        title: 'Rocket guy',
        text: 'I\'m already out of descriptions\nLorem ipsum bla bla bla',
        image: require('../../../asset/pembeli.png'),
        backgroundColor: '#22bcb5',
    }
];

export default class Slider extends React.Component {
    constructor() {
        super()
        this.state = {
            showRealApp: false,
            role: ''
        }
        AsyncStorage.getItem('Role', (error, result) => {
            if (result) {
                this.setState({
                    role: result
                })
            }
        })
    }
    
    componentWillMount() {
        AsyncStorage.getItem('Role', (error, result) => {
            console.warn("rolenya", result)
            if (result === 'pembeli') {
                this.props.navigation.navigate('HomeBuyer')
            } else if(result === 'pedagang') {
                this.props.navigation.navigate('HomeSeller')
            }
        })
      }

    _renderItem = ({ item }) => {
        return (
            <View style={styles.container} >
                <Text style={styles.title}>{item.title}</Text>
                <Image style={styles.image} source={item.image} />
                <Text style={styles.text}>{item.text}</Text>
            </View>
        );
    }
    _onDone = () => {
        // User finished the introduction. Show real app through
        // navigation or simply by controlling state
        this.setState({ showRealApp: true });
    }
    render() {
        if (this.state.showRealApp) {
            return this.props.navigation.navigate('Login');
        } else {
            return <AppIntroSlider renderItem={this._renderItem} slides={slides} onDone={this._onDone} showSkipButton={true}/>;
        }
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#00C7D1'
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 20
    },
    image: {
        width: 200,
        height: 200
    },
    text:{
        fontSize: 20,
        marginTop: 20
    }
})