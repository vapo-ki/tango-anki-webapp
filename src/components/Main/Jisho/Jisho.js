import React, { useRef, useState } from 'react';
import JishoEntry from './JishoEntry';
import './Jisho.css'

export default function Jisho(props) {
  const jishoSearchTerm = useRef()
  const [entries, setEntries] = useState([])


  function SearchJisho(e) {
    fetch("https://enthusiastic-ruby-coyote.cyclic.app/jishoResult/" + jishoSearchTerm.current.value)
    .then(response => {
      if (!response.ok) {throw new Error(response.status)}
      return response.json()
    })
    .then(json => {
      return setEntries(json.data)
    })
    .catch(error => alert("Fetching Jisho failed. Try again later. " + error))

    ResetSearch()
  }

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
        <input className='jishoSearchBar' type="text" ref={jishoSearchTerm}/>
        <button className="jishoSearchButton" onClick={SearchJisho}>Search Jisho</button>
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
