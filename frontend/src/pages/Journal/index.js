import journal from './journal.css'
import { useState, useEffect } from 'react'

const Journal = (props) => {

    const [ journalEntries, setJournalEntries ] = useState([])

    const [ isLoading, setIsLoading] = useState(true)

    const BASE_URL = "http://localhost:4000/journal"

    const getJournalEntries = async () => {
        try{
            const response = await fetch(BASE_URL)
            // console.log(response)
            const allJournalEntries = await response.json()
            // console.log(allJournalEntries)
            setJournalEntries(allJournalEntries)
            setIsLoading(false)
            
        }catch(err){
            console.log(err)
        }
    }
    // console.log(journalEntry)

    const loaded = () => {
        return journalEntries?.map((journalEntry, idx) => {
            return (
                <div key={idx}>
                    <h1>{journalEntry.title}</h1>
                    <h3>{journalEntry.date} / {journalEntry.time}</h3>
                    <h3>{journalEntry.description}</h3>
                    <h3>{journalEntry.entry}</h3>
                </div>  
            )
           
        })
    }
    console.log(loaded(journalEntries.journalEntry))
    // console.log(journalEntries[1].title)
    useEffect(()=> {getJournalEntries()},[])

    const loading = () => {
        <div className="journal-list">
            <h1>
                Loading...
                <span>
                    <img className="spinner" src="https://freesvg.org/img/1544764567.png"/>
                </span>
            </h1>
        </div>
    }

    console.log(`There are ${journalEntries.length} entries `)

    return (

        <section className="journal-list">
            {isLoading ? loading() : loaded()}
        </section>
    )
}

export default Journal