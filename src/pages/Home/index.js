import {Link} from 'react-router-dom'

function Home(props){
    return (<section>
        <h2>Welcome to your Nutrition Journal App</h2>
        <p>Connect to enjoy your Journal </p>

				{/* Additional branding & content can go here... */}

        <Link to="/auth">CONNECT</Link>
    </section>)
}

export default Home