import dayjs from "dayjs";
import Image from "next/image";
import { useState } from "react";

import CustomLoader from "@/components/common/customLoader";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { RoleLookup } from "@/lookups/role/roleLookup";
import { ResponseData } from "@/types/common";

import { registerUser } from "../service/user/userService";
import { IFormData } from "./useForm";

interface Props {
  prev: () => void;
  next: () => void;
  formData: IFormData;
}

interface IConfirmationList {
  id: number;
  title: string;
  data: string;
}

const Confirmation = ({ prev, next, formData }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const ConfirmationList: IConfirmationList[] =
    formData && Object.keys(formData).length > 0
      ? [
          {
            id: 0,
            title: "Full Name",
            data: formData.fullName,
          },
          {
            id: 1,
            title: "Email Address",
            data: formData.email,
          },
          {
            id: 2,
            title: "Phone Number",
            data: `+${formData.phoneNumber}`,
          },
          {
            id: 3,
            title: "Date of Birth",
            data: dayjs(formData.dob).format("DD/MM/YYYY"),
          },
          {
            id: 4,
            title: "Area",
            data: formData.area,
          },
          {
            id: 5,
            title: "Gender",
            data: formData.gender,
          },
          {
            id: 6,
            title: "Role",
            data: RoleLookup.find((role) => role.id === formData.roleId)!.title,
          },
        ]
      : [];

  const onSubmit = async () => {
    setIsLoading(true);
    const res: ResponseData | undefined = await registerUser(formData);
    console.log("after onSubmit: ", res);
    setIsLoading(false);

    if (res?.success) return next();

    toast({
      variant: res!.success ? "success" : "destructive",
      title: res!.success ? "Success" : "Error",
      description: res!.message,
    });
  };

  return (
    <div>
      {isLoading && <CustomLoader />}
      <p className="text-2xl font-medium tracking-normal py-4">Confirmation</p>
      <div className="items-center grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-12">
        {ConfirmationList.map((list) => {
          return (
            <div
              key={list.id}
              className="flex flex-col justify-start items-start"
            >
              <div className="text-base font-medium">{list.title}</div>
              <div className="font-normal text-[#b9b9b9]">
                {list.data.toString()}
              </div>
            </div>
          );
        })}
      </div>
      <section className="flex justify-end items-center gap-2 pt-8">
        <Button
          type="submit"
          variant={"secondary"}
          onClick={prev}
          className="w-24"
        >
          Back
        </Button>
        <Button
          type="submit"
          variant={"main"}
          onClick={onSubmit}
          className="w-24"
        >
          Proceed
        </Button>
      </section>
    </div>
  );
};

export default Confirmation;
