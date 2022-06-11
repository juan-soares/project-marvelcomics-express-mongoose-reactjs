import Footer from "../components/Footer";
import Header from "../components/Header";
import Nav from "../components/Nav";
import SectionComic from "../components/Section/Comic";

const ScreenComics = () => {
  const ComicsProperties = ["comic"];

  return (
    <>
      <Header />
      <Nav />
      <h1>PÁGINA COMICS</h1>

      {ComicsProperties.map((ComicsProperty) => (
        <SectionComic key={ComicsProperty} ComicsProperty={ComicsProperty} />
      ))}

      <Footer />
    </>
  );
};

export default ScreenComics;
