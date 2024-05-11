import { Button } from "@/components/ui/button";

import CategoryForm from "./categoryForm";
import TournamentDetailsForm from "./detailsForm";

const CreateTournamentForm = () => {
  return (
    <div className="flex flex-col gap-6 max-w-[1000px]">
      <TournamentDetailsForm />
      <CategoryForm />
      <section className="flex justify-end items-center gap-2 pt-8">
        <Button form="detailsForm" type="submit" variant={"main"}>
          Submit
        </Button>
      </section>
    </div>
  );
};

export default CreateTournamentForm;
