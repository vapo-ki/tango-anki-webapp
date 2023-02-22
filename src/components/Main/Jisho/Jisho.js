import React, { useEffect, useRef, useState } from 'react';
import JishoEntry from './JishoEntry';
import JishoSearch from './JishoSearch/JishoSearch'
import './Jisho.css'

export default function Jisho(props) {
  const jishoSearchTerm = useRef()
  const [entries, setEntries] = useState([])

  useEffect(() => {
    if (entries.length <= 0) {
      props.setIsSearching(false)
    } else {
      props.setIsSearching(true)
    }
    console.log(entries);
  }, [entries])

  function ResetSearch() {
    props.SelectTerm({})
  }

  const Reset = () => {
    setEntries([])
    props.reset()
  }

  const isEntrySelected = (entry) => {
    var slug
    if (entry.japanese != undefined) {
      slug = entry.japanese[0].word
      if (slug == undefined) {
        slug = entry.japanese[0].reading
      }
    }
    
    if (props.selectedTerm.slug != null && props.selectedTerm.slug == slug) {
      return true
    }
    return false
  }

  const isEntryActive = (entry) => {
    if (props.selectedTerm.slug == null){
      return true
    } else if (isEntrySelected(entry)) {
      return true
    }
    return false
  }

  return (
    <>
    <div className='jisho'>
      <div className='jishoSearch'>
        <JishoSearch setEntries={setEntries} ResetSearch={ResetSearch} reset={Reset}/>
      </div>
      {!entries.length <= 0 ? 
      <div className={Object.keys(props.selectedTerm).length <= 0 ? 'jishoWrapper' : 'jishoWrapperSelectedTerm'}>
        {Object.keys(props.selectedTerm).length <= 0 ?
          <div className='jishoEntryHeaderWrapper'>
            <h2>Select <span className='special-text'>Term</span></h2>
          </div>
          : ""
        }
        
        <div className='jishoEntries'>
          {entries.map(entry => {
            return <JishoEntry key={entry.slug} SelectTerm={props.SelectTerm} info={entry} isActive={isEntryActive(entry)} isSelected={isEntrySelected(entry)}/>
          })}
        </div>
      </div>
      : ""}
    </div>
    

    </>
  )
}
