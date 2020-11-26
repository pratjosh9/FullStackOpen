import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios
            .get(baseUrl)
            .then(response => response.data)
}

const add = (personObj) => {
    return axios
            .post(baseUrl, personObj)
            .then(response => response.data)
}

const deletePerson = (id) => {
    return axios
            .delete(`${baseUrl}/${id}`)
}

const change = (person) => {
    return axios
            .put(`${baseUrl}/${person.id}`, person)
            .then(response => response.data)
}
export default {getAll, add, deletePerson, change}