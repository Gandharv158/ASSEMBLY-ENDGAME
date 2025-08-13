import clsx from 'clsx'
import './App.css'
import {languages} from './languages'
import { useState } from 'react'
import {getFarewellText , getRandomWord} from './utils'

const Letters=["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]


function App() {
  const [guessedLetters, setguessedLetters] = useState([]);
  const [currentWord, setCurrentWord] = useState(getRandomWord());
  const wrongGuessCount = guessedLetters.filter(letter => !currentWord.includes(letter)).length;
  let isGameOver = false;
  let counter = 0;
  let isGameWon = false;
  let isGameLost = false;

  const languageElements=languages.map((language,index)=>{
    const isLanguageLost= index < wrongGuessCount;
    const styles ={
      backgroundColor: language.backgroundColor,
      color: language.color,
      borderRadius: '5px',
      padding: '4px',
      margin: '1px',
      fontFamily: 'sans-serif',
      fontSize: 'medium',
      fontWeight: '390'
    }
    return (
      <div className={isLanguageLost ? "lost" : " "} key={language.name} style={styles}>{language.name}</div>
    )
  })
  

  function handleKeyClick(letter) {
    if(!isGameOver){
      guessedLetters.includes(letter)? setguessedLetters(prev=> prev) : setguessedLetters((prev)=> ([...prev, letter]))
    }
  }

  if(wrongGuessCount >= languages.length-1) {
    isGameLost = true;
  }
  if(currentWord.split("").every(letter => guessedLetters.includes(letter))){
    isGameWon = true;
  }
  isGameOver = isGameLost || isGameWon;
  
  
    const letterElements = currentWord.split("").map((word,index)=>
    <span key={index} className="Letter-box">{guessedLetters.includes(word)? word :" "}</span>);
    const letterElementsWithKeys = Letters.map((letter) =>{
      const isGuessed =guessedLetters.includes(letter);
      const isCorrect = isGuessed && currentWord.includes(letter);
      const isWrong = isGuessed && !currentWord.includes(letter);
      const className = clsx({
        correct: isCorrect,
        wrong: isWrong
      })

      return(
      <button key={letter} className={className} onClick={()=>handleKeyClick(letter)}>{letter}</button>
      )
    });

  function handleNewGame() {
    setguessedLetters([]);
    setCurrentWord(getRandomWord()); 
    isGameWon = false;
    isGameLost = false;
    isGameOver = false;
    counter = 0;
  }

  function renderGameStatus() {
   if( isGameWon) {
    return(
      <div className="Game-won">You saved the world from Assembly! Congratulations.</div>
    )
   }
   else if(isGameLost){
    return(
      <div className="Game-lost">You Lost.The word was "{currentWord}"! Better start learning Assembly.</div>
    )
   }
   else if(wrongGuessCount > 0 ){
    return (
      <div className="Game-s">{getFarewellText(languages[wrongGuessCount-1].name)}</div>
    )
  }
  }

  return (
  <>
    <main>
      <header>
      <h2>Assembly Endgame</h2>
      <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
      </header>
      <div className="Game-status">{renderGameStatus()}</div>
      <div className="Language-container">{languageElements}</div>
      <div className="Input-box">{letterElements}</div>
      <div className="Keyboard">{letterElementsWithKeys}</div>
      {isGameOver ? <button className='New-game' onClick={handleNewGame}>NEW GAME</button> : null}
    </main>
  </>
  )
}

export default App
