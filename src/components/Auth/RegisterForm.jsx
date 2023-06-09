import { useNavigate } from 'react-router-dom'
import { useState, useContext } from 'react'
import { signUp } from '../../utilities/auth-services'
import {UserContext} from '../../data'
import {setUserToken, clearUserToken, getUserToken} from '../../utilities/authToken'

const RegisterForm = () => {

    const initialState = { username: "", password: "" }
    const [input, setInput] = useState(initialState)
    const navigate = useNavigate()
    const {setUser} = useContext(UserContext)
    // const context = useContext(UserContext)
    // console.log(context)
    const token = getUserToken()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const createdUser = await signUp(input)
        console.log(createdUser)

        if (createdUser.token) {
            setUserToken(createdUser.token)
            setUser(createdUser.user)
            navigate('/journal')
        } else {
            clearUserToken()
            navigate('/')
        }
        setInput(initialState)
    }

    const  handleChange = (e) => {
        setInput({...input, [e.target.name]: e.target.value})
    }


    return (
        <>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Register Username: </label>
                <input
                    id="username"
                    name="username"
                    value={input.username}
                    onChange={handleChange}
                />
                <br/>
                <br/>
                <label htmlFor="password">Add Password: </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    value={input.password}
                    onChange={handleChange}
                />
                <br/>
                <br/>
                <input type="submit" value="Sign Up"/>
            </form>
        </>
    )
}

export default RegisterForm