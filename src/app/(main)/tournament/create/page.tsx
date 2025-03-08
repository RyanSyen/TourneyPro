import CreateTournamentForm from "./form";
import CreateTournamentHeader from "./header";

const CreateTournament = () => {
  return (
    <div>
      <CreateTournamentHeader />
      <div className="pt-4">
        <CreateTournamentForm />
      </div>
    </div>
  );
};

export default CreateTournament;
