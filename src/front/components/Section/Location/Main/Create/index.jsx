import { useEffect, useState } from "react";

const MainCreate = ({ locationTitle }) => {
  const [newLocation, setNewLocation] = useState({
    name: "",
    description: "?",
    status: "",
  });

  const [statusList, setstatusList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await fetch(`${process.env.REACT_APP_BASE_URL}/location/status`)
        .then((res) => res.json())
        .then((data) => setstatusList(data));
    }
    fetchData();
  }, []);

  const handleChange = (e) => {
    newLocation[e.target.id] = e.target.value;
    setNewLocation(newLocation);
  };

  const handleSubmit = async (e) => {
    if (locationTitle !== "status" && newLocation.status === "") {
      window.alert("Selecione um Status.");
      e.preventDefault();
    } else {
      await fetch(
        `${process.env.REACT_APP_BASE_URL}/location/${locationTitle}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newLocation),
        }
      )
        .then((response) => response.json())
        .then((data) => window.alert(data));
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <fieldset>
        <legend>Adicionar</legend>
        <label htmlFor="name">Nome:</label>
        <input
          type="text"
          id="name"
          required
          onChange={(e) => handleChange(e)}
        />

        {locationTitle === "status" && (
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

        {locationTitle !== "status" && (
          <>
            <label htmlFor="">Status:</label>
            <select id="status" onChange={(e) => handleChange(e)}>
              <option hidden>Selecione uma opção.</option>
              {statusList.map((status) => (
                <option key={status._id} value={status._id}>
                  {`${status.name} (${status.description})`}
                </option>
              ))}
            </select>
          </>
        )}
        <button type="submit">OK</button>
      </fieldset>
    </form>
  );
};

export default MainCreate;
