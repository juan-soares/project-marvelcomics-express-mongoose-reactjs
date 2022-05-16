import { useEffect, useState } from "react";

const MainCreate = ({ earthProperty }) => {
  const [newEarth, setNewEarth] = useState({
    identification: "",
    nameBra: "",
    nameUsa: "",
    type: "",
    status: "",
    name: "",
    description: "?",
  });

  const [statusList, setStatusList] = useState([]);
  const [typeList, setTypeList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await fetch(`${process.env.REACT_APP_BASE_URL}/earth/status`)
        .then((res) => res.json())
        .then((data) => setStatusList(data));

      await fetch(`${process.env.REACT_APP_BASE_URL}/earth/type`)
        .then((res) => res.json())
        .then((data) => setTypeList(data));
    }
    fetchData();
  }, []);

  const handleChange = (e) => {
    newEarth[e.target.id] = e.target.value;
    setNewEarth(newEarth);
  };

  const handleSubmit = async (e) => {
    if (earthProperty === "earth") {
      if (newEarth.status === "") {
        window.alert("Selecione um Status.");
        e.preventDefault();
      }
      if (newEarth.type === "") {
        window.alert("Selecione um Tipo.");
        e.preventDefault();
      }
    }
    await fetch(
      `${process.env.REACT_APP_BASE_URL}/earth/${
        earthProperty === "earth" ? "" : earthProperty
      }`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEarth),
      }
    )
      .then((response) => response.json())
      .then((data) => window.alert(data));
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <fieldset>
        <legend>Adicionar</legend>

        {earthProperty === "earth" && (
          <>
            <label htmlFor="identification">Identificação:</label>
            <input
              type="text"
              id="identification"
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

            <label htmlFor="">Status:</label>
            <select id="status" onChange={(e) => handleChange(e)}>
              <option hidden>Selecione uma opção.</option>
              {statusList.map((status) => (
                <option key={status._id} value={status._id}>
                  {`${status.name} (${status.description})`}
                </option>
              ))}
            </select>

            <label htmlFor="">Tipo:</label>
            <select id="type" onChange={(e) => handleChange(e)}>
              <option hidden>Selecione uma opção.</option>
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
            {" "}
            <label htmlFor="name">Nome:</label>
            <input
              type="text"
              id="name"
              required
              onChange={(e) => handleChange(e)}
            />
          </>
        )}

        <label htmlFor="description">Descrição:</label>
        <textarea
          type="text"
          id="description"
          placeholder="?"
          onChange={(e) => handleChange(e)}
        />
        <button type="submit">OK</button>
      </fieldset>
    </form>
  );
};

export default MainCreate;
