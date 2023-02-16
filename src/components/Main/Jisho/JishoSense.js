import React, { useState, useEffect } from 'react'
import './JishoSense.css'

export default function JishoSense(props) {
    const [ isSelected, select ] = useState(props.first)

    function ToggleSense() {
        select(!isSelected)
        props.SetSenses({ id: props.id, pos: props.pos, english_definitions: props.english_definitions}, isSelected)
    }

    useEffect(() => {
        if (props.isEntrySelected) {
            props.SetSenses({ id: props.id, pos: props.pos, english_definitions: props.english_definitions}, !isSelected)
        }
    }, [props.isEntrySelected])

    const infoSelected = () => {
        return (
            <div className='senseContainer'>
                <button className={isSelected ? 'senseButtonSelected' : 'senseButton'} onClick={() => {ToggleSense()}}>
                    <div className='senseInfo'>
                        <div className='sensePos'>
                            {props.pos.join(", ")}
                        </div>
                        <div className='senseTranslations'>
                            <span className='special-text'>{props.english_definitions.join(", ")}</span>
                        </div>
                        <div className='senseTags'>
                            {props.tags.join(", ")}
                        </div>
                    </div>
                </button>
            </div>
        )
    }

    const infoUnselected = () => {
        return (
            <div className='senseContainer'>
                    <div className='senseInfo'>
                        <div className='sensePos'>
                            {props.pos.join(", ")}
                        </div>
                        <div className='senseTranslations'>
                            {props.english_definitions.join(", ")}
                        </div>
                    </div>
            </div>
        )
    }

    const sense = () => {
        return (props.isEntrySelected ? infoSelected() : infoUnselected())
    }

  return (
    <>
        {sense()}
    </>
  )
}
