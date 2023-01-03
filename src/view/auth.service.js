import axios from 'axios'
import ip from '../ip'

class AuthService {
    login1(email) {
        return axios
            .post(ip + '/user/login1', { email})
            .then(res => {
                if (res.data.token) {
                    localStorage.setItem('user', JSON.stringify(res.data))
                }
                return res.data
            }, rejected => { return rejected })
    }
    login2(email, password) {
        return axios
            .post(ip + '/clientes/login', { email, password })
            .then(res => {
                if (res.data.token) {
                    localStorage.setItem('user', JSON.stringify(res.data))
                }
                return res.data
            }, rejected => { return rejected })
    }
    
    logout() { localStorage.removeItem('user') }
    getCurrentUser() { return JSON.parse(localStorage.getItem('user')) }
}
export default new AuthService();