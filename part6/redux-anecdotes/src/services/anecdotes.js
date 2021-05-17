import axios from 'axios'

const baseUrl = 'http://localhost:3003/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getOne = async id => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const createNew = async content => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const updateOne = async (id, newOne) => {
  const response = await axios.put(`${baseUrl}/${id}`, newOne)
  return response.data
}

const notes = { getAll, getOne, createNew, updateOne }
export default notes
