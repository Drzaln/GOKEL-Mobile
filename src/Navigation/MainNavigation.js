import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation'
import IntroSlider from '../Screens/Welcome/Welcome'
import Login from '../Screens/Login/Login'
import ChooseRole from '../Screens/Register/ChooseRole'
import Chat from '../Screens/Chat/Chat'
import Chatlist from '../Screens/Chat/Chatlist'

import RegisterBuyer from '../Screens/Register/RegisterBuyer'
import HomeBuy from '../Screens/Home/Buyer/Home'
import ProfileBuyer from '../Screens/Profile/Buyer/ProfileBuyer'
import EditProfileBuyer from '../Screens/Profile/Buyer/EditProfileBuyer'
import MapBuyer from '../Screens/Home/Buyer/Maps'

import RegisterSeller from '../Screens/Register/MerchantRegistration'
import HomeSell from '../Screens/Home/Merchant/Home'
import ChatSell from '../Screens/Chat/ChatSeller'
import ProfileSeller from '../Screens/Profile/Merchant/ProfileMerchant'
import EditProfileSeller from '../Screens/Profile/Merchant/EditProfileMerchant'
import EditPrice from "../Screens/Profile/Merchant/EditPriceStock";
import MapSeller from '../Screens/Home/Merchant/Maps'

import Payment from '../Screens/Payment/PaymentMethod'


const BuyerNavigator = createStackNavigator({
    HomeBuy: {
        screen: HomeBuy,
        navigationOptions: {
            header: null
        }
    },
    MapBuyer:{
        screen: MapBuyer,
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
    EditProfileBuyer: {
        screen: EditProfileBuyer,
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
    MapSeller:{
        screen: MapSeller,
        navigationOptions: {
            header: null
        }
    },
    EditProfileSeller:{
        screen: EditProfileSeller,
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
    ProfileSeller: {
        screen: ProfileSeller,
        navigationOptions:{
            header: null
        }
    },
    Chatlist: {
        screen: Chatlist,
        navigationOptions:{
            header: null
        }
    },
    ChatSell: {
        screen: ChatSell,
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
        Chat: Chat,
        Chatlist: Chatlist,
        RegisterBuyer: RegisterBuyer,
        RegisterSeller: RegisterSeller,
        HomeBuyer: BuyerNavigator,
        HomeSeller: SellerNavigator
    },
    {
      initialRouteName: 'Login'
    }
  )
)

