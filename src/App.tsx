import { useEffect, useRef, useState } from "react"
import createWord from "./lib/createWord";
import formatTime from "./lib/formatTime";

export default function App() {
  const [word, setWord] = useState("");
  const cancelledRef = useRef(false)
  const [time, setTime] = useState("")
  const [submitWord, setSubmitWord] = useState("");
  const [succesMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const startTime = useRef(Date.now())

  const updateWord = async (cancelled: boolean) => {
    if(cancelled) return
    const newWord = await createWord()
    if(!newWord) return setErrorMsg("Error while getting new word")
    setWord(newWord)
  startTime.current = Date.now()
  }

  useEffect(() => {
    updateWord(cancelledRef.current)
    return () => { cancelledRef.current = true }
  }, [])

  useEffect(() => {
    if(word === "") return
    setSubmitWord(w => w.toLowerCase())
    if(submitWord === word) {
      setSuccessMsg("Correct!")

      setWord("")
      setTime(formatTime(Date.now() - startTime.current))

      setTimeout(() => {
        setSuccessMsg("")
        setSubmitWord("")
        updateWord(false)
      }, 1000);
    }
  }, [submitWord])

  return (<>
    <p className="font-bold text-xl">Word Typer</p>

    <br />

    <p>{word}</p>

    <br />
    <input type="text" className="border-2 rounded-xl p-1" placeholder="Write word" value={submitWord} onChange={(e) => setSubmitWord(e.target.value)} />

    <br />

    {time && <p>Time: {time}</p>}
    
    <br />

    <p className="text-green-700">{succesMsg}</p>
    <br />
    <p className="text-red-700">{errorMsg}</p>
  </>)
}
