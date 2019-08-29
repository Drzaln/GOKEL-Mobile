import { ActionType } from "redux-promise-middleware";

const initialState = {
    detailTransaksi: [],
    isLoading: false,
    isFulfilled: false,
    isRejected: false,
};

const transaksi = (state = initialState, action) => {
    switch (action.type) {
        case 'POST_TRANSAKSI_PENDING':
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,
            }
        case 'POST_TRANSAKSI_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
                isFulfilled: false
            }
        case 'POST_TRANSAKSI_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isRejected: false,
                isFulfilled: true,
                detailTransaksi: action.payload.data
            }
        case 'GET_TRANSAKSI_PEMBELI_PENDING':
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,
            }
        case 'GET_TRANSAKSI_PEMBELI_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
                isFulfilled: false
            }
        case 'GET_TRANSAKSI_PEMBELI_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isRejected: false,
                isFulfilled: true,
                detailTransaksi: action.payload.data
            }
        case 'GET_TRANSAKSI_PENJUAL_PENDING':
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,
            }
        case 'GET_TRANSAKSI_PENJUAL_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
                isFulfilled: false
            }
        case 'GET_TRANSAKSI_PENJUAL_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isRejected: false,
                isFulfilled: true,
                detailTransaksi: action.payload.data
            }
        default: 
            return state
    }
}

export default transaksi
