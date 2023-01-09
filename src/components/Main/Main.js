import React, { useEffect, useState } from 'react'
import Anki from './Anki/Anki'
import Jisho from './Jisho/Jisho'
import Sentences from './SentenceDB/Sentences'
import HowTo from './HowTo/how_to'
import './Main.css'

export default function Main() {
    const [term, setTerm] = useState({})
    const [sentence, setSentence] = useState({})
    const [sentenceDB, setSentenceDB] = useState({})
    const [isSearching, setIsSearching] = useState(false)

    //Load SentenceDB
    useEffect (() => {
        console.log("Fetching Database...");
        fetch("https://tango-api.cyclic.app/sentenceDB/")
        .then(response => {
            if (!response.ok) {throw new Error(response.status)}
            return response.json()
        })
        .then(json => {
            setSentenceDB(json)
            console.log("Successfully fetched Database!");
        })
        .catch(error => {
            alert("Error fetching sentence Database..." + error)
        })
    }, [])

    const SelectTerm = selectedTerm => {
        setTerm(selectedTerm)
    }

    const SelectSentence = selectedSentence => {
        if(selectedSentence.sentenceEn != sentence.sentenceEn) {
            setSentence(selectedSentence)
        } else {
            setSentence({})
        }
    }

    return (
        <div className='main'>  
            <Jisho SelectTerm={SelectTerm} selectedTerm={term} setIsSearching={setIsSearching} />
            {isSearching ? "" : <HowTo />}
            {Object.keys(term).length !== 0 ? <Sentences sentenceDB = {sentenceDB} SelectSentence={SelectSentence} selectedSentence={sentence} term={term.slug}/> : ''}
            {Object.keys(sentence).length !== 0 && Object.keys(term).length !== 0 ? <Anki term={term} sentence={sentence}/> : ''}
        </div>
    )
}
