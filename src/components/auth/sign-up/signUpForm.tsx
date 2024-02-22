import "react-phone-input-2/lib/style.css";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import { z } from "zod";

import { Button } from "@/components/ui/button";
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

const formSchema = z.object({
  fullName: z.string().min(1, {
    message: "Full Name is required",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phoneNumber: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  // dob: z.date({
  //   required_error: "Date of birth is required.",
  // }),
  // gender: z.enum(["male", "female"], {
  //   required_error: "You need to select a gender.",
  // }),
  // area: z.string().min(1, {
  //   message: "Please enter your area.",
  // }),
});

const SignUpForm = () => {
  // define form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // defaultValues: {
    //   username: "", // since formField is using controlled component, you need to provide default value for the field
    // },
  });

  // define submit handler
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <section className="flex-wrap items-center grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-12">
          {/* Full Name */}
          <FormField
            control={form.control}
            name="fullName"
            defaultValue=""
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
            defaultValue=""
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
        <section className="flex-wrap items-center grid grid-cols-1 gap-12 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="phoneNumber"
            defaultValue=""
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
                    inputStyle={{ width: "100%", color: "#000" }}
                    containerStyle={{ marginBottom: "1rem" }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </section>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default SignUpForm;
