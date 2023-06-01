import journal from './journal.css'
import { useState, useEffect } from 'react'
import { getEntries, createJournalEntry } from '../../utilities/journal-service'
import { Link, useNavigate } from 'react-router-dom'
import { getUserToken } from '../../utilities/authToken'

const Journal = (props) => {

    const token = getUserToken()
    const navigate = useNavigate()
    const [journalEntries, setJournalEntries] = useState([])

    const [isLoading, setIsLoading] = useState(true)

    const [newForm, setNewForm] = useState({
        title: "",
        description: "",
        entry: "",
    })

    if (!token) {
        navigate('/auth')
    }

    async function handleRequest() {
        try {
            const entryData = await getEntries()
            // console.log(entryData)
            setJournalEntries(entryData)
            setIsLoading(false)

        } catch (err) {
            console.log(err)
        }
    }
    // console.log(journalEntry)
    useEffect(() => {
        handleRequest()
    }, [isLoading])

    const handleChange = (e) => {
        setNewForm({ ...newForm, [e.target.name]: e.target.value })
        // console.log(e.target.name)
        // console.log(e.target.values)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await createJournalEntry(newForm)
            setIsLoading(true)
            setNewForm({
                title: "",
                description: "",
                entry: ""
            })
        } catch (err) {
            console.log(err)
        }
    }

    const loaded = () => {
        return journalEntries?.map((journalEntry, idx) => {
            return (
                <div key={idx} className="entry-card">
                    <Link to={`/journal/${journalEntry._id}`}>
                        <h1>{journalEntry.title}</h1>

                        <label>Description:</label>
                        <h3>{journalEntry.description}</h3>

                        <label>Entry:</label>
                        <h3>{journalEntry.entry}</h3>
                    </Link>
                    <Link to={`/journal/${journalEntry._id}/edit`}>
                        <button className="entry-edit-btn" type='submit' value='Edit Entry'>Edit</button>
                    </Link>
                </div>
            )

        })
    }

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

    // console.log(`There are ${journalEntries.length} entries `)

    return (
        <div className="journal-list">
            <section className="create-form">
                {token ? (
                    <>
                        <h2>New Entry</h2>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label>Title: </label>
                                <input
                                    type="text"
                                    value={newForm.title}
                                    name="title"
                                    required
                                    placeholder="Title of new Journal Entry"
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label>Description: </label>
                                <input
                                    type="text"
                                    value={newForm.description}
                                    name="description"
                                    required
                                    placeholder="Provide a description of the new Journal Entry"
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label>Entry: </label>
                                <textarea
                                    type="text"
                                    value={newForm.entry}
                                    name="entry"
                                    required
                                    placeholder="Write a new Journal Entry"
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                            <button 
                            className="new-entry-btn"
                            type="submit" 
                            >Create New Entry</button>
                            </div>

                        </form>
                    </>
                ) : null}
            </section>
            {isLoading ? loading() : loaded()}
        </div>
    )
}

export default Journal