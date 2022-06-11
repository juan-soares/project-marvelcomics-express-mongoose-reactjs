import { Routes, Route } from "react-router-dom";
import ScreenCharacters from "./screens/Characters";
import ScreenEarths from "./screens/Earths";
import ScreenHome from "./screens/Home";
import ScreenLocations from "./screens/Locations";
import ScreenComics from "./screens/Comics";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ScreenHome />} />
        <Route path="/locations" element={<ScreenLocations />} />
        <Route path="/earths" element={<ScreenEarths />} />
        <Route path="/characters" element={<ScreenCharacters />} />
        <Route path="/comics" element={<ScreenComics />} />
      </Routes>
    </>
  );
};

export default App;
