import header from './header.css'
import { Link } from 'react-router-dom'


const Nav = () => (
    <nav className="nav">
        <Link to='/journal'>
            <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" />
        </Link>
        <div>Nutrition Journal</div>
    </nav>
)
const Header = (props) => {
    return (
        <header className="header">
            <Nav />
            <h1>Header Page</h1>
        </header>
    )
}

export default Header