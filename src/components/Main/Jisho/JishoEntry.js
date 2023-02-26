import React, { useEffect, useState } from 'react'
import './JishoEntry.css'
import JishoSense from './JishoSense'

export default function JishoEntry(props) {
  const [ entry, setEntry ] = useState({})
  const [ selectedSenses, setSenses ] = useState([])

  //Do once on load
  useEffect(() => {
    ExtractInformation()
  }, [])

  useEffect(() => {
    if (props.isSelected) {
      props.SelectTerm(entry)
    }
    console.log(entry);
  }, [entry])

  const SetSenses = (sense, isRemoving) => {
    if (isRemoving) {
      if(selectedSenses.some(senseSome => senseSome.id === sense.id)) {
        setSenses(selectedSenses.filter(item => item.id != sense.id))
      }
    } else {
      if (!selectedSenses.findIndex(e => e.id != sense.id) > -1 ) {
        setSenses(oldArray => [...oldArray, sense])
      }
    }
  }
  
  useEffect(() => {
    ExtractInformation()
  }, [selectedSenses])

  function ExtractInformation() {
    let tempEntry = {}
    tempEntry.slug = props.info.japanese[0].word
    if (tempEntry.slug == undefined) {
      tempEntry.slug = props.info.japanese[0].reading
    }

    tempEntry.reading = props.info.japanese[0].reading
    if (tempEntry.reading == undefined || tempEntry.reading == tempEntry.slug) {
      tempEntry.reading = ""
    }

    let senses = []
    for (var sense in selectedSenses) {
      senses.push({
        "pos": selectedSenses[sense].pos,
        "definitions": selectedSenses[sense].english_definitions,
        "tags": selectedSenses.tags
      })
      console.log(selectedSenses);
    }
    tempEntry.senses = senses
    
    tempEntry.jlpt = props.info.jlpt[0]
    tempEntry.is_common = props.info.is_common
    tempEntry.tags = props.info.tags

    tempEntry.id = props.info.id

    setEntry(tempEntry)
  }

  let extraTemplate = () => {
    let jlpt = () => {
      if (props.info.jlpt[0] != null) {
        return (
          <>
            {props.info.jlpt[0]}
          </>
        )
      }
      return (<></>)
    }

    let isCommon = () => {
      if (props.info.is_common == true) {
        return (
          <>
            is common
          </>
        )
      }
      return (<></>)
    }

    const resetEntry = () => {
      setSenses([])
      props.SelectTerm({})
    }

    const backButton = () => {
      if (props.isSelected == true) {
        return (
          <><br />
          <button className='invertedButton unselectButton' onClick={() => resetEntry()}>Change Term</button>
          </>
          
        )
      }
    }

    return (
      <div className='entryExtraContainer'>
        <div className='entryJlpt'>
          {jlpt()}

        </div>
        <div className='entryIsCommon'>
          {isCommon()}
        </div>
        <div className='entryUnselect'>
          {backButton()}
        </div>
        <div className='entrySearchKana'>
          
        </div>
      </div>
    )
  }

  const getEntryInfo = () => {
    const entryInfo = () => {
      return (
        <div className='entryContainer'>
            <div className='entrySlugContainer'>
              <div className='entrySlugWrapper'>
              <div className='entryReading'>
                {entry.reading}
              </div>
              <div className='entrySlug'>
                {entry.slug}
              </div><br/>
              </div>
              <div className='entryExtra'>
                {extraTemplate()}
              </div>
            </div>
            <div className='entryTranslation'>
              {props.isSelected ? <h3>Select <span className='special-text'>Translations</span></h3> : ""}
              {
                Object.entries(props.info.senses).map(([key, sense]) => {
                  let first = false
                  if (key == 0) { first = true }
                  return <JishoSense key={key} SetSenses={SetSenses} id={key} pos={sense.parts_of_speech} english_definitions={sense.english_definitions} tags={sense.tags} isEntrySelected={props.isSelected} first={first}/>
                })
              }
            </div>
          </div>
      )
    }

    if (!props.isSelected) {
      return (
        <button className='jishoEntryButton' onClick={() => props.SelectTerm(entry)}>
          {entryInfo()}
        </button>
      )
    } else {
      return (
        <>
          <div className='jishoEntrySelected'>
            {entryInfo()}
          </div>
        </>
      )
    }
  }

  return (
    <>
      <div className={props.isActive ? 'cardContainer-active' : 'cardContainer-inActive'}>
        {getEntryInfo()}
      </div>
    </>
  )
}
