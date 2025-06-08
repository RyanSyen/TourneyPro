// "use client"

// import { useEffect, useState } from "react";
// import { z } from "zod";
// import { Spinner } from "@/components/ui/spinner";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormMessage,
// } from "@/components/ui/form";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import { ITournamentDetails } from "@/types/tournament";
// import dayjs from "dayjs";
// import { Tournament } from "@/form_schema/tournament";
// import MatchSettingsForm from "../../../shared/components/match-settings-form";
// import TournamentRulesForm from "../../../shared/components/tournament-rules-form";
// import { MatchSettings, MatchSettingsSchema } from "@/form_schema/matchSetting";
// import {
//   TournamentRules,
//   TournamentRulesSchema,
// } from "@/form_schema/tournamentRules";

// const RulesFormSchema = z.object({
//   rules: z
//     .string()
//     .min(10, {
//       message: "Tournament rules must be at least 10 characters.",
//     })
//     .max(1000, {
//       message: "Tournament rules must not be longer than 1000 characters.",
//     })
//     .optional(),
// });

// function Rules({ tournament }: { tournament: ITournamentDetails }) {
//   const matchSettingsForm = useForm<MatchSettings>({
//       resolver: zodResolver(MatchSettingsSchema),
//       shouldFocusError: false,
//       defaultValues: stepTwoData.matchSettings,
//     });

//     const tournamentRulesForm = useForm<TournamentRules>({
//       resolver: zodResolver(TournamentRulesSchema),
//       shouldFocusError: false,
//       defaultValues: stepTwoData,
//     });
//   // const [matchSettings, setMatchSettings] = useState<
//   //   z.infer<typeof MatchSettingsSchema> | undefined
//   // >(undefined);
//   // const [loading, setLoading] = useState<boolean>(true);

//   // const form = useForm<z.infer<typeof RulesFormSchema>>({
//   //   resolver: zodResolver(RulesFormSchema),
//   //   defaultValues: {
//   //     rules: tournament.rules ?? "",
//   //   },
//   // });

//   // const { reset } = form;

// //   useEffect(() => {
// //     console.log('calling useEffect')
// //     const loadMatchSettings = async () => {
// //       try {
// //         setLoading(true);
// //         const matchSettings = await fetchMatchSettings(tournament.id!);
// //         console.log("matchSettings: ", matchSettings);
// //         setMatchSettings(matchSettings);
// //         const generatedRules = `Match Rules:
// // 1. Matches are played in ${matchSettings?.points ?? 21} points.
// // 2. Matches are played in ${matchSettings?.changeOfEnds ?? 1} set(s).
// // 3. Grace period allowed is ${matchSettings?.gracePeriod ?? 3} minutes after the empire has reached the court.
// // 4. Players are ${matchSettings?.allowSpinServe ? "allowed" : "not allowed"} to serve spin serves.
// // 5. Players are ${matchSettings?.allowDeuce ? "allowed" : "not allowed"} to play deuce.`;
// //         const userDefinedRules = tournament.rules?.split('\n').slice(6).join('\n') ?? '';


// //       reset({ rules: generatedRules + '\n' + userDefinedRules });
// //       } catch (error) {
// //         console.error("Error fetching matchSettings:", error);
// //         // Handle error state if needed
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     loadMatchSettings();
// //   }, [fetchMatchSettings, tournament.id, reset, tournament.rules]);



//   // async function onSubmit(data: z.infer<typeof RulesFormSchema>) {
//   //   console.log("Form Data: ", data);
//   //   const updatedTournament: Tournament = {
//   //       ...tournament,
//   //       registrationDate: {
//   //           from: dayjs(tournament.registrationDate.from).startOf("day").toISOString(),
//   //           to: dayjs(tournament.registrationDate.to).endOf("day").toISOString(),
//   //       },
//   //       date: {
//   //           from: dayjs(tournament.date.from).startOf("day").toISOString(),
//   //           to: dayjs(tournament.date.to).endOf("day").toISOString(),
//   //       },
//   //       rules: data.rules,
//   //   };
//   //   await updateTournament(tournament.id!, updatedTournament);
//   //   // router.refresh();
//   //   // router.push(`/tournament/edit/${tournament.id!}?t=rules`);
//   //   window.location.reload();
//   // }

//   if (loading)
//     return (
//       <div className="flex justify-center items-center gap-3">
//         <Spinner size="large" />
//       </div>
//     );

//   return (
//     <div className="flex flex-col gap-8">
//       <MatchSettingsForm
//         form={matchSettingsForm}
//         defaultValues={stepTwoData.matchSettings}
//       />
//       <div className="my-6" />
//       <TournamentRulesForm
//         form={tournamentRulesForm}
//         defaultValues={stepTwoData}
//       />
//       {/* <section
//         className={`space-y-4 overflow-y-auto pr-4 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-6`}
//       >
//         <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
//           Match Settings
//         </h4>
//         <MatchSettings
//           tournamentId={tournament.id!}
//           matchSettings={matchSettings!}
//         />
//       </section>
//       <section
//         className={`space-y-4 overflow-y-auto pr-4 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-6`}
//       >
//         <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
//           Tournament Rules
//         </h4>
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)}>
//             <FormField
//               control={form.control}
//               name="rules"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormControl>
//                     <Textarea
//                       placeholder="Tournament Rules"
//                       className="resize-none min-h-80"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <section className="flex justify-end items-center gap-2 pt-4">
//               <Button
//                 type="submit"
//                 variant={"tailAdminPrimary"}
//                 className="w-24"
//               >
//                 Save
//               </Button>
//             </section>
//           </form>
//         </Form>
//       </section> */}
//     </div>
//   );
// }

// export default Rules;
