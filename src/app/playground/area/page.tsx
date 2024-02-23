"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input, PrimaryInput } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

import MalaysiaPostcodes from "../../../../public/data/MalaysiaPostcodes.json";

interface SearchResult {
  city: string;
  state: string;
}

// https://github.com/AsyrafHussin/malaysia-postcodes/blob/main/all.json

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

const FormSchema = z.object({
  area: z.string({
    required_error: "Please enter your city or postcode.",
  }),
});
const SearchAreaForm = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState<SearchResult[] | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

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
    setShowDropdown(cities.length > 0 && searchTerm.length > 0 ? true : false);
  };

  const onClickArea = (value: string) => {
    form.setValue("area", value);
    setShowDropdown(false);
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    setShowDropdown(false);
  }

  return (
    // <Form {...form}>
    <div className="relative">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <PrimaryInput
          type="text"
          placeholder="Search..."
          {...form.register("area")}
          onChange={handleSearch}
          className=""
        />
      </form>
      <ul
        className={`absolute w-full mt-1 bg-transparent border rounded shadow-md max-h-52 overflow-y-auto ${
          !showDropdown ? "hidden" : ""
        }`}
      >
        {searchTerm &&
          showDropdown &&
          searchResult?.map((data) => (
            <li
              key={data.state}
              className="cursor-pointer  px-4 py-2 hover:bg-[#494D5B]"
            >
              {/* <p>City: {data.city}</p>
              <p>State: {data.state}</p> */}
              <p onClick={() => onClickArea(`${data.city}, ${data.state}`)}>
                {data.city}, {data.state}
              </p>
            </li>
          ))}
      </ul>
      <button type="submit">Submit</button>
    </div>

    // </Form>
  );
};

const Area = () => {
  return (
    <div className="flex flex-wrap justify-center items-center gap-8">
      <SearchArea />
      <SearchAreaForm />
    </div>
  );
};

export default Area;
