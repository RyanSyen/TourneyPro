"use client";

import { useEffect, useState } from "react";

import { StepperLookup } from "@/lookups/stepper/stepperLookup";

interface IFormData {
  roleId: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  area: string;
  dob: Date;
  gender: string;
  photoUrl: string;
}

const useForm = () => {
  const [list, setList] = useState([...StepperLookup]);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<IFormData>({
    area: "",
    dob: new Date(),
    email: "",
    fullName: "",
    gender: "",
    phoneNumber: "",
    photoUrl: "",
    roleId: 0,
  });

  //> for debugging purposes
  // useEffect(() => {
  //   // console.log("updated data: ", data);
  //   console.log("updated list in useEffect: ", list);
  //   console.log("updated step in useEffect: ", step);
  // }, [list, step]);

  const nextStep = () => {
    setList((prevList) =>
      prevList.map((list) => {
        if (list.id === step) return { ...list, isDone: true };

        return list;
      })
    );

    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setList((prevList) =>
      prevList.map((list) => {
        if (list.id === step - 1) return { ...list, isDone: false };

        return list;
      })
    );

    setStep((prevStep) => prevStep - 1);
  };

  const onFormSubmit = (data: IFormData) => {
    setFormData(data);
  };

  return {
    list,
    step,
    nextStep,
    prevStep,
    formData,
    onFormSubmit,
  };
};

export { type IFormData, useForm };
