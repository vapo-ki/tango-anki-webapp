import React, { useRef } from 'react'
import './JishoSearch.css'

export default function Navbar(props) {
  const jishoSearchTerm = useRef()

  function SearchJisho(e) {
    if (e.keyCode != null) {
      if (e.keyCode !== 13) {
        return
      }
    }


    fetch("https://enthusiastic-ruby-coyote.cyclic.app/jishoResult/" + jishoSearchTerm.current.value)
    .then(response => {
      if (!response.ok) {throw new Error(response.status)}
      return response.json()
    })
    .then(json => {
      return props.setEntries(json.data)
    })
    .catch(error => alert("Fetching Jisho failed. Try again later. " + error))

    props.ResetSearch()
  }

  return (
    <>
    <a className='logo' href="http://localhost:8080/">単語</a>
    <div className='jishoSearchContainer'>
        <input className='jishoSearchBar' type="text" ref={jishoSearchTerm} placeholder="Search Jisho..." onKeyDown={SearchJisho} />
        <button className="jishoSearchButton" onClick={SearchJisho} >Search Jisho</button>
    </div>

    
    </>
    
  )
}
