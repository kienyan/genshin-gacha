import Message from './Message'
import React, { useState, useEffect } from 'react';
import CharacterList from './CharacterList';
import axios from 'axios';

function App() {
  const [character, setCharacter] = useState([])

  const apiUrl = "https://genshin.jmp.blue/characters";

  useEffect(() => {
    axios.get(apiUrl).then(res => {
      setCharacter(res.data.map(c => c))
    });
  }, [])

  return (
    <CharacterList character={character} />
  );
}

export default App;