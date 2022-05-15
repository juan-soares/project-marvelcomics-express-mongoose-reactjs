import LocationMain from "./Main";

const SectionLocation = ({ locationTitle }) => {
  return (
    <section>
      <h2>
        {locationTitle === "status" && "STATUS"}
        {locationTitle === "plane" && "PLANOS"}
        {locationTitle === "galaxy" && "GALÁXIAS"}
        {locationTitle === "planet" && "PLANETAS"}
        {locationTitle === "locality" && "LOCALIDADES"}
      </h2>
      <LocationMain locationTitle={locationTitle} />
    </section>
  );
};

export default SectionLocation;
