import "react-phone-input-2/lib/style.css";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  ErrorFormMessage,
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
  Popover,
  PopoverContent,
  PopoverTrigger,
  PrimaryPopoverContent,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

import MalaysiaPostcodes from "../../../../public/data/MalaysiaPostcodes.json";

interface SearchResult {
  city: string;
  state: string;
}

const formSchema = z.object({
  fullName: z.string().min(1, {
    message: "Full Name is required.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phoneNumber: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  area: z.string().min(1, {
    message: "Please enter your city or postcode.",
  }),
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
  gender: z.enum(["male", "female"], {
    required_error: "You need to select a gender.",
  }),
});

const SignUpForm = () => {
  //#region react-hook-form
  // define form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // since formField is using controlled component, you need to provide default value for the field
      fullName: "",
      email: "",
      phoneNumber: "",
      area: "",
    },
  });

  // define submit handler
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };
  //#endregion

  //#region search area
  // search bar states
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
  //#endregion

  // use setValue from useForm to change form value
  // used when you want to override the onchange input element
  useEffect(() => {
    form.setValue("area", searchTerm);
  }, [searchTerm]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <main className="space-y-4 max-h-64 overflow-y-auto pr-4">
          <section className="flex-wrap items-center grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-12">
            {/* Full Name */}
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Full Name <span className="text-[#e50b0d] text-xl">*</span>
                  </FormLabel>
                  <FormControl>
                    <PrimaryInput placeholder="Lee Chong Wei" {...field} />
                  </FormControl>
                  {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
                  <ErrorFormMessage />
                </FormItem>
              )}
            />
            {/* Email Address */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email Address{" "}
                    <span className="text-[#e50b0d] text-xl">*</span>
                  </FormLabel>
                  <FormControl>
                    <PrimaryInput placeholder="lcw@gmail.com" {...field} />
                  </FormControl>
                  <ErrorFormMessage />
                </FormItem>
              )}
            />
          </section>
          <section className="flex-wrap items-center grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-12">
            {/* Mobile Number */}
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className="mobile-input">
                  <FormLabel>
                    Mobile Number{" "}
                    <span className="text-[#e50b0d] text-xl">*</span>
                  </FormLabel>
                  <FormControl>
                    <PhoneInput
                      {...field}
                      placeholder="Please enter phone number"
                      country={"my"}
                      inputStyle={{}}
                      containerStyle={{}}
                    />
                  </FormControl>
                  <ErrorFormMessage />
                </FormItem>
              )}
            />
            {/* Area */}
            <FormField
              control={form.control}
              name="area"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel>
                    Area <span className="text-[#e50b0d] text-xl">*</span>
                  </FormLabel>
                  <FormControl>
                    <PrimaryInput
                      type="text"
                      placeholder="Enter your city or postcode"
                      {...field}
                      onChange={handleSearch}
                      autoComplete="off"
                    />
                  </FormControl>
                  <ul
                    className={`absolute w-full mt-1 bg-[#2d3038] border rounded shadow-md max-h-40 overflow-y-auto ${
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
                          <p
                            onClick={() =>
                              onClickArea(`${data.city}, ${data.state}`)
                            }
                          >
                            {data.city}, {data.state}
                          </p>
                        </li>
                      ))}
                  </ul>
                  {!searchTerm && <ErrorFormMessage />}
                </FormItem>
              )}
            />
          </section>
          <section className="flex-wrap items-center grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-12">
            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>
                    Date Of Birth{" "}
                    <span className="text-[#e50b0d] text-xl">*</span>
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button variant={"lineInput"} size={"input"}>
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PrimaryPopoverContent
                      className="w-auto p-0"
                      align="start"
                      variant={"primary"}
                    >
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PrimaryPopoverContent>
                  </Popover>
                  <ErrorFormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-4"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="male" />
                        </FormControl>
                        <FormLabel className="font-normal">Male</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="female" />
                        </FormControl>
                        <FormLabel className="font-normal">Female</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <ErrorFormMessage />
                </FormItem>
              )}
            />
          </section>
        </main>

        <section className="flex justify-center items-center pt-8">
          <Button type="submit" variant={"continue"}>
            Submit
          </Button>
        </section>
      </form>
    </Form>
  );
};

export default SignUpForm;
