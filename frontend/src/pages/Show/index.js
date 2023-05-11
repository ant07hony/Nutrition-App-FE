import show from './show.css'
import { getEntry, deleteEntry } from '../../utilities/journal-service'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Show = (props) => {

    const [entry, setEntry] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const { id } = useParams()
    const navigate = useNavigate()
    // console.log(id)

    const handleRequest = async () => {
        try {
            const entryData = await getEntry(id)
            setEntry(entryData)
            // console.log(entryData)
            setIsLoading(false)
        } catch (err) {
            console.log(err)
        }
    }

    // console.log(`Current Person: ${JSON.stringify(entry)}`)

    useEffect(() => {
        handleRequest()
    }, [])

    const handleDelete = async () => {
        try {
            const deletedResponse = await deleteEntry(id)
            navigate('/')

        } catch (err) {
            console.log(err)
            navigate(`/journal/${id}`)
        }
    }

    const loaded = () => (
        <div className="entry">
            <h1>Show Page</h1>
            <h2>{entry.title}</h2>
            <h3>{entry.description}</h3>
            <h3>{entry.entry}</h3>
            <div>
                <button
                    className="delete"
                    onClick={handleDelete}
                >Remove Entry</button>

                <Link to={`/journal/${entry._id}/edit`}>
                    <button className="edit" type='submit' value='Edit Entry'
                    >Edit Entry</button>
                </Link>

            </div>
        </div>
    )

    const loading = () => (
        <div className="journal-list">
            <h1>
                Loading...
                <span>
                    <img className="spinner" src="https://freesvg.org/img/1544764567.png" />
                </span>
            </h1>
        </div>
    )

    return (
        <div>
            {isLoading ? loading() : loaded()}
        </div>
    )
}

export default Show