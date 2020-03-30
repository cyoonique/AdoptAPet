import React, { useState, useEffect, useContext } from "react";
import pet, { ANIMALS } from "@frontendmasters/pet";
import Results from "./Results";
import useDropdown from "./useDropdown";
import "regenerator-runtime/runtime";
import ThemeContext from "./ThemeContext";

// hooks need to be in order
const SearchParams = () => {
  // [current State, updater function] destructuring an array
  const [location, setLocation] = useState("Seattle, WA"); // default state
  const [breeds, setBreeds] = useState([]);
  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS); // label, default state, list of options to choose from
  const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);
  const [pets, setPets] = useState([]);
  const [theme, setTheme] = useContext(ThemeContext);

  console.log("pet in SearchParams:", pet);
  // async always returns a promise
  // pet.animals returns a promise itself, wait here in this function until this completes
  async function requestPets() {
    const { animals } = await pet.animals({
      location,
      breed,
      type: animal,
    });
    // set with new animals or return an empty array
    setPets(animals || []);
  }

  // load something before going to API to request data
  // scheduling to run after rendering the return for the first time
  useEffect(() => {
    // request a breed and if there is another breed, then clear up the breeds first
    setBreeds([]);
    // selected particular type, clear that output
    setBreed("");

    // destructure breeds out from API data
    pet.breeds(animal).then(({ breeds: apiBreeds }) => {
      const breedStrings = apiBreeds.map(({ name }) => name);
      setBreeds(breedStrings);
    }, console.error);
  }, [animal, setBreed, setBreeds]); // dependancy: any of these change than rerun this effect after runs render(anything inside return)

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}
      >
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
        <label htmlFor="theme">
          Theme
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            onBlur={(e) => setTheme(e.target.value)}
          >
            <option value="peru">Peru</option>
            <option value="darkblue">Dark Blue</option>
            <option value="mediumorchid">Medium Orchid</option>
            <option value="chartreuse">Chartreuse</option>
          </select>
        </label>
        <button style={{ backgroundColor: theme }}>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};
export default SearchParams;
