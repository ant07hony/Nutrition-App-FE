import show from './show.css'
import { getEntry, deleteEntry } from '../../utilities/journal-service'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { getUserToken } from '../../utilities/authToken'

const Show = (props) => {

    const token = getUserToken()
    const [entry, setEntry] = useState(null)
    const [basketEntry, setBasketEntry] = useState(null)
    const [newForm, setNewForm] = useState({
        DataType: "",
        Query: "",
    })
    const [isLoading, setIsLoading] = useState(true)
    const { id } = useParams()
    const navigate = useNavigate()
    // console.log(id)

    if (!token) {
        navigate('/auth')
    }

    const handleRequest = async () => {
        try {
            const entryData = await getEntry(id)
            setEntry(entryData)
            console.log('entry data:', entryData)
            // console.log('entry:', entry)

            // const basketData = await getBasket()
            // setBasketEntry(basketData)
            // console.log('basket data', basketData)

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
            navigate('/journal')

        } catch (err) {
            console.log(err)
            navigate(`/journal/${id}`)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{

        }catch(err){
            console.log(err)
        }
    }

    const handleChange = (e) => {
        setNewForm({ ...newForm, [e.target.name]: e.target.value })
    }

    console.log('entry:', entry)
    const loaded = () => (
        <div className="entry-basket">
            <div className="entry">
                <h1>Entry: {entry.title}</h1>
                <div className="entry-section">
                    <label>Date/Time; </label>
                    <p>{entry.date} / {entry.time}</p>
                </div>
                <div className="entry-section">
                    <label>Description: </label>
                    <p>{entry.description}</p>
                </div>
                <div className="entry-section">
                    <label>Entry: </label>
                    <p>{entry.entry}</p>
                </div>
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
            <div className="basket-form">
                <form onSubmit={handleSubmit}>
                    <div className="basket">
                    <div className="datatype">
                        <h1>Basket</h1>
                        <label for="dataType">DataType: </label>
                        <select name="dataType"
                        value={newForm.DataType}
                        id="dataType">
                            <option value="Survey">Survey</option>
                            <option value="Branded">Branded</option>
                        </select>
                        </div>

                        <div className="query">
                       <label for="query">Item: </label>
                        <input
                            type="text"
                            value={newForm.Query}
                            name="query"
                            required
                            placeholder="Find Item"
                            onChange={handleChange}
                        />
                        </div>

                    </div>

                </form>

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