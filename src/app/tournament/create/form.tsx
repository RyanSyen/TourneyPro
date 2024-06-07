// "use client";

// import dayjs from "dayjs";
// import { useState } from "react";
// import { z } from "zod";

// import { Button } from "@/components/ui/button";

// import CategoryForm, { Event as ICategory } from "./categoryForm";
// import ComingSoon from "./comingSoon";
// import TournamentDetailsForm, { ITournamentDetails } from "./detailsForm";
// import MatchForm, { IMatch } from "./matchForm";
// import RegistrationTimelineForm, {
//   RegistrationTimelineProp as IRegistration,
// } from "./registrationForm";

// export interface TournamentDetails {
//   details: ITournamentDetails;
//   categories: ICategory[];
//   registration: IRegistration;
//   match: IMatch;
// }

// const formSchema = z.object({
//   title: z.string().min(1, {
//     message: "Tournament name is required.",
//   }),
//   description: z.string().optional(),
//   thumbnail: z.string().min(1, {
//     message: "Tournament thumbnail is required",
//   }),
//   isPublic: z.boolean({
//     required_error: "Tournament visibility is required.",
//   }),
//   type: z.array(z.string()).refine((value) => value.some((item) => item), {
//     message: "You have to select at least one tournament type.",
//   }),
//   date: z.string({
//     required_error: "Tournament date is required.",
//   }),
//   location: z.string().min(1, {
//     message: "Tournament points system is required.",
//   }),
// });

// const CreateTournamentForm = () => {
//   const [formData, setFormData] = useState<TournamentDetails>({
//     categories: [],
//     details: {
//       title: "",
//       description: "",
//       thumbnail: "",
//       isPublic: true,
//       type: [],
//       date: "",
//       location: "",
//     },
//     match: {
//       points: 21,
//       changeOfEnds: 1,
//       gracePeriod: 3,
//       allowSpinServe: false,
//       allowDeuce: true,
//     },
//     registration: {
//       startDate: dayjs().subtract(14, "days").toDate(),
//       endDate: dayjs().subtract(8, "days").toDate(),
//       withdrawalStartDate: dayjs().subtract(10, "days").toDate(),
//       withdrawalEndDate: dayjs().subtract(7, "days").toDate(),
//     },
//   });

//   const onSubmitForms = () => {
//     console.log("submitting all forms");
//   };

//   const onUpdateFormData = (data: TournamentDetails) => {
//     setFormData(data);
//   };

//   return (
//     <div className="flex flex-col gap-6 max-w-[1000px]">
//       <TournamentDetailsForm />
//       <CategoryForm formData={formData} onUpdateFormData={onUpdateFormData} />
//       <RegistrationTimelineForm
//         formData={formData}
//         onUpdateFormData={onUpdateFormData}
//       />
//       <MatchForm formData={formData} onUpdateFormData={onUpdateFormData} />
//       <ComingSoon />
//       <section className="flex justify-end items-center gap-2 py-8">
//         <Button variant={"main"} onClick={onSubmitForms}>
//           Submit
//         </Button>
//       </section>
//     </div>
//   );
// };

// export default CreateTournamentForm;
