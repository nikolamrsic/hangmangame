import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import  EnterNewWord from '../components/enterNewWord'
import Char from '../components/char'
import Hearts from '../components/hearts'
import Keyboard from '../components/keyboard'
import Hangman from '../components/hangman'
import { useState,
  useRef,
  useEffect} from 'react'
export default function Home() {
  return (
    <div className={styles.container}>
     <App/>
    </div>
  )
}


function App() {
  //searched word
  let [word, setWord] = useState("hangman");
  //get all inputs and match
  let [inputs, setInputs] = useState([]);
  //form input controll for inputs arr
  let [suggest, setSuggest] = useState("");
  // end variable?
  let [isEnd, setEnd] = useState(false);
  //match words and inputs arr and display it
  let [match, setMatch] = useState([]);
  //keys form keyboard
  let[newGame,setNewGame]=useState(false)
  //keys values
  let keys = [
    "q",
    "w",
    "e",
    "r",
    "t",
    "y",
    "u",
    "i",
    "o",
    "p",
    "a",
    "s",
    "d",
    "f",
    "g",
    "h",
    "j",
    "k",
    "l",
    "z",
    "x",
    "c",
    "v",
    "b",
    "n",
    "m"
  ];
  
  
  
  //lives
  let [lives, setLives] = useState(6);

  //check is all matching
  useEffect(() => {
    //remove white space and split thant sort chars than join
    let word_Chars_sort = word
      .split("")
      .reduce((temp, curr) => {
        if (curr != " " && temp.includes(curr) == false) {
          temp.push(curr);
        }
        return temp;
      }, [])
      .sort((a, b) => {
        return a - b;
      })
      .join("");
    let match_Chars_sort = match
      .sort((a, b) => {
        return a - b;
      })
      .join("");

    if (word_Chars_sort == match_Chars_sort) {
      setEnd(true);
    }
  }, [match]);

  useEffect(() => {
    word.split("").forEach((char) => {
      inputs.forEach((input) => {
        if (char === input) {
          setMatch((prev) => {
            return [...prev, input];
          });
        }
      });
    });
    setMatch((prev) => {
      return [...new Set(prev)];
    });
  }, [inputs]);

  //check for lives
  useEffect(() => {
    if (word.split("").includes(suggest) == false) {
      setLives((prev) => {
        if(prev===1){
          setEnd(true)
          setLives(0)
        }else{
            return prev - 1;   
          }
      
      });
    }
  }, [suggest]);

  return (
    <div className="App relative p-5 flex flex-col gap-16  justify-center items-center">
    
     {isEnd && <EnterNewWord
                 setter={setWord}
                 resetMatchs={setMatch}
                 resetInputs={setInputs}
                 resetSuggests={setSuggest}
                 resetLives={setLives}
                 resetEnd={setEnd}
                 word={word}
                 />}
      
      <div className="absolute gap-3 flex top-3 right-3">
        <Hearts lives={lives} />
      </div>
      <div>
        <Hangman lives={lives} />
      </div>
      <div style={{ display: "flex", gap: "15px" }}>
        {word.split("").map((char, index) => {
          return (
            <div
              style={{
                borderBottom: char != " " && "solid 1px black",
                width: "35px",
                height: "35px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Char
                allMatch={isEnd}
                value={match.includes(char) && char}
                visible={true}
              />
            </div>
          );
        })}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          setInputs((prev) => {
            return [...prev, suggest];
          });
        }}
      >
        <div
          style={{ width: "510px" }}
          className="flex justify-center items-center flex-wrap gap-5"
        >
          {keys.map((key) => {
            return (
              <Keyboard
                disabled={match.includes(key)}
                clickHandler={(e) => {
                  setSuggest(e.target.innerText);
                }}
                char={key}
              />
            );
          })}
        </div>
      </form>
    </div>
  );
}
