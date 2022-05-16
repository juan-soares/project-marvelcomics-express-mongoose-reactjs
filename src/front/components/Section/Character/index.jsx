import CharacterMain from "./Main";

const SectionCharacter = ({ characterProperty }) => {
  return (
    <section>
      <h2>
        {characterProperty === "affiliation" && "EQUIPES"}
        {characterProperty === "codename" && "CODENOMES"}
        {characterProperty === "race" && "RAÇAS"}
        {characterProperty === "status" && "STATUS"}
        {characterProperty === "character" && "PERSONAGENS"}
      </h2>
      <CharacterMain characterProperty={characterProperty} />
    </section>
  );
};

export default SectionCharacter;
