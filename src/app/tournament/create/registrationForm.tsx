// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { CalendarIcon } from "@radix-ui/react-icons";
// import { format, setDate } from "date-fns";
// import dayjs from "dayjs";
// import { useEffect, useState } from "react";
// import { DateRange } from "react-day-picker";
// import { useForm } from "react-hook-form";
// import { date, z } from "zod";

// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import {
//   ErrorFormMessage,
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
// } from "@/components/ui/form";
// import {
//   Popover,
//   PopoverTrigger,
//   PrimaryPopoverContent,
// } from "@/components/ui/popover";

// import { TournamentDetails } from "./form";

// export const formSchema = z.object({
//   registrationStartDate: z.string({
//     required_error: "Registration start date is required.",
//   }),
//   registrationEndDate: z.string({
//     required_error: "Registration end date is required.",
//   }),
//   withdrawalStartDate: z.string({
//     required_error: "Withdrawal start date is required.",
//   }),
//   withdrawalEndDate: z.string({
//     required_error: "Withdrawal end date is required.",
//   }),
// });

// export interface RegistrationTimelineProp {
//   startDate: Date;
//   endDate: Date;
//   withdrawalStartDate: Date;
//   withdrawalEndDate: Date;
// }

// interface Props {
//   formData: TournamentDetails;
//   onUpdateFormData: (data: TournamentDetails) => void;
// }

// const RegistrationTimelineForm = ({ formData, onUpdateFormData }: Props) => {
//   const [regTimeline, setRegTimeline] = useState<RegistrationTimelineProp>({
//     startDate: formData.registration.startDate,
//     endDate: formData.registration.endDate,
//     withdrawalStartDate: formData.registration.withdrawalStartDate,
//     withdrawalEndDate: formData.registration.withdrawalEndDate,
//   });

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     shouldFocusError: false,
//     defaultValues: {},
//   });

//   useEffect(() => {
//     if (regTimeline.startDate) {
//       form.setValue(
//         "registrationStartDate",
//         regTimeline.startDate.toDateString()
//       );
//     }
//     if (regTimeline.endDate) {
//       form.setValue("registrationEndDate", regTimeline.endDate.toDateString());
//     }
//     if (regTimeline.withdrawalStartDate) {
//       form.setValue(
//         "withdrawalStartDate",
//         regTimeline.withdrawalStartDate.toDateString()
//       );
//     }
//     if (regTimeline.startDate) {
//       form.setValue(
//         "withdrawalEndDate",
//         regTimeline.withdrawalEndDate.toDateString()
//       );
//     }
//   }, [form, regTimeline]);

//   const onSubmit = (data: z.output<typeof formSchema>) => {
//     console.log("form data: ", data);
//   };

//   return (
//     <Form {...form}>
//       <form
//         id="registrationTimelineForm"
//         onSubmit={form.handleSubmit(onSubmit)}
//       >
//         <section
//           className={`space-y-4 overflow-y-auto pr-4 bg-[#14141b] rounded-xl p-6`}
//         >
//           <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
//             Registration Timeline
//           </h4>
//           <div className="flex-wrap grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-12">
//             <FormField
//               control={form.control}
//               name="registrationStartDate"
//               render={({ field }) => {
//                 return (
//                   <FormItem className="flex flex-col">
//                     <FormLabel>
//                       Registration Start Date{" "}
//                       <span className="text-[#e50b0d] text-xl">*</span>
//                     </FormLabel>
//                     <Popover>
//                       <PopoverTrigger asChild>
//                         <FormControl>
//                           <Button variant={"lineInput"} size={"input"}>
//                             {regTimeline.startDate ? (
//                               format(regTimeline.startDate, "PPP")
//                             ) : (
//                               <span>Pick a date</span>
//                             )}
//                             <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
//                           </Button>
//                         </FormControl>
//                       </PopoverTrigger>
//                       <PrimaryPopoverContent
//                         className="w-auto p-0"
//                         align="start"
//                         variant={"primary"}
//                       >
//                         <Calendar
//                           mode="single"
//                           selected={regTimeline.startDate}
//                           onSelect={(date) => {
//                             if (date) {
//                               setRegTimeline({
//                                 ...regTimeline,
//                                 startDate: date,
//                               });
//                             }
//                           }}
//                           initialFocus
//                           disabled={(date) =>
//                             date > new Date() || date < new Date("1900-01-01")
//                           }
//                         />
//                       </PrimaryPopoverContent>
//                     </Popover>
//                     <ErrorFormMessage />
//                   </FormItem>
//                 );
//               }}
//             />
//             <FormField
//               control={form.control}
//               name="registrationEndDate"
//               render={({ field }) => {
//                 return (
//                   <FormItem className="flex flex-col">
//                     <FormLabel>
//                       Registration End Date{" "}
//                       <span className="text-[#e50b0d] text-xl">*</span>
//                     </FormLabel>
//                     <Popover>
//                       <PopoverTrigger asChild>
//                         <FormControl>
//                           <Button variant={"lineInput"} size={"input"}>
//                             {regTimeline.endDate ? (
//                               format(regTimeline.endDate, "PPP")
//                             ) : (
//                               <span>Pick a date</span>
//                             )}
//                             <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
//                           </Button>
//                         </FormControl>
//                       </PopoverTrigger>
//                       <PrimaryPopoverContent
//                         className="w-auto p-0"
//                         align="start"
//                         variant={"primary"}
//                       >
//                         <Calendar
//                           mode="single"
//                           selected={regTimeline.startDate}
//                           onSelect={(date) => {
//                             if (date) {
//                               setRegTimeline({
//                                 ...regTimeline,
//                                 endDate: date,
//                               });
//                             }
//                           }}
//                           initialFocus
//                           disabled={(date) =>
//                             date > new Date() || date < new Date("1900-01-01")
//                           }
//                         />
//                       </PrimaryPopoverContent>
//                     </Popover>
//                     <ErrorFormMessage />
//                   </FormItem>
//                 );
//               }}
//             />
//             <FormField
//               control={form.control}
//               name="withdrawalStartDate"
//               render={({ field }) => {
//                 return (
//                   <FormItem className="flex flex-col">
//                     <FormLabel>
//                       Withdrawal Start Date{" "}
//                       <span className="text-[#e50b0d] text-xl">*</span>
//                     </FormLabel>
//                     <Popover>
//                       <PopoverTrigger asChild>
//                         <FormControl>
//                           <Button variant={"lineInput"} size={"input"}>
//                             {regTimeline.withdrawalStartDate ? (
//                               format(regTimeline.withdrawalStartDate, "PPP")
//                             ) : (
//                               <span>Pick a date</span>
//                             )}
//                             <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
//                           </Button>
//                         </FormControl>
//                       </PopoverTrigger>
//                       <PrimaryPopoverContent
//                         className="w-auto p-0"
//                         align="start"
//                         variant={"primary"}
//                       >
//                         <Calendar
//                           mode="single"
//                           selected={regTimeline.withdrawalStartDate}
//                           onSelect={(date) => {
//                             if (date) {
//                               setRegTimeline({
//                                 ...regTimeline,
//                                 withdrawalStartDate: date,
//                               });
//                             }
//                           }}
//                           initialFocus
//                           disabled={(date) =>
//                             date > new Date() || date < new Date("1900-01-01")
//                           }
//                         />
//                       </PrimaryPopoverContent>
//                     </Popover>
//                     <ErrorFormMessage />
//                   </FormItem>
//                 );
//               }}
//             />
//             <FormField
//               control={form.control}
//               name="registrationEndDate"
//               render={({ field }) => {
//                 return (
//                   <FormItem className="flex flex-col">
//                     <FormLabel>
//                       Withdrawal End Date{" "}
//                       <span className="text-[#e50b0d] text-xl">*</span>
//                     </FormLabel>
//                     <Popover>
//                       <PopoverTrigger asChild>
//                         <FormControl>
//                           <Button variant={"lineInput"} size={"input"}>
//                             {regTimeline.withdrawalEndDate ? (
//                               format(regTimeline.withdrawalEndDate, "PPP")
//                             ) : (
//                               <span>Pick a date</span>
//                             )}
//                             <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
//                           </Button>
//                         </FormControl>
//                       </PopoverTrigger>
//                       <PrimaryPopoverContent
//                         className="w-auto p-0"
//                         align="start"
//                         variant={"primary"}
//                       >
//                         <Calendar
//                           mode="single"
//                           selected={regTimeline.withdrawalEndDate}
//                           onSelect={(date) => {
//                             if (date) {
//                               setRegTimeline({
//                                 ...regTimeline,
//                                 withdrawalEndDate: date,
//                               });
//                             }
//                           }}
//                           initialFocus
//                           disabled={(date) =>
//                             date > new Date() || date < new Date("1900-01-01")
//                           }
//                         />
//                       </PrimaryPopoverContent>
//                     </Popover>
//                     <ErrorFormMessage />
//                   </FormItem>
//                 );
//               }}
//             />
//           </div>
//         </section>
//       </form>
//     </Form>
//   );
// };

// export default RegistrationTimelineForm;
