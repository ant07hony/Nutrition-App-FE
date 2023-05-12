import RegisterForm from '../../components/Auth/RegisterForm'
import LoginForm from '../../components/Auth/LoginForm'

// import context 

function Auth() {

    return (
		    <section className='auth-container'>
                <RegisterForm />
                <LoginForm/>
            </section>
		)
}

export default Auth;
