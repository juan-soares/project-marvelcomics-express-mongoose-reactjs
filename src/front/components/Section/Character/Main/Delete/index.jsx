import { useState } from "react";

const MainDelete = ({ characterProperty }) => {
  const [characterPropertyID, setCharacterPropertyID] = useState("");

  const handleChange = (e) => setCharacterPropertyID(e.target.value);

  const handleSubmit = async () => {
    await fetch(
      `${process.env.REACT_APP_BASE_URL}/character/${
        characterProperty === "character" ? "" : characterProperty
      }`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: characterPropertyID }),
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
