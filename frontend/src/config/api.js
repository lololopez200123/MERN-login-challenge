import axios from 'axios'

import { API_BASE_URL } from 'config/constanst.js'

// login

const login = async credentials => {
    const { data } = await axios.post(`${API_BASE_URL}/users/login`, credentials)
    return data
}

// CREATE_USER

export const create = async credentials => {
    const {
        data: { data, error, succes }
    } = await axios.post(`${API_BASE_URL}/users/add-user`)
    if (succes) {
        return data
    } else {
        return Promise.reject(error)
    }
}

// VERIFY USER

export const verify = async token => {
    const { data, status } = await axios.post(`${API_BASE_URL}/users/verify-user`, token, {
        headers: {
            Authorization: `bearer ${token}`
        }
    })
    return {
        data,
        status
    }
}

export default { login, create, verify }
