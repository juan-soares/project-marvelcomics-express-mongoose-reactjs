import { useState, useEffect } from "react";

const MainUpdate = () => {
  const [searchedID, setSearchedID] = useState("");
  const [newComic, setNewComic] = useState({
    nameUsa: "",
    nameBra: "?",
    vol: "",
    cover: "",
    earths: [],
    stories: "?",
    date: "",
    newCharacters: [],
    arc: "?",
  });

  const [showComic, setShowComic] = useState(false);

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
    if (e.target.id === "ID") {
      setSearchedID(e.target.value);
    } else {
      newComic[e.target.id] = e.target.value;
      if (e.target.id === "earths") newComic.earths = [e.target.value];
      if (e.target.id === "newCharacters")
        newComic.newCharacters = [e.target.value];

        
       if(e.target.id !== "cover") { newComic.cover = "" } else {
         if(e.target.files[0]) newComic.cover = e.target.files[0].name
       }

      setNewComic(newComic);
      console.log(newComic);
    }
  };

  const handleClick = async () => {
    if (searchedID === "") {
      window.alert("Digite o ID.");
    } else {
      await fetch(`${process.env.REACT_APP_BASE_URL}/comic/`)
        .then((response) => response.json())
        .then((data) => {
          const foundnewComic = data.filter(
            (newComic) => newComic._id === searchedID
          );
          if (foundnewComic.length) {
            setNewComic(foundnewComic[0]);
            setShowComic(true);
          } else {
            window.alert("Não encontrado, tente novamente.");
          }
        });
    }
  };

  const handleSubmit = async () => {
    await fetch(`${process.env.REACT_APP_BASE_URL}/comic/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newComic),
    })
      .then((response) => response.json())
      .then((data) => window.alert(data));
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Alterar</legend>

        <label>ID:</label>
        <input
          type="text"
          id="ID"
          required
          value={searchedID}
          onChange={(e) => handleChange(e)}
        />
        <button type="button" onClick={handleClick}>
          OK
        </button>

        {showComic && (
          <div>
            <label htmlFor="date">Data:</label>
            <input
              type="date"
              id="date"
              defaultValue={newComic.date}
              onChange={(e) => handleChange(e)}
            />
            <label htmlFor="nameUsa">Nome USA:</label>
            <input
              type="text"
              id="nameUsa"
              defaultValue={newComic.nameUsa}
              onChange={(e) => handleChange(e)}
            />
            <label htmlFor="nameBra">Nome BRA:</label>
            <input
              type="text"
              id="nameBra"
              defaultValue={newComic.nameBra}
              onChange={(e) => handleChange(e)}
            />

            <label htmlFor="vol">VOL:</label>
            <input
              type="text"
              id="vol"
              defaultValue={newComic.vol}
              onChange={(e) => handleChange(e)}
            />
            <label htmlFor="cover">Capa:</label>
            <input type="file" id="cover" onChange={(e) => handleChange(e)} />

            <label htmlFor="stories">Histórias:</label>
            <input
              type="text"
              id="stories"
              defaultValue={newComic.stories}
              onChange={(e) => handleChange(e)}
            />

            <label htmlFor="arc">Arco:</label>
            <input
              type="text"
              id="arc"
              defaultValue={newComic.arc}
              onChange={(e) => handleChange(e)}
            />

            <label htmlFor="earths">Universos:</label>
            {newComic.earths.map((earth) => (
              <select id="earths" onChange={(e) => handleChange(e)}>
                <option hidden>{earth.identification}</option>
                {earthList.map((earth) => (
                  <option key={earth._id} value={earth._id}>
                    {`${earth.identification} (${earth.nameUsa})`}
                  </option>
                ))}
              </select>
            ))}

            <label htmlFor="newCharacters">Novos Personagens:</label>
            {newComic.newCharacters.map((newCharacter) => (
              <select id="newCharacters" onChange={(e) => handleChange(e)}>
                <option hidden>{newCharacter}</option>
                {characterList.map((newCharacter) => (
                  <option key={newCharacter._id} value={newCharacter._id}>
                    {`${newCharacter.name} (${newCharacter.status.name})`}
                  </option>
                ))}
              </select>
            ))}

            <label htmlFor="downloaded">Baixado:</label>
            <select id="downloaded" onChange={(e) => handleChange(e)}>
              <option hidden>{newComic.downloaded ? "SIM" : "NAO"}</option>
              <option value={!newComic.downloaded}>
                {newComic.downloaded ? "NAO" : "SIM"}
              </option>
            </select>
            <label htmlFor="translated">Traduzido:</label>
            <select id="translated" onChange={(e) => handleChange(e)}>
              <option hidden>{newComic.translated ? "SIM" : "NAO"}</option>
              <option value={!newComic.translated}>
                {newComic.translated ? "NAO" : "SIM"}
              </option>
            </select>
            <label htmlFor="readen">Lido:</label>
            <select id="readen" onChange={(e) => handleChange(e)}>
              <option hidden>{newComic.readen ? "SIM" : "NAO"}</option>
              <option value={!newComic.readen}>
                {newComic.translated ? "NAO" : "SIM"}
              </option>
            </select>
            <label htmlFor="irrelevant">Irrelevante:</label>
            <select id="irrelevant" onChange={(e) => handleChange(e)}>
              <option hidden>{newComic.irrelevant ? "SIM" : "NAO"}</option>
              <option value={!newComic.irrelevant}>
                {newComic.irrelevant ? "NAO" : "SIM"}
              </option>
            </select>

            <button type="submit">OK</button>
          </div>
        )}
      </fieldset>
    </form>
  );
};

export default MainUpdate;
