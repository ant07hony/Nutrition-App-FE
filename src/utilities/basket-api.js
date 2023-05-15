import {getUserToken} from './authToken'

const API_KEY = `${process.env.REACT_APP_USDA_API_KEY}`

const BASE_URL = `${process.env.REACT_APP_BASE_URL}`


export async function index() {

    try {

        const options = {
            method: 'GET',
            headers: {
                "Authorization": `bearer ${getUserToken()}`,
                "Content-Type": "application/json"
            },
        }

        const response = await fetch(`${API_KEY }`, options)
       
        if (response.ok) {
            return response.json()
        } else {
            throw new Error('Invalid GET Request')
        }
    } catch (err) {
        console.log(err)
        return err
    }
}

export async function create(data) {

    try {

        const options = {
            method: 'POST',
            headers: {
                "Authorization": `bearer ${getUserToken()}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(API_KEY, options)
        console.log(response)
        if (response.ok) {
            return response.json()
        } else {
            throw new Error('Invalid POST Request')
        }
    } catch (err) {
        console.log(err)
        return err
    }
}

export async function detail(id) {
    // console.log(id)
    try {
        const options = {
            method: 'GET',
            headers: {
                "Authorization": `bearer ${getUserToken()}`,
                "Content-Type": "application/json"
            },
            // body: JSON.stringify(id)
           
        }
        const url = `${BASE_URL}/${id}`
        console.log(url)
        const response = await fetch(url, options)
        console.log(response)
        if (response.ok) {
            return response.json()
        }
    } catch (err) {
        console.log(err)
        throw new Error('Invalid GET Request')
    }
}

export async function destroy(id) {
    try {
        const options = {
            method: 'DELETE',
            headers: {
                "Authorization": `bearer ${getUserToken()}`,
                "Content-Type": "application/json"
            },
            // body: JSON.stringify(id)
            
        }
        const url = `${BASE_URL}/${id}`
        const response = await fetch(url, options)
        if (response.ok) {
            return response.json()
        }

    } catch (err) {
        console.log(err)
        throw new Error('Invalid Request')
    }
}

export async function update(id, formData) {
    try {
        const options = {
            method: 'PUT',
            headers: {
                "Authorization": `bearer ${getUserToken()}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }
        const url = `${BASE_URL}/${id}`
        const response = await fetch(url, options)
        if (response.ok) {
            return response.json()
        }
    } catch (err) {
        console.log(err)
        throw new Error('Invalid PUT Request')
    }
}

