import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  TournamentRulesSchema,
  TournamentRules,
} from "@/form_schema/tournamentRules";

interface props {
  form?: UseFormReturn<TournamentRules>;
  isEdit?: boolean;
  defaultValues: TournamentRules;
}

function TournamentRulesForm({ form, isEdit, defaultValues }: props) {
  const internalForm = useForm<TournamentRules>({
    resolver: zodResolver(TournamentRulesSchema),
    defaultValues: defaultValues,
  });

  const activeForm = form ?? internalForm;

  return (
    <section
      className={`space-y-4 overflow-y-auto pr-4 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-6`}
    >
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
        Tournament Rules
      </h4>
      <Form {...activeForm}>
        <FormField
          control={activeForm.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Tournament Rules"
                  className="resize-none min-h-80"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isEdit && (
          <section className="flex justify-end items-center gap-2 pt-4">
            <Button type="submit" variant={"tailAdminPrimary"} className="w-24">
              Save
            </Button>
          </section>
        )}
      </Form>
    </section>
  );
}

export default TournamentRulesForm;
