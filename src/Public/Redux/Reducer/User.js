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
        case 'POST_LOGIN_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulfilled: false,
                isRejected: false,
            }
        case 'POST_LOGIN_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            }
        case 'POST_LOGIN_FULFILLED':
            AsyncStorage.setItem('Username', action.payload.data.result.username)
            AsyncStorage.setItem('Role', action.payload.data.result.role)
            AsyncStorage.setItem('Token', action.payload.data.result.token)
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                userList: action.payload.data,
            }
        case 'GET_PEMBELI_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulfilled: false,
                isRejected: false,
            }
        case 'GET_PEMBELII_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            }
        case 'GET_PEMBELI_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                detailPembeli: action.payload.data,
            }
        case 'PATCH_PEMBELI_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulfilled: false,
                isRejected: false,
            }
        case 'PATCH_PEMBELII_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            }
        case 'PATCH_PEMBELI_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                detailPembeli: action.payload.data,
            }
        default:
            return state
    }
};

export default user