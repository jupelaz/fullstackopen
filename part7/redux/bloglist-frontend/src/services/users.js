import axios from 'axios'
const baseUrl = '/api/users'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
  console.log('user token', token)
}

const getAll = async () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getById = async id => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.get(`${baseUrl}/${id}`, config)
  return response.data
}

const create = async user => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, user, config)
  return response.data
}

const update = async user => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${baseUrl}/${user.id}`, user, config)
  return response.data
}

const drop = async user => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(`${baseUrl}/${user.id}`, config)
  return response.data
}
const usersService = { getAll, getById, setToken, create, update, drop }
export default usersService
