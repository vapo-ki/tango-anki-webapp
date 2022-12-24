import React, { useRef, useState } from 'react'
import './Anki.css'
import Model from './Model';
import Card from './Card';

export default function Anki(props) {
  const [ model, setModel ] = useState();
  const [ cardData, setCardData ] = useState();
  const [ cardLanguage, setCardLanguage ] = useState("japanese")

  const deckName = useRef()
  const modelName = "TangoModel"

  const InitModel = (modelTemplate) => {
    setModel(modelTemplate)
  }

  const GetCardData = (cardData) => {
    setCardData(cardData)
  }

  const CreateDeckBody = () => {
    return ({
      "action": "createDeck",
      "version": 6,
      "params": {
          "deck": deckName.current.value
      }
    })
  }

  const GetCardBody = () => {
    return {
      "action": "guiAddCards",
      "version": 6,
      "params": {
          "note": {
              "deckName": deckName.current.value,
              "modelName": modelName,
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

  function HTTPPost (body) {
    const request = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }

    fetch('http://localhost:8765', request)
    .then(response => {
      return response.json()
    })
    .then(json => {
      console.log(json);
    })
  }

  function SendToAnki(content) {
    console.log("Sending Card...");

    HTTPPost(CreateDeckBody())
    HTTPPost(model)
    HTTPPost(GetCardBody())

    /* const request = {
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

      if (json.error === "deck was not found: " + deckName.current.value) {
        console.log("Yep deck not found");

        const request = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(CreateDeckBody())
        }
    
        fetch('http://localhost:8765', request)
        .then(response => {
          return response.json()
        })
        .then(json => {
          console.log("Sending Card...");
          const request = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(GetCardBody())
      }
        })
      }
      
      if (json.error === "model was not found: " + modelName) {
        console.log("Yep model not found")

        const request = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(model)
        }
    
        fetch('http://localhost:8765', request)
        .then(response => {
          return response.json()
        })
        .then(json => {
          console.log("Sending Card...");
          const request = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(GetCardBody())
      }
        })
      }

    })
    .catch(err => {
        console.log(err);
    }) */
  }

  const options = () => {
    return(
      <div className='options'>
        <h2>Enter <span className='special-text'>Deck Name</span>:</h2>
        <input className='ankiDeckName' type="text" ref={deckName} value='TangoDeck' />
        <button className='ankiButton' onClick={SendToAnki}>Send Anki</button>
      </div>
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
          <div className='cardSide'>Card Front</div>
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
        <div className='cardSide'>Card Back</div>
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
          {options()}
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
        <Model modelTemplate={InitModel} modelName={modelName} />
        <Card getCardData={GetCardData} term={props.term} sentence={props.sentence}/>
      </div>
  )

  
}
