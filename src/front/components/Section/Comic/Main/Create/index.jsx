import { useEffect, useState } from "react";

const MainCreate = () => {
  const [newComic, setNewComic] = useState({
    nameUsa: "",
    nameBra: "?",
    vol: "",
    cover: "",
    earths: [],
    stories: "?",
    date: "",
    arc: "?",
    newCharacters: [],
  });

  const [earthList, setEarthList] = useState([]);
  const [characterList, setCharacterList] = useState([]);
  const [addEarth, setAddEarth] = useState([]);
  const [addEarthCounter, setAddEarthCounter] = useState(0);
  const [addNewCharacter, setAddNewCharacter] = useState([]);
  const [addNewCharacterCounter, setAddNewCharacterCounter] = useState(0);

  useEffect(() => {
    async function fetchData() {
      await fetch(`${process.env.REACT_APP_BASE_URL}/earth/`)
        .then((res) => res.json())
        .then((data) => setEarthList(data));

      await fetch(`${process.env.REACT_APP_BASE_URL}/character`)
        .then((res) => res.json())
        .then((data) => setCharacterList(data));
    }
    fetchData();
  }, []);

  const handleChange = (e) => {
    newComic[e.target.id] = e.target.value;
    if (e.target.id === `earth${addEarthCounter}`)
      newComic.earths[addEarthCounter] = e.target.value;

    if (e.target.id === "newCharacters")
      newComic.newCharacters = [e.target.value];

    if (e.target.id === "cover" && e.target.id !== "" && e.target.files[0])
      newComic.cover = e.target.files[0].name;
    /*  newComic.nameUsa
          .replaceAll(":", "")
          .replaceAll(" ", "_")
          .replaceAll("#", "") + ".jpg"; */

    setNewComic(newComic);
    console.log(newComic);
  };

  const handleSubmit = async (e) => {
    if (newComic.earths.length === 0) {
      window.alert("Selecione um Universo.");
      e.preventDefault();
    } else {
      await fetch(`${process.env.REACT_APP_BASE_URL}/comic/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newComic),
      })
        .then((response) => response.json())
        .then((data) => window.alert(data));
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <fieldset>
        <legend>Adicionar</legend>

        <label htmlFor="date">Data:</label>
        <input
          type="date"
          id="date"
          required
          onChange={(e) => handleChange(e)}
        />
        <label htmlFor="nameUsa">Nome USA:</label>
        <input
          type="text"
          id="nameUsa"
          required
          onChange={(e) => handleChange(e)}
        />
        <label htmlFor="nameBra">Nome BRA:</label>
        <input type="text" id="nameBra" onChange={(e) => handleChange(e)} />

        <label htmlFor="vol">VOL:</label>
        <input
          type="text"
          id="vol"
          required
          onChange={(e) => handleChange(e)}
        />
        <label htmlFor="cover">Capa:</label>
        <input type="file" id="cover" onChange={(e) => handleChange(e)} />
        <label htmlFor="stories">Histórias:</label>
        <input type="text" id="stories" onChange={(e) => handleChange(e)} />
        <label htmlFor="arc">Arco:</label>
        <input type="text" id="arc" onChange={(e) => handleChange(e)} />

        <label htmlFor="earths">Universos:</label>
        {addEarth}
        <button
          type="button"
          onClick={() => {
            setAddEarth([
              ...addEarth,
              <select
                key={addEarthCounter}
                id={`earth${addEarthCounter}`}
                onChange={(e) => handleChange(e)}
              >
                <option hidden>Selecione uma opção.</option>
                {earthList.map((earth) => (
                  <option key={earth._id} value={earth._id}>
                    {`${earth.identification} (${earth.nameUsa})`}
                  </option>
                ))}
              </select>,
            ]);
            setAddEarthCounter(addEarthCounter + 1);
          }}
        >
          +
        </button>

        <label htmlFor="newCharacters">Novos Personagens:</label>
        {addNewCharacter}
        <button
          type="button"
          onClick={() => {
            setAddNewCharacter([
              ...addNewCharacter,
              <select
                key={addNewCharacterCounter}
                id={`newCharacter${addNewCharacterCounter}`}
                onChange={(e) => handleChange(e)}
              >
                <option hidden>Selecione uma opção.</option>
                {characterList.map((newCharacter) => (
                  <option key={newCharacter._id} value={newCharacter._id}>
                    {`${newCharacter.name} (${newCharacter.status.name})`}
                  </option>
                ))}
              </select>,
            ]);
            setAddNewCharacterCounter(addNewCharacterCounter + 1);
          }}
        >
          +
        </button>

        <button type="submit">OK</button>
      </fieldset>
    </form>
  );
};

export default MainCreate;
