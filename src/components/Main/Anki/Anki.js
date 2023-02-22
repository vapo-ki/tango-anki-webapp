import React, { useEffect, useRef, useState } from 'react'
import './Anki.css'
import Model from './Model'
import Card from './Card'
import Audio from './Audio.js'

export default function Anki(props) {
  const [ model, setModel ] = useState()
  const [ cardData, setCardData ] = useState()
  const [ deckNameList, setDeckNameList ] = useState([])
  const [ sentenceAudio, setSentenceAudio ] = useState("")
  const [ selectedDeck, selectDeckName ] = useState("")

  const deckName = useRef("TangoDeck")
  const modelName = "Tango_v1.2"
  const defaultDeck = "TangoDeck"

  const [ exportOptions, setExportOptions ] = useState({
    audio: true
  })

  useEffect(() => {
    HTTPPost(GetDeckNamesBody())
    .then(result => {
      setDeckNameList(result.result)
    })

    console.log(cardData);
  }, [])

  useEffect(() => {

  }, [exportOptions])

  const CardOption = (option) => {
    return exportOptions[option]
  }

  const InitModel = (modelTemplate) => {
    setModel(modelTemplate)
  }

  const GetCardData = (cardData) => {
    setCardData(cardData)
  }

  const GetSentenceAudio = (audioLink) => {
    setSentenceAudio(audioLink)
  }

  const CreateDeckBody = () => {
    if (deckName.current.value == "") {
      return ({
        "action": "createDeck",
        "version": 6,
        "params": {
            "deck": defaultDeck
        }
      })
    }

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
                "deckName": props.selectedDeck,
                "modelName": modelName,
                "fields": {
                    "Slug": cardData.Slug,
                    "SlugFurigana": cardData.SlugFurigana,
                    "Sentence": cardData.Sentence,
                    "SentenceFurigana": cardData.SentenceFurigana,
                    "SentenceEn": cardData.SentenceEn,
                    "Pos": cardData.Pos,
                    "Definitions": cardData.Definitions,
                    "SentenceAudio": CardOption("audio") ? cardData.SentenceAudio : ""
                }
            }
        }
      }
  }

  const StoreAudioFileBody = () => {
    return {
      "action": "storeMediaFile",
      "version": 6,
      "params": {
          "filename": props.sentence.audioTag + '.mp3',
          "url": sentenceAudio
        } 
    }
  }

  const GetDeckNamesBody = () => {
    return {
      "action": "deckNames",
      "version": 6
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

    return fetch('http://localhost:8765', request)
    .then(response => {
      return response.json()
    })
    .then(json => {
      return json
    })
  }

  function SendToAnki(content) {
    console.log("Sending Card...");

    //HTTPPost(CreateDeckBody())
    HTTPPost(model)
    HTTPPost(GetCardBody())
    HTTPPost(StoreAudioFileBody())

    content.preventDefault()
  }

  const HandleOptions = (optionCheckbox) => {
    const optionId = optionCheckbox.target.id
    setExportOptions({...exportOptions, [optionId]: !exportOptions[optionId]})
  }

  const options = () => {
    return(
      <div className='options'>
        <h2>Card <span className='special-text'>Options</span></h2>
        <div className='optionsWrapper'>
          <div className='optionAudio'>
            <span>Play Audio</span>
            <div className='optionContainer'>
              <input type="checkbox" className={exportOptions.audio ? "checkmarkChecked" : ""} id='audio' onChange={HandleOptions} checked={exportOptions.audio ? 'checked' : ''}></input>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const send = () => {
    const handleChange = (selectedDeckName) => {
      props.selectDeck(selectedDeckName.target.value)
    }

    return (
      <div className='sendArea'>
        <h2>Select <span className='special-text'>Deck</span>:</h2>
        <form className='ankiDeck' onSubmit={SendToAnki}>
          <select name='decks' className='decks' onChange={handleChange} value={props.selectedDeck}>
            {deckNameList.map(deck => {
              return <option key={deck} value={deck}>{deck}</option>
            })}
          </select>
          <input type="submit" className='ankiButton' value="Send to Anki"></input>
        </form>
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
                  <div className='cardSense' key={sense.definitions[0]}>
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

          <div className='audioArea'>
            
            {CardOption("audio") ? <Audio audioTag={props.sentence.audioTag} library={props.sentence.library} SetAudio={GetSentenceAudio}/> : ""}
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
        <div className='anki-send'>
            {send()}
        </div>
        <Model modelTemplate={InitModel} modelName={modelName} />
        <Card getCardData={GetCardData} term={props.term} sentence={props.sentence}/>
      </div>
  )

  
}
