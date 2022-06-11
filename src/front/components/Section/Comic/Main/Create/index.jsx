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
    newCharacters: [],
  });

  const [earthList, setEarthList] = useState([]);
  const [characterList, setCharacterList] = useState([]);

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
    if (e.target.id === "earths") newComic.earths = [e.target.value];
    if (e.target.id === "newCharacters")
      newComic.newCharacters = [e.target.value];

    if (e.target.id === "cover" && e.target.id !== "")
      newComic.cover = newComic.nameUsa.replaceAll(" ", "_") + ".jpg";

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

        <label htmlFor="earths">Universos:</label>
        <select id="earths" onChange={(e) => handleChange(e)}>
          <option hidden>Selecione uma opção.</option>
          {earthList.map((earth) => (
            <option key={earth._id} value={earth._id}>
              {`${earth.identification} (${earth.nameUsa})`}
            </option>
          ))}
        </select>

        <label htmlFor="newCharacters">Novos Personagens:</label>
        <select id="newCharacters" onChange={(e) => handleChange(e)}>
          <option hidden>Selecione uma opção.</option>
          {characterList.map((newCharacter) => (
            <option key={newCharacter._id} value={newCharacter._id}>
              {`${newCharacter.name} (${newCharacter.status.name})`}
            </option>
          ))}
        </select>

        <button type="submit">OK</button>
      </fieldset>
    </form>
  );
};

export default MainCreate;
