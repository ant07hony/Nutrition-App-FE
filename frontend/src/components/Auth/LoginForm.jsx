import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { signIn } from '../../utilities/auth-services'
import { clearUserToken, setUserToken } from "../../utilities/authToken";
import { UserContext } from '../../data'

const LoginForm = () => {

    const initialState = { username: "", password: "" }
    const [input, setInput] = useState(initialState)
    const { setUser } = useContext(UserContext)

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const loggingUser = await signIn(input)
        if (loggingUser.token) {
            setUserToken(loggingUser.token)
            setUser(loggingUser.user)
            navigate('/journal')
        } else {
            clearUserToken()
            navigate('/')
        }
        setInput(initialState)
    }

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Name: </label>
                <input
                    id="username"
                    name="username"
                    value={input.username}
                    onChange={handleChange}
                />
                <br />
                <br />
                <label htmlFor="password">Password: </label>
                <input
                    id="password"
                    name="password"
                    value={input.password}
                    onChange={handleChange}
                />
                <br />
                <br />
                <input type="submit" value="Sign In" />
            </form>
        </>
    );
};


export default LoginForm
