import React, { useEffect, useState } from 'react'
import './Anki.css'
import Model from './Model';
import Card from './Card';

export default function Anki(props) {
  const [ model, setModel ] = useState();
  const [ cardData, setCardData ] = useState();
  const [ cardLanguage, setCardLanguage ] = useState("japanese")

  const InitModel = (modelTemplate) => {
    setModel(modelTemplate)
  }

  const GetCardData = (cardData) => {
    setCardData(cardData)
  }

  const GetCardBody = () => {
    return {
      "action": "guiAddCards",
      "version": 6,
      "params": {
          "note": {
              "deckName": "TestDeck",
              "modelName": "TestModel2",
              "fields": {
                  "Slug": cardData.Slug,
                  "SlugFurigana": cardData.SlugFurigana,
                  "Sentence": cardData.Sentence,
                  "SentenceFurigana": cardData.SentenceFurigana,
                  "SentenceEn": cardData.SentenceEn,
                  "Pos": cardData.Pos,
                  "Definitions": cardData.Definitions
              }
          }
      }
    }
  }

  function SendToAnki(content) {
    console.log("Sending Card...");

    const request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(GetCardBody())
    }

    fetch('http://localhost:8765', request)
    .then(response => {
        return response.json()
    })
    .then(json => {
      console.log(json);
    })
    .catch(err => {
        console.log(err);
    })
  }

  const options = () => {
    return(
      <>
      Options
      </>
    )
  }

  const cardFront = () => {
    return(
      <>
        {getJapaneseFront()}
      </>
    )
  }

  const cardBack = () => {
    return(
      <>
        {getEnglishBack()}
      </>
    )
  }

  const getJapaneseFront = () => {
    return (
      <>
        <div className='cardFrontContent'>
          <div className='cardFrontSlug'>
            {props.term.slug}
          </div>
          <div className='cardFrontSentence'>
            {props.sentence.sentenceJp}
          </div>
        </div>
      </>
    )
  }

  const getEnglishFront = () => {
    return (
      <>
        <div className='cardFrontContent'>
        </div>
      </>
    )
  }

  const getEnglishBack = () => {
    return (
      <>
        <div className='cardBackContent'>
          <div className='cardBackSlugContent'>
            <div className='cardBackSlugReading'>
              {props.term.reading}
            </div>
            <div className='cardBackSlug'>
              {props.term.slug}
            </div>
          </div>

          <hr></hr>
          
          <div className='cardSenses'>
            {props.term.senses.map(sense => {
                return (
                  <div className='cardSense'>
                    <div className='cardSensePos'>
                      {sense.pos.join(", ")}
                    </div>
                    <div className='cardSenseDefinitions'>
                      {sense.definitions.join(", ")}
                    </div>
                  </div>
                )
              })}
          </div>

          <div className='cardBackSentence'>
            <div className='cardBackSentenceJp'>
              {props.sentence.sentenceFurigana}
            </div>
            <div className='cardBackSentenceEn'>
              {props.sentence.sentenceEn}
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
      <div className='anki-active'>
        <div className='anki-options'>
          
        </div>
        <div className='anki-card'>
          <div className='anki-front'>
            {cardFront()}
          </div>
          <div className='vr'></div>
          <div className='anki-back'>
            {cardBack()}
          </div>
        </div>
        <button onClick={SendToAnki}>Send Anki</button>
        <Model modelTemplate={InitModel} />
        <Card getCardData={GetCardData} term={props.term} sentence={props.sentence}/>
      </div>
  )

  
}
