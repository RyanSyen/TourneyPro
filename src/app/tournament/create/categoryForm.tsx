"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useBeforeUnload from "react-use/lib/useBeforeUnload";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  ErrorFormMessage,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { PrimaryInput } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { getCache, updateCache } from "@/helper/cacheable";
import { AgeGroupLookup } from "@/lookups/tournament/ageGroupLookup";
import { TournamentCategoryLookup } from "@/lookups/tournament/categoryLookup";
import { EventTypeLookup } from "@/lookups/tournament/eliminationLookup";
import { LevelLookup } from "@/lookups/tournament/levelLookup";

const formSchema = z.object({
  id: z.string(),
  category: z.string().min(1, {
    message: "Category is required.",
  }),
  ageGroup: z.string().min(1, {
    message: "Age group is required.",
  }),
  type: z.string().min(1, {
    message: "Event type is required.",
  }),
  level: z.string().min(1, {
    message: "Category level is required",
  }),
  prize: z.string().optional(),
  registrationFee: z.number().optional(),
});

interface Event {
  id: string;
  category: string;
  ageGroup: string;
  type: string;
  level: string;
  prize: string;
  registrationFee: number;
}

const multiSelectAgeGrouplookup: Option[] = AgeGroupLookup.map((group) => ({
  label: group.age,
  value: group.age,
}));

const ageSearch = async (value: string): Promise<Option[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const res = multiSelectAgeGrouplookup.filter((group) =>
        group.value.includes(value)
      );
      resolve(res);
    }, 500);
  });
};

const CategoryForm = () => {
  const [isAddEvent, setIsAddEvent] = useState(false);
  const [isEditEvent, setIsEditEvent] = useState(false);
  const [cachedCategories, setCachedCategories] = useState<Event[]>([]);
  const [ageGroupStr, setAgeGroupStr] = useState("");
  const [ageGroup, setAgeGroup] = useState<Option[]>([]);
  const [previewList, setPreviewList] = useState<Event[]>([]);
  const [isCacheUpdated, setIsCacheUpdated] = useState(false);
  const [editCategory, setEditCategory] = useState<Event>({
    id: uuidv4(),
    category: "",
    ageGroup: "",
    type: "",
    level: "",
    prize: "",
    registrationFee: 0,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    shouldFocusError: false,
    defaultValues: {
      id: uuidv4(),
      category: editCategory.category || "",
      ageGroup: editCategory.ageGroup || "",
      type: editCategory.type || "",
      level: editCategory.level || "",
      prize: editCategory.prize || "",
      registrationFee: editCategory.registrationFee || 0,
    },
  });

  useEffect(() => {
    const getDateFromLocalStorage = () => {
      const data = getCache()["tournament_category"];
      console.log("get updated tournament category cache list: ", data);
      if (data && data.length > 0) {
        setCachedCategories(data);
        setIsCacheUpdated(false);
      }
    };

    getDateFromLocalStorage();
  }, [isCacheUpdated]);

  useEffect(() => {
    console.log("ageGroupStr: ", ageGroupStr);
    if (ageGroupStr.length > 0) {
      form.setValue("ageGroup", ageGroupStr);
    }
  }, [ageGroupStr]);

  useBeforeUnload(() => {
    localStorage.clear();
    return true;
  });

  // onEditCategory is called, it will reset the form with category values
  // and it will trigger rerender to update form default values
  useEffect(() => {
    if (editCategory && editCategory.category != "") {
      console.log("editCategory: ", editCategory);
      const ageGroupList = editCategory.ageGroup.split(",");
      const optionList = ageGroupList.map((opt) => ({
        label: opt,
        value: opt,
      }));
      setAgeGroup(optionList);
      form.reset(editCategory);
    }
  }, [editCategory, form.reset]);

  const onEditCategory = (cat: Event) => {
    setIsEditEvent(true);
    setEditCategory(cat);
  };

  const resetEditCategory = () => {
    console.log("resetting edit category ...");
    setEditCategory({
      id: "",
      category: "",
      ageGroup: "",
      type: "",
      level: "",
      prize: "",
      registrationFee: 0,
    });
    setAgeGroup([]);
    setAgeGroupStr("");
  };

  const onSubmit = (data: z.output<typeof formSchema>) => {
    console.log("form data: ", data);

    const parsedData = formSchema.parse(data);

    if (parsedData) {
      const cache: Event[] = getCache()["tournament_category"];
      console.log("cache: ", cache);
      if (cache && cache.length > 0) {
        // validate to prevent creating same event
        const isDuplicate = cache.find(
          (e) =>
            e.category == parsedData.category &&
            e.type == parsedData.type &&
            e.level == parsedData.level
        );

        if (isDuplicate) {
          if (isEditEvent) {
            //! still got issue here
            const cacheCopy = [...cache].filter((e) => e.id != parsedData.id);
            console.log("cache copy: ", cacheCopy);
            updateCache([...cacheCopy, parsedData], "tournament_category");
          } else {
            //TODO: add error toast
            console.error(
              "Duplicate event detected. Category is discarded please create a new category."
            );

            return;
          }
        } else {
          const updatedData = { ...parsedData, id: uuidv4() };
          updateCache([...cache, updatedData], "tournament_category");
        }
      } else {
        updateCache([parsedData], "tournament_category");
      }

      setIsCacheUpdated(true);
      form.reset();
      resetEditCategory();
      setIsAddEvent(false);
      setIsEditEvent(false);
    }
  };

  return (
    <section
      className={`space-y-4 overflow-y-auto pr-4 bg-[#14141b] rounded-xl p-6`}
    >
      <div className="flex gap-4">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Event Category
        </h4>
        <Button
          type="button"
          variant={"main"}
          onClick={() => setIsAddEvent(true)}
        >
          {isEditEvent ? "Edit" : "Add"}
        </Button>
      </div>
      <section className={`${isAddEvent || isEditEvent ? "" : "hidden"} `}>
        <Form {...form}>
          <form
            id="detailsForm"
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6 max-w-[1000px] bg-[#14141b] rounded-xl"
          >
            <section className={`flex-wrap grid grid-cols-2 gap-x-12 gap-y-8`}>
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => {
                  // console.log("id: ", field.value);
                  return (
                    <FormItem className="hidden">
                      <FormLabel>ID</FormLabel>
                      <PrimaryInput
                        type="string"
                        value={field.value}
                        disabled
                        hidden
                      />
                      <ErrorFormMessage className="py-2" />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => {
                  // console.log("category value: ", field.value);
                  return (
                    <FormItem>
                      <FormLabel>
                        Category{" "}
                        <span className="text-[#e50b0d] text-xl">*</span>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {TournamentCategoryLookup.map((cat) => (
                            <SelectItem key={cat.id} value={cat.title}>
                              {cat.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <ErrorFormMessage className="py-2" />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="ageGroup"
                render={({ field }) => {
                  // console.log("ageGroup: ", ageGroup);
                  return (
                    <FormItem>
                      <FormLabel>
                        Age Group{" "}
                        <span className="text-[#e50b0d] text-xl">*</span>
                      </FormLabel>
                      <MultipleSelector
                        value={ageGroup}
                        onSearch={async (value) => {
                          const res = await ageSearch(value);
                          return res;
                        }}
                        defaultOptions={multiSelectAgeGrouplookup}
                        creatable
                        placeholder="Select or insert age group"
                        loadingIndicator={
                          <p className="py-2 text-center text-lg leading-10 text-muted-foreground">
                            loading...
                          </p>
                        }
                        emptyIndicator={
                          <p className="w-full text-center text-lg leading-10 text-muted-foreground">
                            no results found.
                          </p>
                        }
                        // inputProps={{ maxLength: 2 }}
                        hidePlaceholderWhenSelected
                        onChange={(options) => {
                          console.log("on change options: ", options);
                          setAgeGroup(options);
                          setAgeGroupStr(
                            options.map((obj) => obj.value).join(", ")
                          );
                        }}
                      />
                      <ErrorFormMessage className="py-2 !my-[-3px]" />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Event Type{" "}
                      <span className="text-[#e50b0d] text-xl">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an event type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {EventTypeLookup.map((type) => (
                          <SelectItem key={type.id} value={type.title}>
                            {type.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <ErrorFormMessage className="py-2" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Level <span className="text-[#e50b0d] text-xl">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {LevelLookup.map((level) => (
                          <SelectItem
                            key={level.id}
                            value={level.title}
                            className="flex items-center"
                          >
                            {level.title} - {level.tooltip}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <ErrorFormMessage className="py-2" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="prize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prize</FormLabel>
                    <PrimaryInput
                      placeholder="RM100 Cash"
                      value={field.value}
                      onChange={field.onChange}
                    />
                    <ErrorFormMessage className="py-2" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="registrationFee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Registration Fee (RM) </FormLabel>
                    <PrimaryInput
                      type="number"
                      placeholder="50"
                      value={field.value}
                      onChange={
                        (e) => field.onChange(parseFloat(e.target.value)) //! idk why got this bug where I type number but react hook form throws 'Expected number, received string'
                      }
                    />
                    <ErrorFormMessage className="py-2" />
                  </FormItem>
                )}
              />
            </section>
            <section className="flex justify-end items-center gap-2 pt-4">
              <Button
                type="button"
                variant={"secondary"}
                onClick={() => {
                  setAgeGroupStr("");
                  form.reset();
                  resetEditCategory();
                  setIsAddEvent(false);
                  setIsEditEvent(false);
                }}
                className="w-24"
              >
                Back
              </Button>
              <Button type="submit" variant={"main"} className="w-24">
                Proceed
              </Button>
            </section>
            <Separator className="my-4 py-[1px]" />
          </form>
        </Form>
      </section>

      <div>
        <div className="pb-2">Preview</div>
        <div>
          <Accordion
            type="single"
            collapsible
            className="flex flex-col gap-4 w-full py-4"
          >
            {cachedCategories.map((cat) => {
              // console.log(cat);
              return (
                <AccordionItem
                  key={uuidv4()}
                  value={`${cat.category}${cat.type}${cat.level}`}
                  className="border rounded-lg border-slate-700"
                >
                  <AccordionTrigger className="bg-slate-700 rounded-md px-2 !no-underline">
                    {`${cat.category} | ${cat.type} | ${cat.level}`}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="p-4 flex-wrap grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-12">
                      <div>
                        <Label>Category</Label>
                        <PrimaryInput
                          className="cursor-default hover:border-[#444548] focus:border-[#444548]"
                          readOnly
                          value={cat.category}
                        />
                      </div>
                      <div>
                        <Label>Type</Label>
                        <PrimaryInput
                          className="cursor-default hover:border-[#444548] focus:border-[#444548]"
                          readOnly
                          value={cat.type}
                        />
                      </div>
                      <div>
                        <Label>Age Group</Label>
                        <PrimaryInput
                          className="cursor-default hover:border-[#444548] focus:border-[#444548]"
                          readOnly
                          value={cat.ageGroup}
                        />
                      </div>
                      <div>
                        <Label>Level</Label>
                        <PrimaryInput
                          className="cursor-default hover:border-[#444548] focus:border-[#444548]"
                          readOnly
                          value={cat.level}
                        />
                      </div>
                      <div>
                        <Label>Prize</Label>
                        <PrimaryInput
                          className="cursor-default hover:border-[#444548] focus:border-[#444548]"
                          readOnly
                          value={cat.prize == "" ? "No Prize" : cat.prize}
                        />
                      </div>
                      <div>
                        <Label>Registration Fee</Label>
                        <PrimaryInput
                          className="cursor-default hover:border-[#444548] focus:border-[#444548]"
                          readOnly
                          // value={
                          //   cat.registrationFee == 0
                          //     ? "Free"
                          //     : cat.registrationFee
                          // }
                          value={cat.registrationFee}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 px-4 py-2">
                      <Button
                        variant={"secondary"}
                        onClick={() => onEditCategory(cat)}
                      >
                        Edit
                      </Button>
                      <Button variant={"main"}>Delete</Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default CategoryForm;
