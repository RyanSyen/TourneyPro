import { Button } from "@/components/ui/button";

import CategoryForm from "./categoryForm";
import ComingSoon from "./comingSoon";
import TournamentDetailsForm from "./detailsForm";
import MatchForm from "./matchForm";
import RegistrationTimelineForm from "./registrationForm";

const CreateTournamentForm = () => {
  return (
    <div className="flex flex-col gap-6 max-w-[1000px]">
      <TournamentDetailsForm />
      <CategoryForm />
      <RegistrationTimelineForm />
      <MatchForm />
      <ComingSoon />
      <section className="flex justify-end items-center gap-2 pt-8">
        <Button form="registrationTimelineForm" type="submit" variant={"main"}>
          Submit
        </Button>
      </section>
    </div>
  );
};

export default CreateTournamentForm;
