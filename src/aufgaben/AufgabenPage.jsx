//Komponente von hier genommen https://github.com/ABSanthosh/react-quizlet-flashcard

import {FlashcardArray, useFlashcardArray} from 'react-quizlet-flashcard';
import "react-quizlet-flashcard/dist/index.css";

export default function AufgabenPage() {
    const deck = [
        {
            id: 1,
            front: {html: <div>What is the capital of Alaska?</div>},
            back: {html: <div>Juneau</div>},
        },
        {
            id: 2,
            front: {html: <div>What is the capital of California?</div>},
            back: {html: <div>Sacramento</div>},
        },
    ];

    const flipArrayHook = useFlashcardArray({
        deckLength: deck.length,
        showProgressBar: true,
    })


    return (
        <div>
            <h1>AufgabenPage</h1>
            <FlashcardArray deck={deck.map((card) => ({
                    ...card,
                    front: {
                        ...card.front,
                        style: {
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "gainsboro",
                            backgroundColor: "darkslategray",

            },
            },
                back: {
                ...card.back,
                style: {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "gainsboro",
                    backgroundColor: "slategray",
            },
            },
            }))} flipArrayHook={flipArrayHook}/>
        </div>
    )
}