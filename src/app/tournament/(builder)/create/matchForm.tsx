// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { InfoCircledIcon } from "@radix-ui/react-icons";
// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";

// import {
//   ErrorFormMessage,
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
// } from "@/components/ui/form";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Switch } from "@/components/ui/switch";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import { GracePeriodLookup } from "@/lookups/tournament/gracePeriodLookup";
// import { PointsLookup } from "@/lookups/tournament/pointsLookup";
// import { SetsLookup } from "@/lookups/tournament/setsLookup";

// import { TournamentDetails } from "./form";

// export const formSchema = z.object({
//   points: z.number().min(1, {
//     message: "Tournament point system is required.",
//   }),
//   changeOfEnds: z.number().min(1, {
//     message: "Change of ends is required",
//   }),
//   gracePeriod: z.number().min(1, {
//     message: "Grace period is required",
//   }),
//   allowSpinServe: z.boolean({
//     required_error: "Allow spin serve is required.",
//   }),
//   allowDeuce: z.boolean({
//     required_error: "Allow spin serve is required.",
//   }),
// });

// export interface IMatch {
//   points: number;
//   changeOfEnds: number;
//   gracePeriod: number;
//   allowSpinServe: boolean;
//   allowDeuce: boolean;
// }

// interface Props {
//   formData: TournamentDetails | null;
//   onUpdateFormData: (data: TournamentDetails) => void;
// }

// const MatchForm = ({ formData, onUpdateFormData }: Props) => {
//   const [allowSpinServe, setAllowSpinServe] = useState(false);
//   const [allowDeuce, setAllowDeuce] = useState(true);

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     shouldFocusError: false,
//     defaultValues: {
//       // since formField is using controlled component, you need to provide default value for the field
//       points: 21,
//       changeOfEnds: 1,
//       gracePeriod: 3,
//       allowSpinServe: false,
//       allowDeuce: true,
//     },
//   });

//   useEffect(() => {
//     if (allowSpinServe) {
//       form.setValue("allowSpinServe", allowSpinServe);
//     }

//     if (allowDeuce) {
//       form.setValue("allowDeuce", allowDeuce);
//     }
//   }, [form, allowSpinServe, allowDeuce]);

//   const onSubmit = (data: z.output<typeof formSchema>) => {
//     console.log("form data: ", data);
//   };

//   return (
//     <Form {...form}>
//       <form id="matchForm" onSubmit={form.handleSubmit(onSubmit)}>
//         <section
//           className={`space-y-4 overflow-y-auto pr-4 bg-[#14141b] rounded-xl p-6`}
//         >
//           <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
//             Match Details
//           </h4>
//           <div className="flex-wrap grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-12">
//             <FormField
//               control={form.control}
//               name="points"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>
//                     Points <span className="text-[#e50b0d] text-xl">*</span>
//                   </FormLabel>
//                   <Select
//                     onValueChange={field.onChange}
//                     defaultValue={field.value.toString()}
//                     value={field.value.toString()}
//                   >
//                     <FormControl>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select the points" />
//                       </SelectTrigger>
//                     </FormControl>
//                     <SelectContent>
//                       {PointsLookup.map((item) => (
//                         <SelectItem
//                           key={item.id}
//                           value={item.points.toString()}
//                         >
//                           {item.points}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                   <ErrorFormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="changeOfEnds"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>
//                     Number of sets{" "}
//                     <span className="text-[#e50b0d] text-xl">*</span>
//                   </FormLabel>
//                   <Select
//                     onValueChange={field.onChange}
//                     defaultValue={field.value.toString()}
//                     value={field.value.toString()}
//                   >
//                     <FormControl>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select the number of sets" />
//                       </SelectTrigger>
//                     </FormControl>
//                     <SelectContent>
//                       {SetsLookup.map((item) => (
//                         <SelectItem key={item.id} value={item.sets.toString()}>
//                           {item.sets}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                   <ErrorFormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="gracePeriod"
//               render={({ field }) => {
//                 return (
//                   <FormItem className="flex flex-col">
//                     <FormLabel>
//                       Grace Period (minutes){" "}
//                       <TooltipProvider>
//                         <Tooltip>
//                           <TooltipTrigger type="button" className="pl-2">
//                             <InfoCircledIcon />
//                           </TooltipTrigger>
//                           <TooltipContent
//                             align="start"
//                             side="top"
//                             className="!bg-[#333] "
//                           >
//                             <p className="text-[#fcfcfc] max-w-[300px] text-wrap">
//                               The player must be present in the court within the
//                               grace period after the umpire has reached the
//                               court. Else, the opponent will win by walkover.
//                             </p>
//                           </TooltipContent>
//                         </Tooltip>
//                       </TooltipProvider>
//                       <span className="text-[#e50b0d] text-xl pl-1">*</span>
//                     </FormLabel>
//                     <Select
//                       onValueChange={field.onChange}
//                       defaultValue={field.value.toString()}
//                       value={field.value.toString()}
//                     >
//                       <FormControl>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select a grace period" />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         {GracePeriodLookup.map((item) => (
//                           <SelectItem
//                             key={item.id}
//                             value={item.period.toString()}
//                           >
//                             {item.period}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                     <ErrorFormMessage />
//                   </FormItem>
//                 );
//               }}
//             />
//             <FormField
//               control={form.control}
//               name="allowSpinServe"
//               render={({ field }) => (
//                 <FormItem className="flex flex-col">
//                   <FormLabel className="flex items-center">
//                     Allow Spin Serve{" "}
//                     <TooltipProvider>
//                       <Tooltip>
//                         <TooltipTrigger type="button" className="pl-2">
//                           <InfoCircledIcon />
//                         </TooltipTrigger>
//                         <TooltipContent
//                           align="start"
//                           side="top"
//                           className="!bg-[#333] "
//                         >
//                           <p className="text-[#fcfcfc] max-w-[300px] text-wrap">
//                             A spin serve involves spinning the shuttle before
//                             releasing the shuttle or hitting the feathers to
//                             create a spin.
//                           </p>
//                         </TooltipContent>
//                       </Tooltip>
//                     </TooltipProvider>
//                     <span className="text-[#e50b0d] text-xl pl-1">*</span>
//                   </FormLabel>
//                   <FormControl>
//                     <Switch
//                       checked={allowSpinServe}
//                       onCheckedChange={setAllowSpinServe}
//                     />
//                   </FormControl>
//                   <ErrorFormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="allowDeuce"
//               render={({ field }) => (
//                 <FormItem className="flex flex-col">
//                   <FormLabel className="flex items-center">
//                     Allow Deuce{" "}
//                     <TooltipProvider>
//                       <Tooltip>
//                         <TooltipTrigger type="button" className="pl-2">
//                           <InfoCircledIcon />
//                         </TooltipTrigger>
//                         <TooltipContent
//                           align="start"
//                           side="top"
//                           className="!bg-[#333] "
//                         >
//                           <p className="text-[#fcfcfc] max-w-[300px] text-wrap">
//                             Deuce refers to a tied score where either one side
//                             must lead by 2 points in order to win the game.E.g.
//                             22-20
//                           </p>
//                         </TooltipContent>
//                       </Tooltip>
//                     </TooltipProvider>
//                     <span className="text-[#e50b0d] text-xl pl-1">*</span>
//                   </FormLabel>
//                   <FormControl>
//                     <Switch
//                       checked={allowDeuce}
//                       onCheckedChange={setAllowDeuce}
//                     />
//                   </FormControl>
//                   <ErrorFormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>
//         </section>
//       </form>
//     </Form>
//   );
// };

// export default MatchForm;
