import './App.css';
import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../data'
import Header from '../Header'
import Main from '../Main'

function App() {

  const { Provider: UserInfo } = UserContext
  // console.log(UserContext)

  const [currentUser, setCurrentUser] = useState(null)

  return (
    <div className="App">
      <UserInfo
        value={{ user: currentUser, setUser: setCurrentUser }}
      >
      <Header />
      <Main />
      </UserInfo>
      
    </div>
  );
}

export default App;
