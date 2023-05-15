import edit from './edit.css'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getEntry, updateEntry } from '../../utilities/journal-service'
import { getUserToken } from '../../utilities/authToken'

const Edit = () => {

    const token = getUserToken()
    const [entry, setEntry] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const { id } = useParams()
    const navigate = useNavigate()
    const [editForm, setEditForm] = useState({
        title: "",
        description: "",
        entry: ""
    })

    if(!token){
        navigate('/auth')
    }

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
            <h1>Edit: {entry.title}</h1>
            <section className="edit-page">
                
                
                <form onSubmit={handleSubmit}>
                <div>
                <label>Title: 
                    <input
                        type="text"
                        value={editForm.title}
                        name="title"
                        placeholder="Edit Title"
                        onChange={handleChange}
                    />
                </label>
                </div>
                <div>
                <label>Description: 
                    <input
                        type="text"
                        value={editForm.description}
                        name="description"
                        placeholder="Edit Description"
                        onChange={handleChange}
                    />
                    </label>
                    </div>
                    <div>
                    <label>Entry: 
                    <textarea
                        type="text"
                        value={editForm.entry}
                        name="entry"
                        placeholder="Edit Entry"
                        onChange={handleChange}
                    />
                    </label>
                    </div>
                    <button
                    className="update-btn"
                    type="submit" 
                    >Update Entry</button>
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