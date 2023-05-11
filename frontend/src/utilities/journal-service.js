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
        

    }catch(err){
        console.log(err)
        throw new Error(err)
    }
}

export async function getEntry(id){
    try{
        const foundEntry = await journalAPI.detail(id)
        return foundEntry
    }catch(err){
        console.log(err)
        throw new Error(err)
    }
}

export async function deleteEntry(id){
    try{
        const deletedEntry = await journalAPI.destroy(id)
        return deletedEntry

    }catch(err){
        console.log(err)
        throw new Error(err)
    }
}

export async function updateEntry(id, data){
    try{
        const updatedEntry = await journalAPI.update(id, data)
        return updatedEntry

    }catch(err){
        console.log(err)
        throw new Error(err)
    }
}

