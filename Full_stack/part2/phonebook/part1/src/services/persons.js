import axios from 'axios'
const baseUrl = 'http://localhost:3004/persons'


const getAll = () => {
    return axios.get(baseUrl);
}
const deletePerson = (id) =>{
    return axios.delete(`${baseUrl}/${id}`)
}

const updataPerson = (id, newObject) =>{
    return axios.put(`${baseUrl}/${id}`, newObject)
}

const addPerson = (newObject) =>{
    return axios.post(baseUrl, newObject)
}

const exportedObject = {
    getAll,
    deletePerson,
    updataPerson,
    addPerson
};

export default exportedObject;