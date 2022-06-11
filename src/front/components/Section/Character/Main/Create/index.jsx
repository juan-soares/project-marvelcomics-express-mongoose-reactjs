import { useEffect, useState } from "react";

const MainCreate = ({ characterProperty }) => {
  const [newCharacter, setNewCharacter] = useState({
    description: "?",
    affiliations: "",
    race: "",
    status: "",
    earth: "",
    name: "",
    codenames: "",
    origin: { plane: "", galaxy: "", planet: "", locality: "" },
    pictureOne: "",
    pictureTwo: "",
    occupations: "?",
  });

  const [earthsList, setEarthsList] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [codenamesList, setCodenamesList] = useState([]);
  const [planesList, setPlanesList] = useState([]);
  const [galaxiesList, setGalaxiesList] = useState([]);
  const [planetsList, setPlanetsList] = useState([]);
  const [localitiesList, setLocalitiesList] = useState([]);
  const [affiliationsList, setAffiliationsList] = useState([]);
  const [racesList, setRacesList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await fetch(`${process.env.REACT_APP_BASE_URL}/location/plane`)
        .then((res) => res.json())
        .then((data) => setPlanesList(data));

      await fetch(`${process.env.REACT_APP_BASE_URL}/earth`)
        .then((res) => res.json())
        .then((data) => setEarthsList(data));

      await fetch(`${process.env.REACT_APP_BASE_URL}/character/status`)
        .then((res) => res.json())
        .then((data) => setStatusList(data));

      await fetch(`${process.env.REACT_APP_BASE_URL}/character/codename`)
        .then((res) => res.json())
        .then((data) => setCodenamesList(data));

      await fetch(`${process.env.REACT_APP_BASE_URL}/location/galaxy`)
        .then((res) => res.json())
        .then((data) => setGalaxiesList(data));

      await fetch(`${process.env.REACT_APP_BASE_URL}/location/planet`)
        .then((res) => res.json())
        .then((data) => setPlanetsList(data));

      await fetch(`${process.env.REACT_APP_BASE_URL}/location/locality`)
        .then((res) => res.json())
        .then((data) => setLocalitiesList(data));

      await fetch(`${process.env.REACT_APP_BASE_URL}/character/affiliation`)
        .then((res) => res.json())
        .then((data) => setAffiliationsList(data));

      await fetch(`${process.env.REACT_APP_BASE_URL}/character/race`)
        .then((res) => res.json())
        .then((data) => setRacesList(data));
    }
    fetchData();
  }, []);

  const handleChange = (e) => {
    newCharacter[e.target.id] = e.target.value;
    if (e.target.id === "plane") newCharacter.origin.plane = e.target.value;
    if (e.target.id === "galaxy") newCharacter.origin.galaxy = e.target.value;
    if (e.target.id === "planet") newCharacter.origin.planet = e.target.value;
    if (e.target.id === "locality")
      newCharacter.origin.locality = e.target.value;

    setNewCharacter(newCharacter);
    console.log(newCharacter);
  };

  const handleSubmit = async (e) => {
    if (characterProperty === "character") {
      if (newCharacter.earth === "") {
        window.alert("Selecione um Universo.");
        e.preventDefault();
      }
      if (newCharacter.codenames === "") {
        window.alert("Selecione um Codenome.");
        e.preventDefault();
      }
      if (
        newCharacter.origin.plane === "" ||
        newCharacter.origin.galaxy === "" ||
        newCharacter.origin.planet === "" ||
        newCharacter.origin.locality === ""
      ) {
        window.alert("Complete a origem.");
        e.preventDefault();
      }
      if (newCharacter.affiliations === "") {
        window.alert("Selecione uma Afiliação.");
        e.preventDefault();
      }

      if (newCharacter.race === "") {
        window.alert("Selecione uma Raça.");
        e.preventDefault();
      }
      if (newCharacter.status === "") {
        window.alert("Selecione um Status.");
        e.preventDefault();
      }
    }
    await fetch(
      `${process.env.REACT_APP_BASE_URL}/character/${
        characterProperty === "character" ? "" : characterProperty
      }`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCharacter),
      }
    )
      .then((response) => response.json())
      .then((data) => window.alert(data));
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <fieldset>
        <legend>Adicionar</legend>

        {characterProperty === "character" && (
          <>
            <label htmlFor="earth">Universo:</label>
            <select id="earth" onChange={(e) => handleChange(e)}>
              <option hidden>Selecione uma opção.</option>
              {earthsList.map((earth) => (
                <option key={earth._id} value={earth._id}>
                  {`${earth.identification} (${earth.nameBra})`}
                </option>
              ))}
            </select>
          </>
        )}

        <label htmlFor="name">Nome:</label>
        <input
          type="text"
          id="name"
          required
          onChange={(e) => handleChange(e)}
        />

        {(characterProperty === "race" ||
          characterProperty === "affiliation" ||
          characterProperty === "status") && (
          <>
            <label htmlFor="description">Descrição:</label>
            <textarea
              type="text"
              id="description"
              placeholder="?"
              onChange={(e) => handleChange(e)}
            />
          </>
        )}

        {characterProperty === "character" && (
          <>
            <label htmlFor="codenames">Codenomes:</label>
            <select id="codenames" onChange={(e) => handleChange(e)}>
              <option hidden>Selecione uma opção.</option>
              {codenamesList.map((codename) => (
                <option key={codename._id} value={codename._id}>
                  {`${codename.name}`}
                </option>
              ))}
            </select>

            <label htmlFor="origin">Origem:</label>
            <select id="plane" onChange={(e) => handleChange(e)}>
              <option hidden>Selecione uma opção.</option>
              {planesList.map((plane) => (
                <option key={plane._id} value={plane._id}>
                  {`${plane.name}`}
                </option>
              ))}
            </select>
            <select id="galaxy" onChange={(e) => handleChange(e)}>
              <option hidden>Selecione uma opção.</option>
              {galaxiesList.map((galaxy) => (
                <option key={galaxy._id} value={galaxy._id}>
                  {`${galaxy.name}`}
                </option>
              ))}
            </select>
            <select id="planet" onChange={(e) => handleChange(e)}>
              <option hidden>Selecione uma opção.</option>
              {planetsList.map((planet) => (
                <option key={planet._id} value={planet._id}>
                  {`${planet.name}`}
                </option>
              ))}
            </select>
            <select id="locality" onChange={(e) => handleChange(e)}>
              <option hidden>Selecione uma opção.</option>
              {localitiesList.map((locality) => (
                <option key={locality._id} value={locality._id}>
                  {`${locality.name}`}
                </option>
              ))}
            </select>

            <label htmlFor="affiliations">Afiliações:</label>
            <select id="affiliations" onChange={(e) => handleChange(e)}>
              <option hidden>Selecione uma opção.</option>
              {affiliationsList.map((affiliation) => (
                <option key={affiliation._id} value={affiliation._id}>
                  {`${affiliation.name}`}
                </option>
              ))}
            </select>

            <label htmlFor="race">Raça:</label>
            <select id="race" onChange={(e) => handleChange(e)}>
              <option hidden>Selecione uma opção.</option>
              {racesList.map((race) => (
                <option key={race._id} value={race._id}>
                  {`${race.name}`}
                </option>
              ))}
            </select>

            <label htmlFor="status">Status:</label>
            <select id="status" onChange={(e) => handleChange(e)}>
              <option hidden>Selecione uma opção.</option>
              {statusList.map((status) => (
                <option key={status._id} value={status._id}>
                  {`${status.name}`}
                </option>
              ))}
            </select>

            <label htmlFor="occupations">Ocupações:</label>
            <input
              type="text"
              id="occupations"
              onChange={(e) => handleChange(e)}
            />

            <label htmlFor="pictureOne">Imagem 1:</label>
            <input
              type="file"
              id="pictureOne"
              onChange={(e) => handleChange(e)}
            />
            <label htmlFor="pictureTwo">Imagem 2:</label>
            <input
              type="file"
              id="pictureTwo"
              onChange={(e) => handleChange(e)}
            />
          </>
        )}

        <button type="submit">OK</button>
      </fieldset>
    </form>
  );
};

export default MainCreate;
