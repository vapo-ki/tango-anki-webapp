import React from 'react'
import './Sentence.css'

export default function Sentence(props) {

  const sentenceData = () => {
    var isReading = false
    let dataArray = ["", ""]
    for (var i = 0; i < props.sentenceJp.length; i++) {              
        if (props.sentenceJp[i] == "["){
            isReading = true
            dataArray[1] += props.sentenceJp[i]
        } else if (props.sentenceJp[i] == "]") {
            isReading = false
            dataArray[1] += props.sentenceJp[i] + " "
        } else {
            if (!isReading) {
                dataArray[0] += props.sentenceJp[i]
                dataArray[1] += props.sentenceJp[i]
            } else {
                dataArray[1] += props.sentenceJp[i]
            }
        }
    }

    return dataArray
  }

  function SelectSentence() {
    props.SelectSentence({ "sentenceJp": sentenceData()[0], "sentenceEn": props.sentenceEn, "sentenceFurigana": sentenceData()[1], "audioTag": props.library + props.id, "library": props.library})
  }

  const sentenceUnselected = () => {
    return (
        <button className='sentenceButton button' onClick={() => SelectSentence()}>
          <div className='sentenceJp'>{sentenceData()[0]}</div>
          <div className='sentenceEn'>{props.sentenceEn}</div>
        </button>
    )
  }

  const sentenceSelected = () => {
    return (
      <div className='sentenceSelected'>
        <div className='sentenceContent'>
          <div className='sentenceJp'>{sentenceData()[0]}</div>
          <div className='sentenceEn'>{props.sentenceEn}</div>
        </div>
        <button className='sentenceReset invertedButton' onClick={() => props.SelectSentence({})}>Change Sentence</button> 
      </div>
    )  
}

  return (
    <div className={props.isActive ? 'sentenceContainer-active' : 'sentenceContainer-inactive'}>
      {props.isSelected ? sentenceSelected() : sentenceUnselected()}
    </div>
  )
}
