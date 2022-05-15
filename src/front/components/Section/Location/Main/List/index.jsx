import { useEffect, useState } from "react";

const MainList = ({ locationTitle }) => {
  const [locationTitleList, setlocationTitleList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await fetch(`${process.env.REACT_APP_BASE_URL}/location/${locationTitle}`)
        .then((res) => res.json())
        .then((data) => setlocationTitleList(data));
    }
    fetchData();
  }, [locationTitle]);

  return (
    <fieldset>
      <legend>Listar</legend>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            {locationTitle === "status" ? <th>Descrição</th> : <th>Status</th>}
          </tr>
        </thead>
        <tbody>
          {locationTitleList.map((location) => {
            return (
              <tr key={location._id}>
                <td>{location._id}</td>
                <td>{location.name}</td>
                {locationTitle === "status" ? (
                  <td>{location.description}</td>
                ) : (
                  <td>
                    {location.status?.name
                      ? location.status.name
                      : "Item removido, substitua."}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </fieldset>
  );
};

export default MainList;
