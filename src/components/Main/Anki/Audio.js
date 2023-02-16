import React, {useEffect, useState, useRef, createRef} from 'react'
import './Audio.css'

export default function Audio(props) {
    const [ sentenceAudio, setSentenceAudio ] = useState("")
    const audioRef = createRef()

    useEffect(() => {
        if (props.library != undefined) {
            fetch("https://tango-api.cyclic.app/audio/" + props.library + '/' + props.audioTag)
            .then(response => {
                if (!response.ok) {throw new Error(response.status)}
                return response.json()
            })
            .then(json => {
                setSentenceAudio(json)
                props.SetAudio(json)
            })
            .catch(error => {
                alert("Error fetching audio Link..." + error)
            })
        }
    }, [])

    const PlayAudio = () => {
        audioRef.current.play()
    }

    return (<>

    {sentenceAudio != "" ? 
        <>
            <div className='audioArea'>
                <div className='playAudioText'>Play Audio</div> 
                <audio src={sentenceAudio} ref={audioRef}></audio>
                <button className='audioButton' onClick={PlayAudio} title='Play Sentence Audio'><img src={require('../../../media/audioButton.svg')}/></button>
            </div>
            
        </>:
        <></>
        }
    </>)
}
