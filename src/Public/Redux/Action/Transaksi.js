import axios from 'axios'
const url = 'https://gokel-251109.appspot.com/transaksi/'

export const PostTransaksi = (data) => {
    return {
        type: 'POST_TRANSAKSI',
        payload: axios.post(`${url}`, data, {
            headers: {
                'authorization': 'gokel'
            }
        })
    }
}

export const DetailTransaksiPembeli = (username) => {
    return {
        type: 'GET_TRANSAKSI_PEMBELI',
        payload: axios.get(`https://gokel-251109.appspot.com/transaksi/transaksipembeli/${username}`, {
            headers: {
                'authorization': 'gokel'
            }
        })
    }
}

export const DetailTransaksiPenjual = (username) => {
    return {
        type: 'GET_TRANSAKSI_PENJUAL',
        payload: axios.get(`${url}transaksipedagang/${username}`, {
            headers: {
                'authorization': 'gokel'
            }
        })
    }
}

