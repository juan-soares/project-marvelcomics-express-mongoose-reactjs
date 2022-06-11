import { useState } from "react";
import MainList from "./List";
import MainCreate from "./Create";
import MainUpdate from "./Update";
import MainDelete from "./Delete";

const ComicMain = ({ ComicProperty }) => {
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

      {showList && <MainList ComicProperty={ComicProperty} />}
      {showAdd && <MainCreate ComicProperty={ComicProperty} />}
      {showUpdate && <MainUpdate ComicProperty={ComicProperty} />}
      {showDelete && <MainDelete ComicProperty={ComicProperty} />}
    </main>
  );
};

export default ComicMain;
