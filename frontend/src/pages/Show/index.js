import show from './show.css'
import { getEntry } from '../../utilities/journal-service'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Show = (props) => {

    const [entry, setEntry] = useState(null)
    const { id } = useParams()
    console.log(id)
    
    const handleRequest = async () => {
        try {
            const entryData = await getEntry(id)
            setEntry(entryData)
            console.log(entryData)
        } catch (err) {
            console.log(err)
        }
    }

    console.log(`Current Person: ${JSON.stringify(entry)}`)

    useEffect(() => {
        handleRequest()
    }, [])

    return (
        <h1>Show Page</h1>
    )
}

export default Show