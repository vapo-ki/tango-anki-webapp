import React, {useEffect, useState, useRef, createRef} from 'react'
import './Audio.css'

export default function Audio(props) {
    const [ sentenceAudio, setSentenceAudio ] = useState()
    const audioRef = createRef()

    useEffect(() => {
        fetch("http://localhost:3621/audio/" + props.library + '/' + props.audioTag)
        .then(response => {
            if (!response.ok) {throw new Error(response.status)}
            return response.json()
        })
        .then(json => {
            console.log("Successfully fetched Audio Link!");
            setSentenceAudio(json)
            props.SetAudio(json)
        })
        .catch(error => {
            alert("Error fetching audio Link..." + error)
        })
    }, [])

    const PlayAudio = () => {
        audioRef.current.play()
    }

    return (<>
    <audio src={sentenceAudio} ref={audioRef}></audio>

    <button className='audioButton' onClick={PlayAudio} title='Play Sentence Audio'><img src={require('../../../media/audioButton.svg')}/></button>
    </>)
}
