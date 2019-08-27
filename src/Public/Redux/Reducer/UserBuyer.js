import { AsyncStorage } from 'react-native';

const initialState = {
    detailPembeli: [],
    isLoading: false,
    isFulfilled: false,
    isRejected: false,
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case 'POST_REGIST_PEMBELI_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulfilled: false,
                isRejected: false,
            }
        case 'POST_REGIST_PEMBELI_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            }
        case 'POST_REGIST_PEMBELI_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                detailPembeli: action.payload.data,
            }
        // case 'POST_SIGN_PENDING':
        //     return {
        //         ...state,
        //         isLoading: true,
        //         isFulfilled: false,
        //         isRejected: false,
        //     }
        // case 'POST_SIGN_REJECTED':
        //     return {
        //         ...state,
        //         isLoading: false,
        //         isRejected: true,
        //     }
        // case 'POST_SIGN_FULFILLED':
        //     AsyncStorage.setItem('data', action.payload.data.result)
        //     AsyncStorage.setItem('Userid', action.payload.data.result.id_user.toString())
        //     AsyncStorage.setItem('Cardid', action.payload.data.result.id_card.toString())
        //     AsyncStorage.setItem('Token', action.payload.data.result.token)
        //     AsyncStorage.setItem('Name', action.payload.data.result.fullname)
        //     AsyncStorage.setItem('Verified', action.payload.data.result.is_verified.toString())
        //     return {
        //         ...state,
        //         isLoading: false,
        //         isFulfilled: true,
        //         userList: action.payload.data.result,
        //     }
        default:
            return state
    }
};

export default user