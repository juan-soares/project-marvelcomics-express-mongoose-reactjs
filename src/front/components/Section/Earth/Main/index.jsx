import { useState } from "react";
import MainList from "./List";
import MainCreate from "./Create";
import MainUpdate from "./Update";
import MainDelete from "./Delete";

const EarthMain = ({ earthProperty }) => {
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

      {showList && <MainList earthProperty={earthProperty} />}
      {showAdd && <MainCreate earthProperty={earthProperty} />}
      {showUpdate && <MainUpdate earthProperty={earthProperty} />}
      {showDelete && <MainDelete earthProperty={earthProperty} />}
    </main>
  );
};

export default EarthMain;
