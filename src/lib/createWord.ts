const apiUrl = "https://random-word-api.herokuapp.com"

export default async function createWord(): Promise<undefined | string> {
    try{
        const res = await fetch(`${apiUrl}/word`);
        if(!res.ok) return;
        const json = await res.json()
        const word = json[0] as string | undefined

        if(!word) return

        return word
    }
    catch(err){
        console.error("Error while getting word:" , err)
        return
    }
}