import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => axios.get(baseUrl).then(response => response.data)

const create = (newObject) => axios.post(baseUrl, newObject).then(response => response.data)

const phoneBook = {getAll, create}

export default phoneBook