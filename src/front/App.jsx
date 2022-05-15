import { Routes, Route } from "react-router-dom";
import ScreenHome from './screens/Home';
import ScreenLocations from "./screens/Locations";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ScreenHome />} />
        <Route path="/locations" element={<ScreenLocations />} />
      </Routes>
    </>
  );
};

export default App;
