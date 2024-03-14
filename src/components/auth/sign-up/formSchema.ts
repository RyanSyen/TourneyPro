import { z } from "zod";

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

export default formSchema;
