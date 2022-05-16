import Footer from "../components/Footer";
import Header from "../components/Header";
import Nav from "../components/Nav";
import SectionEarth from "../components/Section/Earth";

const ScreenEarths = () => {
  const earthProperties = ["status", "type", "earth"];

  return (
    <>
      <Header />
      <Nav />
      <h1>PÁGINA UNIVERSOS</h1>

      {earthProperties.map((earthProperty) => (
        <SectionEarth key={earthProperty} earthProperty={earthProperty} />
      ))}

      <Footer />
    </>
  );
};

export default ScreenEarths;
