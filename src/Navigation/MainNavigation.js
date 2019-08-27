import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation'
import IntroSlider from '../Screens/Welcome/Welcome'
import Login from '../Screens/Login/Login'
import Register from '../Screens/Register/Register'
import HomeBuyer from '../Screens/Home/Buyer/Home'
import HomeMerchant from '../Screens/Home/Merchant/Home'
import Profile from '../Screens/Profile/Buyer/ProfileBuyer'
import Payment from '../Screens/Payment/PaymentFInal'
import ChooseRoleScreen from '../Screens/Register/ChooseRole'

const AppNavigator = createStackNavigator({
  HomeBuyer: {
    screen: HomeBuyer,
    navigationOptions: {
      header: null
    }
  },
  Profile: {
    screen: Profile
  },
  Payment: {
    screen: Payment,
    navigationOptions: {
      header: null
    }
  }
})

export default createAppContainer(
  createSwitchNavigator(
    {
      // SplashScreen: SplashScreen,
      IntroSlider: IntroSlider,
      Login: Login,
      ChooseRoleScreen: ChooseRoleScreen,
      Register: Register,
      Home: AppNavigator
    },
    {
      initialRouteName: 'IntroSlider'
    }
  )
)
