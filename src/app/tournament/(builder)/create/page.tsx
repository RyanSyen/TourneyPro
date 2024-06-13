import TournamentDetailsForm from "./detailsForm";

const CreateTournament = () => {
  return (
    <div>
      <h3 className="scroll-m-20 text-2xl font-medium tracking-tight border-l-4 border-[#e50b0d] px-4 my-8">
        Create Tournament
      </h3>
      <TournamentDetailsForm />
    </div>
  );
};

export default CreateTournament;
