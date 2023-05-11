import main from './main.css'
import { Routes, Route } from 'react-router-dom'
import Journal from '../../pages/Journal'
import Show from '../../pages/Show'
import Edit from '../../pages/Edit'


const Main = (props) => {
    return (
        <main>
            <Routes>

                <Route
                    path='/'
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