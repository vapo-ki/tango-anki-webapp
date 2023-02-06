import React, { useEffect } from 'react'

export default function ModelTemplate(props) {
    const css = `
* {
    text-align: center;
}

.slug {
	font-size: 50px;
	margin-bottom: 10px;
}

.slug-front {
	font-size: 50px;
 	margin-top: 53px;
}

.sentence {
  	font-size: 30px;
	margin-top: auto;
}

#senses {
	display: grid;
	grid-template-columns: 45% 55%;
	column-gap: 12px;
	row-gap: 2px;

	margin-top: 10px;
	margin-bottom: 20px;
}

.pos {
	font-size: 12px;
	padding-top: 3px;
	text-align: right;
}

.definition{
	font-size: 15px;
	text-align: left;
}
    `

    const frontHTML = `
    <div class='slug-front'>{{Slug}}</div>

    </br></br></br></br></br></br></br></br></br>
    
    <div class='sentence'>{{Sentence}}</div>
    `

    const backHTML = `
    
    <div class='slug'>{{furigana:SlugFurigana}}</div>

    <hr>
    
    <div id='senses'></div>
    
    
    <div id='card2'></div>
    
    <div class='sentenceContainer'>
        <div class='sentence'>{{furigana:SentenceFurigana}}</div>
		<div class='sentenceEn'>{{SentenceEn}}</div>
    </div>
    
    <a class="japanese ios-only" href="https://jisho.org/search/{{Slug}}">Jisho</a>
    
    <br><br><br>
    <div>{{SentenceAudio}}</div>
    
    <script> 
        let senses = document.getElementById("senses");
        let poss = "{{Pos}}".toString().split("$");
        let definitions = "{{Definitions}}".toString().split("$");
        
        for (let i = 0; i < poss.length; i++) {
            let definition = document.createElement("span");
            let pos = document.createElement("span");
    
            definition.classList.add("definition");
            pos.classList.add("pos");
        
            definition.innerText = definitions[i];
            pos.innerText = poss [i];
    
            senses.appendChild(pos);
            senses.appendChild(definition);
        }
    
    
    </script>
    
    `

    const modelTemplate = () => {
        return {
            "action": "createModel",
            "version": 6,
            "params": {
                "modelName": props.modelName,
                "inOrderFields": ["Slug", "SlugFurigana", "Sentence", "SentenceFurigana", "Pos", "Definitions", "SentenceEn", "SentenceAudio"],
                "css": css,
                "isCloze": false,
                "cardTemplates": [
                    {
                        "Name": "Test Card",
                        "Front": frontHTML,
                        "Back": backHTML
                    }
                ]
            }
        }
    }

    

    useEffect(() => {
        props.modelTemplate(modelTemplate())
    }, [])

  return (
    <>
    </>
  )
}
