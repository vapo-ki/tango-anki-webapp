import React from 'react'
import './how_to.css'

export default function how_to() {
  return (
    <div className='how-to'>
      <br/>
      <h1>Welcome to <span className='special-text'>Tango</span></h1>
      <br></br>
      <span>
        Tango allows you to create Anki cards quickly!<br></br>
        Simply search for a term, select an example sentence and send it straight to Anki!
      </span>
      <br></br><br></br><br></br>
      <h2>Prerequisites</h2>
      <br></br>
      <span>
       - Anki must be installed<br></br>
       - Install <a className='link' href='https://ankiweb.net/shared/info/2055492159'>Anki Connect</a><br></br>
       - In the Anki Connect plugin configs, change <span className='special-text'>"http://localhost"</span> to <span className='special-text'>"*"</span><br></br>
       - Restart Anki!
      </span><br/><br/><br/>
      <h3>Anki has to stay open while you use the website!</h3>
    </div>
  )
}
