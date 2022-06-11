import ComicMain from "./Main";

const SectionComic = ({ ComicProperty }) => {
  return (
    <section>
      <h2>{ComicProperty === "comic" && "COMIC"}</h2>
      <ComicMain ComicProperty={ComicProperty} />
    </section>
  );
};

export default SectionComic;
