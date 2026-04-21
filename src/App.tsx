import { useEffect, useRef, useState } from "react"
import createWord from "./lib/createWord";

export default function App() {
  const [word, setWord] = useState("");
  const cancelledRef = useRef(false)

  const updateWord = async (cancelled: boolean) => {
    const newWord = await createWord()
    if(!newWord || cancelled) return
    setWord(newWord)
  }

  useEffect(() => {
    updateWord(cancelledRef.current)
    return () => { cancelledRef.current = true }
  }, [])

  return (<>
    <p className="font-bold text-xl">Word Typer</p>

    <br />

    <p>{word}</p>
  </>)
}
