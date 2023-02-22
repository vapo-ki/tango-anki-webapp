import React, { useEffect } from 'react'

export default function Card(props) {
    const CardData = () => {
        let cardData = {
            Slug: "",
            SlugFurigana: "",
            Sentence: "",
            SentenceFurigana: "",
            SentenceEn: "",
            Pos: "",
            Definitions: "",
            SentenceAudio: ""
        }

        cardData.Slug = props.term.slug

        cardData.SlugFurigana = props.term.slug
        if (props.term.reading != "") {
            cardData.SlugFurigana += "[" + props.term.reading + "]"
        }

        cardData.Sentence = props.sentence.sentenceJp
        cardData.SentenceFurigana = props.sentence.sentenceFurigana
        cardData.SentenceEn = props.sentence.sentenceEn

        const senseData = () => {
            let posArray = [] 
            let defArray = []

            props.term.senses.forEach(sense => {
                posArray.push(sense.pos.join(", "))
                defArray.push(sense.definitions.join(", "))
            });

            return [posArray.join("$ "), defArray.join("$ ")]
        }

        cardData.Pos = senseData()[0]
        cardData.Definitions = senseData()[1]

        if (props.sentence.sentenceJp != "") {
            cardData.SentenceAudio = '[sound:' + props.sentence.audioTag + '.mp3]'
        }
        console.log(cardData);
        return cardData
    }

    useEffect(() => {
        props.getCardData(CardData())
    }, [])

  return (
    <>
    </> 
  )
}
