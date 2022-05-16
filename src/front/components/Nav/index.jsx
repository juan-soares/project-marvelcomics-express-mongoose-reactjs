import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">
            <button>Home</button>
          </Link>
        </li>
        <li>
          <Link to="/locations">
            <button>Localizações</button>
          </Link>
        </li>
        <li>
          <Link to="/earths">
            <button>Universos</button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
