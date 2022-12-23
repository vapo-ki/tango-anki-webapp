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
                <button className='senseButton' onClick={() => ToggleSense()}>
                    <div className='senseInfo'>
                        <div className='sensePos'>
                            {props.pos.join(", ")}
                        </div>
                        <div className='senseTranslations'>
                            {props.english_definitions.join(", ")}
                        </div>
                    </div>
                    <input type="checkbox" className='senseCheckbox' onChange={e => {}} checked={isSelected ? 'checked' : ''}></input>
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
