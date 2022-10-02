import React from 'react'


 
export default function EnterNewWord({word,setter,resetInputs,resetMatchs,resetSuggests,resetLives,resetEnd}) {
  
    const sender = (e) => {
      e.preventDefault();
     
      setter(e.target.newWord.value)
      resetMatchs([])
     resetSuggests('')
      resetInputs([])
      resetLives(6)
      resetEnd(false)
    };
    return (
      <form onSubmit={sender}
        style={{ maxWidth: "550px" }}
        className=" aboslute w-6/12 border  flex flex-col p-5 h-fit bg-blue-500"
      >
        <h1 className='text-white text-center  text-2xl'>Word was: {word}</h1>
        <label className="text-2xl  text-white py-5" for="newWord">
          New Game
        </label>
        <div className="flex flex-col gap-4 justify-center items-center">
          <input
            type="text"
            class="w-full py-2 px-3 "
            placeholder="Enter text"
            id="newWord"
            minLength="3"
            name="newWord"
          />
          <button type='submit' className="w-full  text-white p-2 bg-blue-600">
            Enter word
          </button>
        </div>
      </form>
    );
  }