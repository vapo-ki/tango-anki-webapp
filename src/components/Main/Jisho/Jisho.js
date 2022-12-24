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
    
  }, [entries])

  function ResetSearch() {
    props.SelectTerm({})
  }

  const isEntrySelected = (entry) => {
    if (props.selectedTerm.slug != null && props.selectedTerm.slug == entry.slug) {
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
        <JishoSearch setEntries={setEntries} ResetSearch={ResetSearch}/>
      </div>

      <div className='jishoEntries'>
        {entries.map(entry => {
          return <JishoEntry key={entry.slug} SelectTerm={props.SelectTerm} info={entry} isActive={isEntryActive(entry)} isSelected={isEntrySelected(entry)}/>
        })}
      </div>

    </div>
    

    </>
  )
}
