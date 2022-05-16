import { useEffect, useState } from "react";

const MainList = ({ earthProperty }) => {
  const [earthPropertyList, setEarthPropertyList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await fetch(
        `${process.env.REACT_APP_BASE_URL}/earth/${
          earthProperty === "earth" ? "" : earthProperty
        }`
      )
        .then((res) => res.json())
        .then((data) => setEarthPropertyList(data));
    }
    fetchData();
  }, [earthProperty]);

  return (
    <fieldset>
      <legend>Listar</legend>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            {earthProperty === "earth" && (
              <>
                <th>Identificação</th>
                <th>Nome USA</th>
                <th>Nome BRA</th>
                <th>Tipo</th>
                <th>Status</th>
              </>
            )}
            {earthProperty !== "earth" && <th>Nome</th>}
            <th>Descrição</th>
          </tr>
        </thead>
        <tbody>
          {earthPropertyList.map((location) => {
            return (
              <tr key={location._id}>
                <td>{location._id}</td>
                {earthProperty === "earth" && (
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
                {earthProperty !== "earth" && <td>{location.name}</td>}
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
