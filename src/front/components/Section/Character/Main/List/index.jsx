import { useEffect, useState } from "react";

const MainList = ({ characterProperty }) => {
  const [characterPropertyList, setCharacterPropertyList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await fetch(
        `${process.env.REACT_APP_BASE_URL}/character/${
          characterProperty === "character" ? "" : characterProperty
        }`
      )
        .then((res) => res.json())
        .then((data) => setCharacterPropertyList(data));
    }
    fetchData();
  }, [characterProperty]);

  return (
    <fieldset>
      <legend>Listar</legend>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            {characterProperty === "earth" && (
              <>
                <th>Identificação</th>
                <th>Nome USA</th>
                <th>Nome BRA</th>
                <th>Tipo</th>
                <th>Status</th>
              </>
            )}
            {characterProperty !== "earth" && <th>Nome</th>}
            <th>Descrição</th>
          </tr>
        </thead>
        <tbody>
          {characterPropertyList.map((location) => {
            return (
              <tr key={location._id}>
                <td>{location._id}</td>
                {characterProperty === "earth" && (
                  <>
                    <td>{location.identification}</td>
                    <td>{location.nameUsa}</td>
                    <td>{location.nameBra}</td>
                    <td>
                      {location.type?.name
                        ? location.type.name
                        : "Item removido, substitua."}
                    </td>
                    <td>
                      {location.status?.name
                        ? location.status.name
                        : "Item removido, substitua."}
                    </td>
                  </>
                )}
                {characterProperty !== "earth" && <td>{location.name}</td>}
                <td>{location.description}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </fieldset>
  );
};

export default MainList;
