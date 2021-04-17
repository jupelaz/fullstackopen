import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  console.log('id: ', id)
  console.log('newObject: ', newObject)
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const drop = id => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}
const personService = {
  getAll,
  create,
  update,
  drop,
}

export default personService
