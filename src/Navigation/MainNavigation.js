import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation'
import IntroSlider from '../Screens/Welcome/Welcome'
import Login from '../Screens/Login/Login'
import RegisterBuyer from '../Screens/Register/RegisterBuyer'
import HomeBuyer from '../Screens/Home/Buyer/Home'
import HomeSeller from '../Screens/Home/Merchant/Home'
import ChooseRole from '../Screens/Register/ChooseRole'
import ProfileBuyer from '../Screens/Profile/Buyer/ProfileBuyer'
import Payment from '../Screens/Payment/PaymentFInal'
import EditProfileUser from '../Screens/Profile/Buyer/EditProfileBuyer'
import EditPrice from "../Screens/Profile/Merchant/EditPriceStock";

const AppNavigator = createStackNavigator({
    HomeBuyer: {
        screen: HomeBuyer,
        navigationOptions: {
            header: null
        }
    },
    HomeSeller: {
        screen: HomeSeller,
        navigationOptions: {
            header: null
        }
    },
    ProfileBuyer: {
        screen: ProfileBuyer,
        navigationOptions:{
            header: null
        }
    },
    EditProfileUser: {
        screen: EditProfileUser,
        navigationOptions:{
            title: 'Edit Profile'
        }
    },
    EditPrice: {
        screen: EditPrice,
        navigationOptions:{
            title: 'Edit Harga'
        }
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
        Home: AppNavigator,
        HomeSeller: HomeSeller
    },
    {
      initialRouteName: 'IntroSlider'
    }
  )
)

