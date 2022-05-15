import Footer from "../components/Footer";
import Header from "../components/Header";
import Nav from "../components/Nav";
import SectionLocation from "../components/Section/Location";

const ScreenLocations = () => {
  const locationsTitles = ["status", "plane", "galaxy", "planet", "locality"];

  return (
    <>
      <Header />
      <Nav />
      <h1>PÁGINA LOCALIZAÇÕES</h1>

      {locationsTitles.map((locationTitle) => (
        <SectionLocation key={locationTitle} locationTitle={locationTitle} />
      ))}

      <Footer />
    </>
  );
};

export default ScreenLocations;
