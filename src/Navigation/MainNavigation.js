import { createStackNavigator, createAppContainer, createSwitchNavigator } from "react-navigation";
import IntroSlider from '../Screens/Welcome/Welcome'
import Login from '../Screens/Login/Login'
// import Register from '../Screens/Register/Register'
import Register from '../Screens/Register/MerchantRegistration'
import HomeBuyer from '../Screens/Home/Buyer/Home'
// import Profile from '../Screens/Profile/Buyer/ProfileBuyer'
import Profile from '../Screens/Profile/Merchant/ProfileMerchant'
import EditPrice from '../Screens/Profile/Merchant/EditPriceStock'
import Payment from '../Screens/Payment/PaymentFInal'
import EditProfileUser from '../Screens/Profile/Buyer/EditProfileBuyer'

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
    EditProfileUser: {
        screen: EditProfileUser
    },
    EditPrice: {
        screen: EditPrice
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
        Home: AppNavigator,
        Profile: Profile,
        EditProfileUser: EditProfileUser
    },
    {
        initialRouteName: 'IntroSlider',
    }
));
