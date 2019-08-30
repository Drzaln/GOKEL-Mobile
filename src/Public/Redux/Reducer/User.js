import { AsyncStorage } from 'react-native'

const initialState = {
  detailPembeli: [],
  isLoading: false,
  isFulfilled: false,
  isRejected: false
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case 'POST_REGIST_PEMBELI_PENDING':
      return {
        ...state,
        isLoading: true,
        isFulfilled: false,
        isRejected: false
      }
    case 'POST_REGIST_PEMBELI_REJECTED':
      return {
        ...state,
        isLoading: false,
        isRejected: true
      }
    case 'POST_REGIST_PEMBELI_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        detailPembeli: action.payload.data
      }
    case 'POST_LOGIN_PENDING':
      return {
        ...state,
        isLoading: true,
        isFulfilled: false,
        isRejected: false
      }
    case 'POST_LOGIN_REJECTED':
      return {
        ...state,
        isLoading: false,
        isRejected: true
      }
    case 'POST_LOGIN_FULFILLED':
      AsyncStorage.setItem('Username', action.payload.data.result.username)
      AsyncStorage.setItem('Role', action.payload.data.result.role)
      AsyncStorage.setItem('Token', action.payload.data.result.token)
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        userList: action.payload.data
      }
    case 'GET_PEMBELI_PENDING':
      return {
        ...state,
        isLoading: true,
        isFulfilled: false,
        isRejected: false
      }
    case 'GET_PEMBELI_REJECTED':
      return {
        ...state,
        isLoading: false,
        isRejected: true
      }
    case 'GET_PEMBELI_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        detailPembeli: action.payload.data
      }
    case 'GET_PEDAGANG_KATEGORI_PENDING':
      return {
        ...state,
        isLoading: true,
        isFulfilled: false,
        isRejected: false
      }
    case 'GET_PEDAGANG_KATEGORI_REJECTED':
      return {
        ...state,
        isLoading: false,
        isRejected: true
      }
    case 'GET_PEDAGANG_KATEGORI_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        detailPembeli: action.payload.data
      }
    case 'PATCH_PEMBELI_PENDING':
      return {
        ...state,
        isLoading: true,
        isFulfilled: false,
        isRejected: false
      }
    case 'PATCH_PEMBELI_REJECTED':
      return {
        ...state,
        isLoading: false,
        isRejected: true
      }
    case 'PATCH_PEMBELI_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        detailPembeli: action.payload.data
      }
    case 'PATCH_SALDO_PENDING':
      return {
        ...state,
        isLoading: true,
        isFulfilled: false,
        isRejected: false
      }
    case 'PATCH_SALDO_REJECTED':
      return {
        ...state,
        isLoading: false,
        isFulfilled: false,
        isRejected: true
      }
    case 'PATCH_SALDO_FULFILLED':
        return {
          ...state,
          isLoading: false,
          isFulfilled: true,
          isRejected: false,
          detailPembeli: action.payload.data
        }       
    case 'PATCH_PEDAGANG_REJECTED':
      return {
        ...state,
        isLoading: false,
        isRejected: true
      }
    case 'PATCH_PEDAGANG_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        detailPedagang: action.payload.data
      }
    default:
        return state
  }
}

export default user
