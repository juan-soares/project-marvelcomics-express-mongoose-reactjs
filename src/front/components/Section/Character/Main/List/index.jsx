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
            {characterProperty === "character" && <th>Universo</th>}
            <th>Nome</th>

            {(characterProperty === "race" ||
              characterProperty === "affiliation" ||
              characterProperty === "status") && <th>Descrição</th>}

            {characterProperty === "character" && (
              <>
                <th>Codenomes</th>
                <th>Raça</th>
                <th>Origem</th>
                <th>Afiliações</th>
                <th>Status</th>
                <th>Ocupações</th>
                <th>Imagem 1</th>
                <th>Imagem 2</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {characterPropertyList.map((character) => {
            return (
              <tr key={character._id}>
                <td>{character._id}</td>
                {characterProperty === "character" && (
                  <td>
                    {character.earth?.identification
                      ? character.earth.identification
                      : "Item removido, substitua."}
                  </td>
                )}
                <td>{character.name}</td>

                {(characterProperty === "race" ||
                  characterProperty === "affiliation" ||
                  characterProperty === "status") && (
                  <td> {character.description} </td>
                )}

                {characterProperty === "character" && (
                  <>
                    <td>
                      {character.codenames?.map(
                        (codename) => `${codename.name}; `
                      )}
                    </td>
                    <td>
                      {character.race?.name
                        ? character.race.name
                        : "Item removido, substitua."}
                    </td>
                    <td>
                      Plano: {character.origin?.galaxy}; Galáxia:{" "}
                      {character.origin?.plane.name}; Planeta:{" "}
                      {character.origin?.planet}; Localidade:{" "}
                      {character.origin?.locality}
                    </td>
                    <td>
                      {character.affiliations?.map(
                        (affiliation) => `${affiliation.name}; `
                      )}
                    </td>
                    <td>
                      {character.status?.name
                        ? character.status.name
                        : "Item removido, substitua."}
                    </td>
                    <td>{character.occupations}</td>
                    <td>
                      {character.pictureOne?.map((picture) => (
                        <img alt="" src={picture} key={picture} />
                      ))}
                    </td>
                    <td>
                      {character.pictureTwo?.map((picture) => (
                        <img
                          alt=""
                          src={process.env.REACT_APP_BASE_URL + picture}
                          key={picture}
                        />
                      ))}
                    </td>
                  </>
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
