import axios from 'axios'
// const baseUrl = 'http://localhost:3001/persons' // url to json server in port 3001
const baseUrl = '/api/people' // path to backend

const getAll = () => { // fetches all person objects from database and returns them as a response
	const request = axios.get(baseUrl)
	return request.then(response => response.data)
}

const create = newObject => { // adds provided new object to the database and returns the response
	const request = axios.post(baseUrl, newObject)
	return request.then(response => response.data)
}

const remove = id => { // removes an object that corresponds to the provided id
	return axios.delete(`${baseUrl}/${id}`)
}

const update = (id, newObject) => { // puts provided new object in the place of the corresponding id (overwriting it)
	const request = axios.put(`${baseUrl}/${id}`, newObject)
	return request.then(response => response.data)
}

export default {getAll, create, remove, update}