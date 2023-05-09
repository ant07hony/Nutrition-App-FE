import main from './main.css'
import { Routes, Route } from 'react-router-dom'
import Journal from '../../pages/Journal'
import Show from '../../pages/Show'


const Main = (props) => {
    return (
        <main>
            <Routes>

                <Route 
                path='/' 
                element={ <Journal />} 

                />

               
                <Route 
                path='/journal/:id' 
                element={<Show />}

                />
                
            </Routes>
        </main>
    )
}

export default Main