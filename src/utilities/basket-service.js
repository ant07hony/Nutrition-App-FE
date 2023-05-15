import * as basketAPI from './basket-api'


export async function getBaskets() {
    try {
        const basketData = await basketAPI.index()
        return basketData
    } catch (err) {
        console.log(err)
        return err
    }
}

export async function createBasket(data) {
    try {

        const newBasket = await basketAPI.create(data)
        return newBasket


    } catch (err) {
        console.log(err)
        throw new Error(err)
    }
}

export async function getBasket(id) {
    try {
        // console.log(id)
        const foundBasket = await basketAPI.detail(id)
        // console.log(id)
        // console.log('found Entry', foundEntry)
        return foundBasket
    } catch (err) {
        console.log(err)
        throw new Error(err)
    }
}

export async function deleteBasket(id) {
    try {
        const deletedBasket = await basketAPI.destroy(id)
        return deletedBasket

    } catch (err) {
        console.log(err)
        throw new Error(err)
    }
}

export async function updateBasket(id, data) {
    try {
        const updatedBasket = await basketAPI.update(id, data)
        return updatedBasket

    } catch (err) {
        console.log(err)
        throw new Error(err)
    }
}
