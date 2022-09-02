import { useEffect, useState } from 'react';
import SingleCards from './components/SingleCards';
import './App.css';

const cardImages = [
  { "src": "/img/helmet-1.png", matched: false },
  { "src": "/img/potion-1.png", matched: false },
  { "src": "/img/ring-1.png", matched: false },
  { "src": "/img/scroll-1.png", matched: false },
  { "src": "/img/shield-1.png", matched: false },
  { "src": "/img/sword-1.png", matched: false }
]

function App() {

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  // shuffle cards 
  const shuffleCards = () => {
    // on place les cartes de l'array cardImages dans le nouvel array avec "..." puis on les duplique en les ajoutant une seconde fois
    const shuffleCards = [...cardImages, ...cardImages]
    // tri des cartes avec la fct sort(), tri random avec Math.random 
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

      setChoiceOne(null)
      setChoiceTwo(null)
      setCards(shuffleCards)
      setTurns(0)
  }

  //handle a choice
  const handleChoice = (card) =>{
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  // Compare choice 
  useEffect(() => {
    if (choiceOne && choiceTwo){
      setDisabled(true)
      if(choiceOne.src === choiceTwo.src){
        setCards(prevCards =>{
          return prevCards.map(card => {
            if (card.src === choiceOne.src){
              return {...card, matched: true}
            } else{
              return card
            }
          })
        })
        resetTurn()
      } else{
        setTimeout(() => resetTurn(), 1000 )
        
      }
    }
  }, [choiceOne, choiceTwo])



  // reset choices & increase turn 
  const resetTurn = () =>{
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  // start a new game auto
  useEffect(() => {
    shuffleCards()
  }, [])


  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>Nouvelle Partie</button>
      <p>Trouvez les paires en réalisant le moins de tour possible</p>

      <div className='card-grid'>
        {cards.map(card =>(
          <SingleCards key={card.id} card={card} handleChoice={handleChoice} flipped={card === choiceOne || card === choiceTwo || card.matched} disabled={disabled} />
        ))}
      </div>
      <p>Nombre de tours : {turns} </p>
    </div>
  );
}

export default App;
