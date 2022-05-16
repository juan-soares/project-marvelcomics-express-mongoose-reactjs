import EarthMain from "./Main";

const SectionEarth = ({ earthProperty }) => {
  return (
    <section>
      <h2>
        {earthProperty === "status" && "STATUS"}
        {earthProperty === "type" && "TIPOS"}
        {earthProperty === "earth" && "UNIVERSOS"}
      </h2>
      <EarthMain earthProperty={earthProperty} />
    </section>
  );
};

export default SectionEarth;
