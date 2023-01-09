import React, { useState, useEffect } from 'react'
import Sentence from './Sentence'
import './Sentences.css'

export default function Sentences(props) {
  const [ sentences, setSentences ] = useState([])
  const sentenceDB = props.sentenceDB

  useEffect(() => {
    if (sentenceDB != undefined) {
      console.log("Check Database for sentence...");
      let temp = []
      for (var sentence in sentenceDB){
        if (sentenceDB[sentence].sentenceJp.indexOf(props.term) !== -1) {
          temp.push(sentenceDB[sentence])
        }
      }
      props.SelectSentence({})
      setSentences(temp)
    }
  }, [sentenceDB, props.term])

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
      sentenceFurigana: ""
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
      <div className='sentencesContainer'>
        <div className={props.selectedSentence.sentenceEn != null ? 'sentencesSeperator-inactive' : 'sentencesSeperator'}>
          <hr></hr>
          <h1>Select Sentence</h1>
        </div>
        <div className='sentences'>
          {sentences.map(sentence => {
            return <Sentence key={sentence._id} SelectSentence={props.SelectSentence} sentenceEn={sentence.sentenceEn} sentenceJp={sentence.sentenceJp} isSelected={isSentenceSelected(sentence)} isActive={isSentenceActive(sentence)}/>
          })}
        </div>
        <div className='noSentence'>
          <button className='noSentenceButton button' onClick={SelectNullSentence} >Continue without sentence...</button>
        </div>
      </div>
    </>
  )
}
