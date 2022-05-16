import Footer from "../components/Footer";
import Header from "../components/Header";
import Nav from "../components/Nav";
import SectionCharacter from "../components/Section/Character";

const ScreenCharacters = () => {
  const characterProperties = [
    "codename",
    "race",
    "affiliation",
    "status",
    "character",
  ];

  return (
    <>
      <Header />
      <Nav />
      <h1>PÁGINA PERSONAGENS</h1>

      {characterProperties.map((characterProperty) => (
        <SectionCharacter
          key={characterProperty}
          characterProperty={characterProperty}
        />
      ))}

      <Footer />
    </>
  );
};

export default ScreenCharacters;
