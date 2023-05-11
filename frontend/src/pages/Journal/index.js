import journal from './journal.css'
import { useState, useEffect } from 'react'
import { getEntries, createJournalEntry } from '../../utilities/journal-service'
import { Link } from 'react-router-dom'

const Journal = (props) => {

    const [journalEntries, setJournalEntries] = useState([])

    const [isLoading, setIsLoading] = useState(true)

    const [newForm, setNewForm] = useState({
        title: "",
        description: "",
        entry: "",
    })

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
                        <h3>{journalEntry.date} / {journalEntry.time}</h3>
                        <h3>{journalEntry.description}</h3>
                        <h3>{journalEntry.entry}</h3>
                    </Link>
                    <Link to={`/journal/${journalEntry._id}/edit`}>
                        <input type='submit' value='Edit Entry' />
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

        <section className="journal-list">
            <h2>Create a new journal entry</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={newForm.title}
                    name="title"
                    placeholder="Title of new Journal Entry"
                    onChange={handleChange}
                />

                <input
                    type="text"
                    value={newForm.description}
                    name="description"
                    placeholder="Provide a description of the new Journal Entry"
                    onChange={handleChange}
                />

                <textarea
                    type="text"
                    value={newForm.entry}
                    name="entry"
                    placeholder="Write a new Journal Entry"
                    onChange={handleChange}
                />

                <input type="submit" value="Create Journal Entry"
                />

            </form>

            {isLoading ? loading() : loaded()}

        </section>
    )
}

export default Journal