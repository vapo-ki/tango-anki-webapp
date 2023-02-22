import React from 'react'
import './how_to.css'

export default function how_to() {
  return (
    <div className='how-to'>
      <br/>
      <h1>Welcome to <span className='special-text'>Tango</span> v1.1</h1>
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
       - In the Anki Connect plugin configurations, change <span className='special-text'>"http://localhost"</span> to <span className='special-text'>"*"</span><br></br>
       <br></br>
       If anki is connected successfully, the logo of the website in the top left will be <span className='special-text'>orange</span>.
      </span><br/><br/>
      <span className='special-text'><h2>Anki has to stay open while you use the website!</h2></span>
      <br></br><br></br>
      <h2>Sources</h2><br></br>
      <span>
        The sentences were extracted from these sources:<br></br><br></br>
         - Nayr's Core 5k Revised <a href='https://ankiweb.net/shared/info/813424842'>LINK</a><br></br>
         - Japanese Core 2000 2k - Sorted w/ Audio <a href='https://ankiweb.net/shared/info/2141233552'>LINK</a><br></br>
      </span>
      <br></br><br></br>
      <h2>Planned features</h2><br></br>
      <span>
         - Waaaay more sentences. <br></br>
         - Sorting / Filtering sentences, as well as only showing a limited amount (paged)<br></br>
      </span>
      <br></br><br></br>
      <h2>Contact</h2><br></br>
      <span>
        If you have any questions or anything, please contact me at <span className='special-text'>kivulipo@gmail.com</span>
      </span>
    </div>
  )
}
