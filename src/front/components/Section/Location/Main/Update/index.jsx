import { useState, useEffect } from "react";

const MainUpdate = ({ locationTitle }) => {
  const [searchedID, setSearchedID] = useState("");
  const [location, setLocation] = useState({
    name: "",
    description: "",
    status: "",
  });
  const [showLocation, setShowLocation] = useState(false);
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
    if (e.target.id === "ID") {
      setSearchedID(e.target.value);
    } else {
      location[e.target.id] = e.target.value;
      setLocation(location);
    }
  };

  const handleClick = async () => {
    if (searchedID === "") {
      window.alert("Digite o ID.");
    } else {
      await fetch(`${process.env.REACT_APP_BASE_URL}/location/${locationTitle}`)
        .then((response) => response.json())
        .then((data) => {
          const foundLocation = data.filter(
            (location) => location._id === searchedID
          );
          if (foundLocation.length) {
            setLocation(foundLocation[0]);
            setShowLocation(true);
          } else {
            window.alert("Não encontrado, tente novamente.");
          }
        });
    }
  };

  const handleSubmit = async () => {
    await fetch(`${process.env.REACT_APP_BASE_URL}/location/${locationTitle}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(location),
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

        {showLocation && (
          <div>
            <label htmlFor="name">Nome:</label>
            <input
              type="text"
              id="name"
              required
              defaultValue={location.name}
              onChange={(e) => handleChange(e)}
            />

            {locationTitle === "status" && (
              <>
                <label htmlFor="description">Descrição:</label>
                <textarea
                  type="text"
                  id="description"
                  defaultValue={location.description}
                  onChange={(e) => handleChange(e)}
                />
              </>
            )}

            {locationTitle !== "status" && (
              <>
                <label htmlFor="">Status:</label>
                <select id="status" onChange={(e) => handleChange(e)}>
                  <option hidden>{location.status?.name}</option>
                  {statusList.map((status) => (
                    <option key={status._id} value={status._id}>
                      {`${status.name} (${status.description})`}
                    </option>
                  ))}
                </select>
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
