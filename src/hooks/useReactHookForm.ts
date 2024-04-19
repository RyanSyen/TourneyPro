import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z, ZodObject, ZodSchema } from "zod";

import { schema } from "@/app/signup/accountInfo";

interface props {
  defaultValues: any;
  formSchema: typeof schema; // we have to import the type of schema, we cannot make it reusable
}

//! ignore and dont use this hook
//! this cannot be reusable because of mapping the specific types of schema to formSchema
const useReactHookForm = ({ defaultValues, formSchema }: props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  return {
    form,
  };
};

// export default useReactHookForm;
