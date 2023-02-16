import React, { useState, useEffect } from 'react'
import Sentence from './Sentence'
import './Sentences.css'

export default function Sentences(props) {
  const [ sentences, setSentences ] = useState([])
  const [ searchTerm, setSearchTerm ] = useState(props.term.slug)
  const sentenceDB = props.sentenceDB

  useEffect(() => {
    if (sentenceDB != undefined) {
      console.log("Checking Database for sentences containing:", searchTerm, "...");
      let temp = []
      for (var sentence in sentenceDB){
        if (sentenceDB[sentence].sentenceJp.indexOf(searchTerm) !== -1) {
          temp.push(sentenceDB[sentence])
        }
      }
      props.SelectSentence({})
      setSentences(temp)
    }
  }, [sentenceDB, searchTerm])

  const isSentenceSelected = (sentence) => {
    if (props.selectedSentence != null && props.selectedSentence.sentenceEn == sentence.sentenceEn) {
      return true
    }
    return false
  }

  const SelectNullSentence = () => {
    props.SelectSentence({
      sentenceJp: "",
      sentenceEn: "",
      sentenceFurigana: "",
      audioTag: ""
    })
  }

  const isSentenceActive = (sentence) => {
    if (props.selectedSentence.sentenceJp == null){
      return true
    } else if (props.selectedSentence.sentenceEn == sentence.sentenceEn) {
      return true
    }

    return false
  }

  return (
    <>
      <div className={props.selectedSentence.sentenceEn != null ? 'sentencesContainer-inactive' : 'sentencesContainer'}>
        <div className={props.selectedSentence.sentenceEn != null ? 'sentencesSeperator-inactive' : 'sentencesSeperator'}>
          <h2>Select <span className='special-text'>Sentence</span></h2>
          <div className='sentenceOptions'>
            <div className='sentenceOptionSearchKana'>
              <button className='invertedButton' onClick={() => {setSearchTerm(props.term.reading)}}>Search Kana</button>
            </div>
            <div className='sentenceOptionSearchKanji'>
              <button className='invertedButton' onClick={() => {setSearchTerm(props.term.slug)}}>Search Kanji</button>
            </div>
          </div>
        </div>
        <div className='sentences'>
          {sentences.map(sentence => {
            return <Sentence key={sentence._id} id={sentence.localId} library={sentence.library} SelectSentence={props.SelectSentence} sentenceEn={sentence.sentenceEn} sentenceJp={sentence.sentenceJp} isSelected={isSentenceSelected(sentence)} isActive={isSentenceActive(sentence)}/>
          })}
        </div>
          <div className='noSentence'>
            {Object.keys(props.selectedSentence).length <= 0 || props.selectedSentence.sentenceJp == "" ?
            <button className='noSentenceButton button' onClick={() => {SelectNullSentence()}}>{Object.keys(props.selectedSentence).length <= 0 ? "Continue without sentence..." : "Return to sentence search..."}</button> :
            "" }
            </div>
      </div>
    </>
  )
}
