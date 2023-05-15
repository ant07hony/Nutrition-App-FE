import show from './show.css'
import { getEntry, deleteEntry } from '../../utilities/journal-service'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { getUserToken } from '../../utilities/authToken'
import { createBasket, getBaskets } from '../../utilities/basket-service'

const Show = (props) => {

    const token = getUserToken()
    const [entry, setEntry] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const { id } = useParams()
    const navigate = useNavigate()
    console.log(entry)
    // console.log(id)
    const [basket, setBasket] = useState([])
    const [newForm, setNewForm] = useState({
        name: "",
        dataType: "",
        query: "",
    })

    if (!token) {
        navigate('/auth')
    }

    const handleRequest = async () => {
        try {
            const entryData = await getEntry(id)
            setEntry(entryData)
            // console.log('entry data:', entryData)
            // console.log('entry:', entry)

            // console.log(entryData)
            setIsLoading(false)
        } catch (err) {
            console.log(err)
        }
    }

    // console.log(`Current Person: ${JSON.stringify(entry)}`)

    async function handleBasketRequest() {
        try {
            const basketData = await getBaskets()
            console.log(basketData)
            setBasket(basketData)
            setIsLoading(false)

        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        handleRequest()
        // handleBasketRequest()
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
        try {
            await createBasket(newForm)
            setIsLoading(true)
            setNewForm({
                name: "",
                dataType: "",
                query: "",
            })
        } catch (err) {
            console.log(err)
        }
    }

    console.log('entry:', entry)
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
            <div>
                {isLoading ? loading() : loaded()}
            </div>
            <div className="basket">
                <h2>Create a Basket</h2>
                <form onSubmit={handleSubmit}>
                    <label for="dataType" >Data Type:</label>
                    <select name="dataType">Data Type
                        <option value="survey">Survey</option>
                        <option value="branded">Branded</option>
                    </select>
                    <label>Query:</label>
                    <input
                        placeholder="ex. apple"
                    >
                    </input>

                    <input type="submit" value="Create Basket"
                    />
                </form>
            </div>
        </div>
    )
}

export default Show