import * as authAPI from './auth-api'

export async function signUp(data){
    try {

        console.log(data)
        const newUser = await authAPI.registerUser(data)
        // console.log('register user' + newUser)
        return newUser 
    } catch (err) {
        console.log(err)
        throw new Error(err)
    }
}

export async function signIn(data){
    try {
        const user = await authAPI.loginUser(data)
        return user 
    } catch (err) {
        console.log(err)
        throw new Error(err)
    }
}