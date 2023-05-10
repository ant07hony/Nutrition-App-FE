import * as journalAPI from './journal-api'


export async function getEntries(){
    try{
        const data = await journalAPI.index()
        return data
    }catch(err){
        console.log(err)
        return err
    }
}

export async function createJournalEntry(data){
    try{

        const newEntry = await journalAPI.create(data)
        return newEntry
        console.log(newEntry)

    }catch(err){
        console.log(err)
        throw new Error(err)
    }
}

export async function getEntry(id){
    try{
        const foundEntry = await journalAPI.detail(id)
        return foundEntry
        console.log(foundEntry)
    }catch(err){
        console.log(err)
        throw new Error(err)
    }
}

