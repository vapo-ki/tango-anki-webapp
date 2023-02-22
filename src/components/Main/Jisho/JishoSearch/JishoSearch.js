import React, { useRef, useEffect } from 'react'
import './JishoSearch.css'

export default function Navbar(props) {
  const jishoSearchTerm = useRef()

  useEffect(() => {
    const interval = setInterval(() => {
      PingAnki()
      .then(res => {
        console.log(res);
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const PingAnki = () => {
    const body = {
      "action": "version",
      "version": 6
    }
  
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
      return 1
    })
    .catch(error => {
      return 0
    })
  }

  function SearchJisho(e) {
    if (jishoSearchTerm.current.value.trim().length === 0) {
      props.reset()
      return
    }
    if (e.keyCode != null) {
      if (e.keyCode !== 13) {
        return
      }
    }
    

    fetch("https://tango-api.cyclic.app/jishoResult/" + jishoSearchTerm.current.value)
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
    <a className='logo' href="https://tango.cyclic.app/">単語</a>
    <div className='jishoSearchContainer'>
        <input className='jishoSearchBar' type="text" ref={jishoSearchTerm} placeholder="Search Jisho..." onKeyDown={SearchJisho} />
        <button className="jishoSearchButton" onClick={SearchJisho} >Search Jisho</button>
    </div>

    
    </>
    
  )
}
