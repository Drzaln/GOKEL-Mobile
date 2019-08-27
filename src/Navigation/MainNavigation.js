import { createStackNavigator, createAppContainer, createSwitchNavigator } from "react-navigation";
import IntroSlider from '../Screens/Welcome/Welcome'
import Login from '../Screens/Login/Login'
import Register from '../Screens/Register/RegisterBuyer'
import HomeBuyer from '../Screens/Home/Buyer/Home'
import Profile from '../Screens/Profile/Buyer/ProfileBuyer'
import Payment from '../Screens/Payment/PaymentFInal'

const AppNavigator = createStackNavigator({
    HomeBuyer: {
        screen: HomeBuyer,
        navigationOptions: {
            header: null
        }
    },
    Profile: {
        screen: Profile,
    },
    Payment: {
        screen: Payment,
        navigationOptions: {
            header: null
        }
    },
});

export default createAppContainer(createSwitchNavigator(
    {
        // SplashScreen: SplashScreen,
        IntroSlider: IntroSlider,
        Login: Login,
        Register: Register,
        Home: AppNavigator
    },
    {
        initialRouteName: 'Register',
    }
));
