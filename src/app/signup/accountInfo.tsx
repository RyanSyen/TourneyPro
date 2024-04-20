// import "../customDatePicker.scss";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format, formatDate } from "date-fns";
import dayjs from "dayjs";
import { ChangeEvent, useEffect, useRef, useState } from "react";
// import Calendar from "react-calendar";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

// import formSchema from "@/components/auth/sign-up/formSchema";
import CustomDatePicker from "@/components/common/customDatePicker";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  ErrorFormMessage,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { PrimaryInput } from "@/components/ui/input";
import {
  Popover,
  PopoverTrigger,
  PrimaryPopoverContent,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { IUserData, useUserContext } from "@/context/UserProvider";

import MalaysiaPostcodes from "../../../public/data/MalaysiaPostcodes.json";
import ReactDatePicker from "../playground/react-date-picker/page";
import { getUserByEmail } from "../service/user/userService";
import { IFormData } from "./useForm";

interface SearchResult {
  city: string;
  state: string;
}

interface Props {
  prev: () => void;
  next: () => void;
  formData: IFormData;
  onSubmitStep: (data: IFormData) => void;
}

export const schema = z.object({
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
  // gender: z.enum(["male", "female", ""], {
  //   required_error: "You need to select a gender.",
  // }),
  gender: z.string().min(1, {
    message: "You need to select a gender.",
  }),
});

const AccountInfo = ({ prev, next, formData, onSubmitStep }: Props) => {
  const user = useUserContext();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    shouldFocusError: false,
    defaultValues: {
      // since formField is using controlled component, you need to provide default value for the field
      fullName: formData.fullName || user?.fullName || "",
      email: formData.email || user?.email || "",
      phoneNumber: formData.phoneNumber || "",
      // area: formData.area || "",
      // dob: dayjs().startOf("day").toDate(),
      dob: formData.dob || "",
      gender: formData.gender || undefined,
    },
  });

  //#region search area
  // search bar states
  const [searchTerm, setSearchTerm] = useState(formData.area || "");
  const [searchResult, setSearchResult] = useState<SearchResult[] | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    // console.log("search term: ", searchTerm);
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

    // console.log("result: ", cities);

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

    // console.log("search by postcode: ", cities);

    setSearchResult(cities);
    setShowDropdown(cities.length > 0 && searchTerm.length > 0 ? true : false);
  };

  const onClickArea = (value: string) => {
    form.setValue("area", value);
    setShowDropdown(false);
  };
  //#endregion

  // in order to override the onchange input element, we need to use the setValue from useForm to override the form value
  useEffect(() => {
    form.setValue("area", searchTerm);
    // form.setValue("dob", dob);
  }, [searchTerm]);

  const onSubmit = async (data: z.output<typeof schema>) => {
    const profileUrl = user?.photoURL || "";
    // console.log("profileUrl: ", profileUrl);
    // console.log("data: ", data);

    try {
      let res = await getUserByEmail(data.email);

      if (res.email) {
        console.log("email has been taken");
        // form.setFocus("email");
        form.setError("email", {
          type: "custom",
          message: "Email already in use. Please enter a new and valid email.",
        });
      } else {
        form.clearErrors("email");
        // form.resetField("email");
        onSubmitStep({
          ...formData,
          area: data.area,
          dob: data.dob,
          email: data.email,
          fullName: data.fullName,
          gender: data.gender,
          phoneNumber: data.phoneNumber,
          photoUrl: profileUrl,
        });
        next();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <p className="text-2xl font-medium tracking-normal py-4">Account Info</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <main className={`space-y-4 overflow-y-auto pr-4`}>
            <section className="flex-wrap items-center grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-12">
              {/* Full Name */}
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Full Name{" "}
                      <span className="text-[#e50b0d] text-xl">*</span>
                    </FormLabel>
                    <FormControl>
                      <PrimaryInput placeholder="Lee Chong Wei" {...field} />
                    </FormControl>
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
                render={({ field }) => {
                  // console.log(field);
                  // console.log(
                  //   "default: ",
                  //   dayjs().startOf("day").subtract(1, "day").toDate()
                  // );
                  // console.log(dayjs(field.value).startOf("day").toDate());
                  return (
                    <FormItem className="flex flex-col">
                      <FormLabel>
                        Date Of Birth{" "}
                        <span className="text-[#e50b0d] text-xl">*</span>
                      </FormLabel>
                      {/* <FormControl>
                        <ReactDatePicker />
                      </FormControl> */}
                      <Popover
                        open={isCalendarOpen}
                        onOpenChange={setIsCalendarOpen}
                      >
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
                          <CustomDatePicker
                            selectedDate={field.value}
                            onChange={(value) => {
                              field.onChange(value);
                              setIsCalendarOpen(false);
                            }}
                          />
                        </PrimaryPopoverContent>
                      </Popover>
                      <ErrorFormMessage />
                    </FormItem>
                  );
                }}
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
                        <FormItem className="flex items-center space-y-0">
                          <FormControl>
                            <RadioGroupItem value="male" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer pl-2">
                            Male
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-y-0">
                          <FormControl>
                            <RadioGroupItem value="female" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer pl-2">
                            Female
                          </FormLabel>
                        </FormItem>
                        <FormItem className="hidden">
                          <FormControl>
                            <RadioGroupItem value="" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer pl-2">
                            Hidden
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <ErrorFormMessage />
                  </FormItem>
                )}
              />
            </section>
          </main>

          {/* {props.isDialog ? (
          <section className="flex justify-center items-center pt-8">
            <Button type="submit" variant={"main"}>
              Submit
            </Button>
          </section>
        ) : (
          <section className="flex justify-end items-center gap-2 pt-8">
            <Button variant={"secondary"} onClick={() => route.back()}>
              Cancel
            </Button>
            <Button type="submit" variant={"main"}>
              Create
            </Button>
          </section>
        )} */}
          <section className="flex justify-end items-center gap-2 pt-8">
            <Button
              type="submit"
              variant={"secondary"}
              onClick={prev}
              className="w-24"
            >
              Back
            </Button>
            <Button type="submit" variant={"main"} className="w-24">
              Proceed
            </Button>
          </section>
        </form>
      </Form>
    </>
  );
};

export default AccountInfo;
