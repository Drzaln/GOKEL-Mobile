import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation'
import IntroSlider from '../Screens/Welcome/Welcome'
import Login from '../Screens/Login/Login'
import RegisterBuyer from '../Screens/Register/RegisterBuyer'
import HomeBuyer from '../Screens/Home/Buyer/Home'
import ChooseRole from '../Screens/Register/ChooseRole'
import ProfileBuyer from '../Screens/Profile/Buyer/ProfileBuyer'
import Payment from '../Screens/Payment/PaymentFInal'
import EditProfileUser from '../Screens/Profile/Buyer/EditProfileBuyer'

const AppNavigator = createStackNavigator({
    HomeBuyer: {
        screen: HomeBuyer,
        navigationOptions: {
            header: null
        }
    },
    ProfileBuyer: {
        screen: ProfileBuyer,
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

export default createAppContainer(
  createSwitchNavigator(
    {
        // SplashScreen: SplashScreen,
        IntroSlider: IntroSlider,
        Login: Login,
        ChooseRole: ChooseRole,
        RegisterBuyer: RegisterBuyer,
        Home: AppNavigator
    },
    {
      initialRouteName: 'IntroSlider'
    }
  )
)
