import main from './main.css'
import { Routes, Route } from 'react-router-dom'
import Home from '../../pages/Home'
import Auth from '../../pages/Auth'
import Journal from '../../pages/Journal'
import Show from '../../pages/Show'
import Edit from '../../pages/Edit'
import Basket from '../../pages/Basket'

const Main = (props) => {
    return (
        <main>
            <Routes>
                <Route
                    path='/'
                    element={<Home />}
                />

                <Route
                    path='/auth'
                    element={<Auth />}
                />

                <Route
                    path='/journal'
                    element={<Journal />}
                />

                <Route
                    path='/journal/:id'
                    element={<Show />}
                />

                <Route
                    path='/journal/:id/edit'
                    element={<Edit />}
                />

            </Routes>
        </main>
    )
}

export default Main