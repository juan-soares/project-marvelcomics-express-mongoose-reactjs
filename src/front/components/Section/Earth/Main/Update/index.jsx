import { useState, useEffect } from "react";

const MainUpdate = ({ earthProperty }) => {
  const [searchedID, setSearchedID] = useState("");
  const [earth, setEarth] = useState({
    identification: "",
    nameBra: "",
    nameUsa: "",
    type: "",
    status: "",
    name: "",
    description: "?",
  });
  const [showEarth, setShowEarth] = useState(false);
  const [statusList, setstatusList] = useState([]);
  const [typeList, setTypeList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await fetch(`${process.env.REACT_APP_BASE_URL}/earth/status`)
        .then((res) => res.json())
        .then((data) => setstatusList(data));
      await fetch(`${process.env.REACT_APP_BASE_URL}/earth/type`)
        .then((res) => res.json())
        .then((data) => setTypeList(data));
    }
    fetchData();
  }, []);

  const handleChange = (e) => {
    if (e.target.id === "ID") {
      setSearchedID(e.target.value);
    } else {
      earth[e.target.id] = e.target.value;
      setEarth(earth);
    }
  };

  const handleClick = async () => {
    if (searchedID === "") {
      window.alert("Digite o ID.");
    } else {
      await fetch(
        `${process.env.REACT_APP_BASE_URL}/earth/${
          earthProperty === "earth" ? "" : earthProperty
        }`
      )
        .then((response) => response.json())
        .then((data) => {
          const foundEarth = data.filter((earth) => earth._id === searchedID);
          if (foundEarth.length) {
            setEarth(foundEarth[0]);
            setShowEarth(true);
          } else {
            window.alert("Não encontrado, tente novamente.");
          }
        });
    }
  };

  const handleSubmit = async () => {
    await fetch(
      `${process.env.REACT_APP_BASE_URL}/earth/${
        earthProperty === "earth" ? "" : earthProperty
      }`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(earth),
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

        {showEarth && (
          <div>
            {earthProperty === "earth" && (
              <>
                <label htmlFor="identification">Identificação:</label>
                <input
                  type="text"
                  id="identification"
                  defaultValue={earth.identification}
                  onChange={(e) => handleChange(e)}
                />
                <label htmlFor="nameUsa">Nome USA:</label>
                <input
                  type="text"
                  id="nameUsa"
                  defaultValue={earth.nameUsa}
                  onChange={(e) => handleChange(e)}
                />
                <label htmlFor="nameBra">Nome BRA:</label>
                <input
                  type="text"
                  id="nameBra"
                  defaultValue={earth.nameBra}
                  onChange={(e) => handleChange(e)}
                />

                <label htmlFor="">Status:</label>
                <select id="status" onChange={(e) => handleChange(e)}>
                  <option hidden>{earth.status?.name}</option>
                  {statusList.map((status) => (
                    <option key={status._id} value={status._id}>
                      {`${status.name} (${status.description})`}
                    </option>
                  ))}
                </select>

                <label htmlFor="">Tipo:</label>
                <select id="type" onChange={(e) => handleChange(e)}>
                  <option hidden>{earth.type?.name}</option>
                  {typeList.map((type) => (
                    <option key={type._id} value={type._id}>
                      {`${type.name} (${type.description})`}
                    </option>
                  ))}
                </select>
              </>
            )}
            {earthProperty !== "earth" && (
              <>
                <label htmlFor="name">Nome:</label>
                <input
                  type="text"
                  id="name"
                  defaultValue={earth.name}
                  onChange={(e) => handleChange(e)}
                />
              </>
            )}

            <label htmlFor="description">Descrição:</label>
            <textarea
              type="text"
              id="description"
              defaultValue={earth.description}
              onChange={(e) => handleChange(e)}
            />

            <button type="submit">OK</button>
          </div>
        )}
      </fieldset>
    </form>
  );
};

export default MainUpdate;
