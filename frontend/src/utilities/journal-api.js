

const BASE_URL =process.env.REACT_APP_BASE_URL
// console.log(BASE_URL)

export async function index() {

    try {

        const options = {
            method: 'GET'
        }

        const response = await fetch(BASE_URL, options)
        // console.log(response)
        if(response.ok){
            return response.json()
        }else{
            throw new Error('Invalid Request')
        }
    }catch(err){
        console.log(err)
        return err
    }
}

export async function create(data) {

    try {

        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(BASE_URL, options)
        // console.log(response)
        if(response.ok){
            return response.json()
        }else{
            throw new Error('Invalid Request')
        }
    }catch(err){
        console.log(err)
        return err
    }
}






export async function detail(id){
    // console.log(id)
    try{
        const options = {
            method: 'GET',
        }
        const url = `${BASE_URL}/${id}`
        // console.log(url)
        const response = await fetch(url, options)
        
        if(response.ok){
            return response.json()
        }
    }catch(err){
        console.log(err)
        throw new Error('Invalid Request')
    }
}

export async function destroy(id){
    try{
        const options = {
            method: 'DELETE',
        }
        const url = `${BASE_URL}/${id}`
        const response = await fetch(url, options)
        if(response.ok){
            return response.json()
        }

    }catch(err){
        console.log(err)
        throw new Error(err)
    }
}

