import axios from 'axios'
import api from '../../../Config/api'

export const PostRegisterPembeli = (data) => {
    return {
        type: 'POST_REGIST_PEMBELI',
        payload: axios.post(`${api}register/pembeli`, data, {
            headers: {
                'chace': 'pembeli',
                'authorization': 'gokel'
            }
        })
    }
}

export const PostRegisterPedagang = (data) => {
    return {
        type: 'POST_REGIST_PEDAGANG',
        payload: axios.post(`${api}register/pedagang`, data)
    }
}

export const PostLogin = (data) => {
    return {
        type: 'POST_LOGIN',
        payload: axios.post(`${api}login`, data)
    }
}

export const getUserPembeli = (username) => {
    return {
        type: 'GET_PEMBELI',
        payload: axios.get(`${api}pembeli/${username}`)
    }
}

export const getUserPedagang = (username) => {
    return {
        type: 'GET_PEDAGANG',
        payload: axios.get(`${api}pedagang/${username}`)
    }
}

export const getPedagangByCategory = (kategori) => {
    return{
        type:'GET_PEDAGANG_KATEGORI',
        payload: axios.get(`${api}pedagang/kategori/${kategori}`,{
            headers: {
                'chace': 'pembeli',
                'authorization': 'gokel'
            }
        })
    }
}

export const updateUserPembeli = (username, input) => {
    return {
        type: 'PATCH_PEMBELI',
        payload: axios.patch(`${api}pembeli/${username}`, input)
    }
}

export const getJajan = () => {
    return {
        type: 'GET_JAJAN',
        payload: axios.get(`${api}jajan`)
    }
}
