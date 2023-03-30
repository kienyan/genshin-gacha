import { useState, useEffect } from "react";

function ListGroup() {
  const [specificCharacter, setSpecificCharacter] = useState<
    { id: number; name: string; vision: string; rarity: number }[]
  >([]);

  useEffect(() => {
    fetch("https://genshin.jmp.blue/characters")
      .then((response) => response.json())
      .then((data) => {
        console.log("Loaded all characters");
        //allCharacters contains a list of all character names only
        const allCharacters = data;
        // Using array map to create a new array with the info of the previous array
        // Using each element from the allCharacters array as parameter for a new api call to get the info of each specific character
        const fetchPromises = allCharacters.map((character: any) =>
          fetch(`https://genshin.jmp.blue/characters/${character}`)
            .then((response) => response.json())
            .then((data) => ({
              // new ID needed to give each object an unique key (for example in the <li> loop)
              id: Math.random().toString(16).slice(2),
              name: data.name,
              vision: data.vision,
              rarity: data.rarity,
            }))
        );
        // use Promise.all() to wait for all the fetch requests to finish
        Promise.all(fetchPromises).then((characters) => {
          setSpecificCharacter(characters);
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <>
      <h1>Characters</h1>
      <ul>
        {specificCharacter.map((item) => (
          <li className="tests" key={item.id}>
            {item.name} {item.rarity}* {item.vision}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
