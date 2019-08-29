import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation'
import IntroSlider from '../Screens/Welcome/Welcome'
import Login from '../Screens/Login/Login'
import RegisterBuyer from '../Screens/Register/RegisterBuyer'
import RegisterSeller from '../Screens/Register/MerchantRegistration'
import HomeBuy from '../Screens/Home/Buyer/Home'
import HomeSell from '../Screens/Home/Merchant/Home'
import ChooseRole from '../Screens/Register/ChooseRole'
import ProfileBuyer from '../Screens/Profile/Buyer/ProfileBuyer'
import ProfileSeller from '../Screens/Profile/Merchant/EditProfileMerchant'
import Payment from '../Screens/Payment/PaymentFInal'
import EditProfileUser from '../Screens/Profile/Buyer/EditProfileBuyer'
import EditPrice from "../Screens/Profile/Merchant/EditPriceStock";

const BuyerNavigator = createStackNavigator({
    HomeBuy: {
        screen: HomeBuy,
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
    Payment: {
        screen: Payment,
        navigationOptions: {
            header: null
        }
    },
});

const SellerNavigator = createStackNavigator({
    HomeSell: {
        screen: HomeSell,
        navigationOptions: {
            header: null
        }
    },
    EditPrice: {
        screen: EditPrice,
        navigationOptions:{
            title: 'Edit Harga'
        }
    },
    ProfileSeller: {
        screen: ProfileSeller,
        navigationOptions:{
            header: null
        }
    },
    
})

export default createAppContainer(
  createSwitchNavigator(
    {
        // SplashScreen: SplashScreen,
        IntroSlider: IntroSlider,                               
        Login: Login,
        ChooseRole: ChooseRole,
        RegisterBuyer: RegisterBuyer,
        RegisterSeller: RegisterSeller,
        HomeBuyer: BuyerNavigator,
        HomeSeller: SellerNavigator
    },
    {
      initialRouteName: 'IntroSlider'
    }
  )
)

