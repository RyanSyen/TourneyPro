"use client";

import { ChangeEvent, useState } from "react";

import MalaysiaPostcodes from "../../../../public/data/MalaysiaPostcodes.json";

interface SearchResult {
  city: string;
  state: string;
}

// interface Result {
//     city: string;
//   state: string;
// }

const SearchArea = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState<SearchResult[] | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    console.log("search term: ", searchTerm);
    setSearchTerm(searchTerm);

    let cities: SearchResult[] = [];

    // linear search by city name
    for (let stateData of MalaysiaPostcodes.state) {
      for (let cityData of stateData.city) {
        if (cityData.name.toLowerCase().includes(searchTerm.toLowerCase())) {
          cities.push({
            city: cityData.name,
            state: stateData.name,
          });
          break;
        }
      }
    }

    console.log("result: ", cities);

    // if city not found by name, try search by postcode
    if (cities.length == 0) {
      for (let stateData of MalaysiaPostcodes.state) {
        for (let cityData of stateData.city) {
          if (cityData.postcode.includes(searchTerm)) {
            cities.push({
              city: cityData.name,
              state: stateData.name,
            });
            break;
          }
        }
      }
    }

    console.log("search by postcode: ", cities);

    setSearchResult(cities);
  };

  return (
    <div>
      <input
        type="text"
        className="text-black"
        value={searchTerm}
        // onChange={handleInputChange}
        onChange={handleSearch}
      />
      {/* <button onClick={handleSearch}>Search</button> */}

      {searchTerm &&
        searchResult?.map((data) => (
          <div key={data.state}>
            <p>City: {data.city}</p>
            <p>State: {data.state}</p>
          </div>
        ))}
    </div>
  );
};

export default SearchArea;
