import { Fragment, useEffect, useState } from "react";

const MainList = ({ ComicProperty }) => {
  const [ComicPropertyList, setComicPropertyList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await fetch(`${process.env.REACT_APP_BASE_URL}/comic/`)
        .then((res) => res.json())
        .then((data) => setComicPropertyList(data));
    }
    fetchData();
  }, [ComicProperty]);

  return (
    <fieldset>
      <legend>Listar</legend>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Data</th>
            <th>Nome USA</th>
            <th>Nome BRA</th>
            <th>VOL</th>
            <th>Capa</th>

            <th>Baixado</th>
            <th>Lido</th>
            <th>Traduzido</th>
            <th>Irrelevante</th>

            <th>Universos</th>
            <th>Histórias</th>
            <th>Arco</th>
            <th>Novos Personagens</th>
          </tr>
        </thead>
        <tbody>
          {ComicPropertyList.map((comic) => {
            return (
              <tr key={comic._id}>
                <td>{comic._id}</td>
                <td>{comic.date}</td>
                <td>{comic.nameUsa}</td>
                <td>{comic.nameBra}</td>
                <td>{comic.vol}</td>

                <td>
                  <img
                    src={process.env.REACT_APP_BASE_URL + comic.cover}
                    alt=""
                  />
                </td>

                <td>{comic.downloaded ? "SIM" : "NAO"} </td>
                <td>{comic.readen ? "SIM" : "NAO"} </td>
                <td>{comic.translated ? "SIM" : "NAO"} </td>
                <td>{comic.irrelevant ? "SIM" : "NAO"} </td>

                <td>
                  {comic.earths.map((earth) => {
                    return (
                      <Fragment key={earth}>
                        {`${earth.identification} (${earth.nameUsa}); `}
                      </Fragment>
                    );
                  })}
                </td>

                <td>{comic.stories}</td>
                <td>{comic.arc}</td>

                <td>
                  {comic.newCharacters.map((newCharacter) => {
                    return (
                      <Fragment key={newCharacter}>
                        {" "}
                        {`${newCharacter.name} (${newCharacter.status.name}); `}{" "}
                        <img src={newCharacter.pictureOne[0]} alt="" />
                      </Fragment>
                    );
                  })}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </fieldset>
  );
};

export default MainList;
