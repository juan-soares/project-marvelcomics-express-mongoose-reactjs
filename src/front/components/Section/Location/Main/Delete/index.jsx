import { useState } from "react";

const MainDelete = ({ locationTitle }) => {
  const [locationID, setLocationID] = useState("");

  const handleChange = (e) => setLocationID(e.target.value);

  const handleSubmit = async () => {
    await fetch(`${process.env.REACT_APP_BASE_URL}/location/${locationTitle}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: locationID }),
    })
      .then((response) => response.json())
      .then((data) => window.alert(data));
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Deletar</legend>
        <label htmlFor="id">ID:</label>
        <input
          type="text"
          id="id"
          placeholder="Digite o ID do item."
          required
          onChange={(e) => handleChange(e)}
        />
        <button type="submit">OK</button>
      </fieldset>
    </form>
  );
};

export default MainDelete;
