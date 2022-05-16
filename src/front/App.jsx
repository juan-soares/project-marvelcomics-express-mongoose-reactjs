import { Routes, Route } from "react-router-dom";
import ScreenEarths from "./screens/Earths";
import ScreenHome from './screens/Home';
import ScreenLocations from "./screens/Locations";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ScreenHome />} />
        <Route path="/locations" element={<ScreenLocations />} />
        <Route path="/earths" element={<ScreenEarths />} />
      </Routes>
    </>
  );
};

export default App;
