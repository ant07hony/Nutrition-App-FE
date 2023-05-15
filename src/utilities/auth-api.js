import { useNavigate} from 'react-router-dom'

const BASE_URL = `${process.env.REACT_APP_AUTH_URL}`
console.log(BASE_URL)


export async function registerUser(data){
    try{
        const url = `${BASE_URL}/register`
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        }
        console.log(data)
        const response = await fetch(url, options)
        console.log(response.body)
        if (response.ok){
            return response.json(data)
        }else{
            throw new Error(response.statusText)
        }
    }catch(err){
        console.log(err)
        return err
    }
}

export async function loginUser(data){
   
    const url = `${BASE_URL}/login`
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }

    const response = await fetch(url, options)
    const dataResponse = await response.json()

    if(response.ok) {
        return dataResponse
    }else{
        throw new Error(dataResponse.error)
    }
}
 

