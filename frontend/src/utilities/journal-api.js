

const BASE_URL =`${process.env.REACT_APP_BASE_URL}`
console.log(BASE_URL)

export async function index() {

    try {

        const options = {
            method: 'GET'
        }

        const response = await fetch(BASE_URL, options)
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

