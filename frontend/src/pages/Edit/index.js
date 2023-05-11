import edit from './edit.css'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getEntry, updateEntry } from '../../utilities/journal-service'

const Edit = () => {

    const [entry, setEntry] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const { id } = useParams()
    const navigate = useNavigate()
    const [editForm, setEditForm] = useState({
        title: "",
        description: "",
        entry: ""
    })

    const handleRequest = async () => {
        try {
            const entryData = await getEntry(id)
            setEntry(entryData)
            const { title, description, entry } = entryData
            setEditForm({ title, description, entry })
            setIsLoading(false)

        } catch (err) {
            console.log(err)
            navigate(`/journal/${id}`)

        }
    }

    useEffect(() => {
        handleRequest()
    }, [])

    const handleChange = (e) => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const updateResponse = await updateEntry(id, editForm)
            navigate(`/journal/${id}`)

        } catch (err) {
            console.log(err)
            navigate(`/journal/${id}/edit`)
        }
    }

    const loaded = () => (
        <div className="entry">
            <h1>Edit Page</h1>
            <section>
                <h2>Edit {entry.title}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={editForm.title}
                        name="title"
                        placeholder="Edit Title"
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        value={editForm.description}
                        name="description"
                        placeholder="Edit Description"
                        onChange={handleChange}
                    />

                    <textarea
                        type="text"
                        value={editForm.entry}
                        name="entry"
                        placeholder="Edit Entry"
                        onChange={handleChange}
                    />
                    <input type="submit" value="Update Entry" />
                </form>
            </section>

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

export default Edit