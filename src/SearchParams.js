import React, { useState, useEffect } from "react";
import pet, { ANIMALS } from "@frontendmasters/pet";
import useDropdown from "./useDropdown";

// hooks need to be in order
const SearchParams = () => {
  const [location, setLocation] = useState("Seattle, WA"); // default state
  const [breeds, setBreeds] = useState([]);
  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS); // label, default state, list of options to choose from
  const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);

  // load something before going to API to request data
  // scheduling to run after rendering the return for the first time
  useEffect(() => {
    // request a breed and if there is another breed, then clear up the breeds first
    setBreeds([]);
    // selected particular type, clear that out
    setBreed("");

    // destructure breeds out fro
    pet.breeds(animal).then(({ breeds: apiBreeds }) => {
      const breedStrings = apiBreeds.map(({ name }) => name);
      setBreeds(breedStrings);
    }, console.error);
  }, [animal, setBreed, setBreeds]); // dependancy: any of these changed than rerun this effect after it renders

  return (
    <div className="search-params">
      <h1>{location}</h1>
      <form>
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <AnimalDropdown />
        <BreedDropdown />
        <button>Submit</button>
      </form>
    </div>
  );
};
export default SearchParams;
