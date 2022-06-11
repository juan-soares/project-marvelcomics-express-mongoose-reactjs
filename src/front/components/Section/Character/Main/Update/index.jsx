import { useState, useEffect } from "react";

const MainUpdate = ({ characterProperty }) => {
  const [searchedID, setSearchedID] = useState("");
  const [showCharacter, setShowCharacter] = useState(false);
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
    if (e.target.id === "ID") {
      setSearchedID(e.target.value);
    } else {
      newCharacter[e.target.id] = e.target.value;
      if (e.target.id === "plane") newCharacter.origin.plane = e.target.value;
      if (e.target.id === "galaxy") newCharacter.origin.galaxy = e.target.value;
      if (e.target.id === "planet") newCharacter.origin.planet = e.target.value;
      if (e.target.id === "locality")
        newCharacter.origin.locality = e.target.value;

      if (e.target.id === "pictureOne" && e.target.value !== "") {
        newCharacter.pictureOne = newCharacter._id + "_" + Date.now();
      }

      if (e.target.id === "pictureTwo" && e.target.value !== "") {
        newCharacter.pictureTwo = newCharacter._id + "_" + Date.now();
      }

      setNewCharacter(newCharacter);
      console.log(newCharacter);
    }
  };

  const handleClick = async () => {
    if (searchedID === "") {
      window.alert("Digite o ID.");
    } else {
      await fetch(
        `${process.env.REACT_APP_BASE_URL}/character/${
          characterProperty === "character" ? "" : characterProperty
        }`
      )
        .then((response) => response.json())
        .then((data) => {
          const foundCharacter = data.filter(
            (character) => character._id === searchedID
          );
          if (foundCharacter.length) {
            setNewCharacter(foundCharacter[0]);
            setShowCharacter(true);
          } else {
            window.alert("Não encontrado, tente novamente.");
          }
        });
    }
  };

  const handleSubmit = async () => {
    await fetch(
      `${process.env.REACT_APP_BASE_URL}/character/${
        characterProperty === "character" ? "" : characterProperty
      }`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCharacter),
      }
    )
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

        {showCharacter && (
          <div>
            {characterProperty === "character" && (
              <>
                <label htmlFor="earth">Universo:</label>
                <select id="earth" onChange={(e) => handleChange(e)}>
                  <option hidden>{newCharacter.earth?.identification}</option>
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
              defaultValue={newCharacter.name}
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
                  defaultValue={newCharacter.description}
                  onChange={(e) => handleChange(e)}
                />
              </>
            )}

            {characterProperty === "character" && (
              <>
                <label htmlFor="codenames">Codenomes:</label>
                <select id="codenames" onChange={(e) => handleChange(e)}>
                  <option hidden>
                    {newCharacter.codenames?.map(
                      (codename) => codename.name + " /"
                    )}
                  </option>
                  {codenamesList.map((codename) => (
                    <option key={codename._id} value={codename._id}>
                      {`${codename.name}`}
                    </option>
                  ))}
                </select>

                <label htmlFor="origin">Origem:</label>
                <select id="plane" onChange={(e) => handleChange(e)}>
                  <option hidden>{newCharacter.origin?.plane?.name}</option>
                  {planesList.map((plane) => (
                    <option key={plane._id} value={plane._id}>
                      {`${plane.name}`}
                    </option>
                  ))}
                </select>
                <select id="galaxy" onChange={(e) => handleChange(e)}>
                  <option hidden>{newCharacter.origin?.galaxy?.name}</option>
                  {galaxiesList.map((galaxy) => (
                    <option key={galaxy._id} value={galaxy._id}>
                      {`${galaxy.name}`}
                    </option>
                  ))}
                </select>
                <select id="planet" onChange={(e) => handleChange(e)}>
                  <option hidden>{newCharacter.origin?.planet?.name}</option>
                  {planetsList.map((planet) => (
                    <option key={planet._id} value={planet._id}>
                      {`${planet.name}`}
                    </option>
                  ))}
                </select>
                <select id="locality" onChange={(e) => handleChange(e)}>
                  <option hidden>{newCharacter.origin?.locality?.name}</option>
                  {localitiesList.map((locality) => (
                    <option key={locality._id} value={locality._id}>
                      {`${locality.name}`}
                    </option>
                  ))}
                </select>

                <label htmlFor="affiliations">Afiliações:</label>
                <select id="affiliations" onChange={(e) => handleChange(e)}>
                  <option hidden>
                    {newCharacter.affiliations?.map(
                      (affiliation) => affiliation.name + " /"
                    )}
                  </option>
                  {affiliationsList.map((affiliation) => (
                    <option key={affiliation._id} value={affiliation._id}>
                      {`${affiliation.name}`}
                    </option>
                  ))}
                </select>

                <label htmlFor="race">Raça:</label>
                <select id="race" onChange={(e) => handleChange(e)}>
                  <option hidden>{newCharacter.race?.name}</option>
                  {racesList.map((race) => (
                    <option key={race._id} value={race._id}>
                      {`${race.name}`}
                    </option>
                  ))}
                </select>

                <label htmlFor="status">Status:</label>
                <select id="status" onChange={(e) => handleChange(e)}>
                  <option hidden>{newCharacter.status?.name}</option>
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
                  defaultValue={newCharacter.occupations}
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
          </div>
        )}
      </fieldset>
    </form>
  );
};

export default MainUpdate;
