import axios from 'axios'
axios.defaults.timeout = 5000
axios.defaults.baseURL = 'http://localhost:5000/api'
export default axios