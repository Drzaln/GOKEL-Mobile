import axios from 'axios'

export const PostRegisterPembeli = (data) => {
    return {
        type: 'POST_REGIST_PEMBELI',
        payload: axios.post(`https://apigokel.herokuapp.com/user/register/pembeli`, data)
    }
}

export const PostLogin = (data) => {
    return {
        type: 'POST_LOGIN',
        payload: axios.post(`https://apigokel.herokuapp.com/user/login`, data)
    }
}