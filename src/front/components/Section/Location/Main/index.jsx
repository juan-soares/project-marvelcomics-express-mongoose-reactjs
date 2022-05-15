import { useState } from "react";
import MainList from "./List";
import MainCreate from "./Create";
import MainUpdate from "./Update";
import MainDelete from "./Delete";

const LocationMain = ({ locationTitle }) => {
  const [showList, setShowList] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  return (
    <main>
      <button onClick={() => setShowList(!showList)}>Listar</button>
      <button onClick={() => setShowAdd(!showAdd)}>Adicionar</button>
      <button onClick={() => setShowUpdate(!showUpdate)}>Alterar</button>
      <button onClick={() => setShowDelete(!showDelete)}>Deletar</button>

      {showList && <MainList locationTitle={locationTitle} />}
      {showAdd && <MainCreate locationTitle={locationTitle} />}
      {showUpdate && <MainUpdate locationTitle={locationTitle} />}
      {showDelete && <MainDelete locationTitle={locationTitle} />}
    </main>
  );
};

export default LocationMain;
