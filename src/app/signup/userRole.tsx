import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { IRoleLookup, RoleLookup } from "@/lookups/role/roleLookup";

import { IFormData } from "./useForm";

interface RoleProp {
  title: string;
  description: string;
  img: string;
}

interface RoleCardProp {
  role: IRoleLookup;
  onSelectRole: (id: number) => void;
  selectedRole: number;
}

interface Props {
  prev: () => void;
  next: () => void;
  formData: IFormData;
  onSubmitStep: (data: IFormData) => void;
}

const RoleCard = ({ role, onSelectRole, selectedRole }: RoleCardProp) => {
  return (
    <div
      onClick={() => onSelectRole(role.id)}
      className={`group relative flex flex-col justify-center items-center cursor-pointer w-[300px] h-[400px] bg-[#14141b] rounded-md transition-all duration-5000 ease-in-out shadow-md border  ${
        selectedRole === role.id ? " border-[#FF2D2F]" : "border-transparent"
      }`}
    >
      <div className="relative flex-center flex-col py-4 transition-all duration-500 group-hover:translate-y-[-60px]">
        <Image
          src={role.img}
          alt={`${role.title} image`}
          width={256}
          height={300}
        />
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight pt-4">
          {role.title}
        </h3>
      </div>
      <div className="absolute flex bottom-0 left-0 right-0 p-4 bg-transparent translate-y-10 rounded-md opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
        <div className="p-4">{role.description}</div>
      </div>
    </div>
  );
};

const UserRole = ({ prev, next, formData, onSubmitStep }: Props) => {
  const [selectedRole, setSelectedRole] = useState(-1);

  const onSelectRole = (id: number) => {
    // setSelectedRole(selectedRole === id ? -1 : id);

    if (selectedRole === id) {
      setSelectedRole(-1);
    } else {
      setSelectedRole(id);
    }

    document.documentElement.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  };

  const onSubmit = () => {
    if (selectedRole < 0) {
      console.log("Please chose your role.");
      //TODO: display toast
      return;
    }

    console.log("Selected role: " + selectedRole);
    onSubmitStep({
      ...formData,
      roleId: selectedRole,
    });
    next();
  };

  return (
    <>
      <p className="text-2xl font-medium tracking-normal py-4">User Role</p>
      <section className="flex flex-col flex-wrap justify-center items-center gap-8 sm:flex-row ">
        {RoleLookup.map((role) => (
          <RoleCard
            key={role.title}
            role={role}
            onSelectRole={onSelectRole}
            selectedRole={selectedRole}
          />
        ))}
      </section>
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
          disabled={selectedRole < 0}
          onClick={onSubmit}
          className="w-24"
        >
          Proceed
        </Button>
      </section>
    </>
  );
};

export default UserRole;
