import { useState } from "react";

const MainDelete = ({ earthProperty }) => {
  const [earthPropertyID, setEarthPropertyID] = useState("");

  const handleChange = (e) => setEarthPropertyID(e.target.value);

  const handleSubmit = async () => {
    await fetch(
      `${process.env.REACT_APP_BASE_URL}/earth/${
        earthProperty === "earth" ? "" : earthProperty
      }`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: earthPropertyID }),
      }
    )
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
