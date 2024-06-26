import dayjs from "dayjs";
import { ChangeEvent, useEffect, useState } from "react";
import { z } from "zod";

import { updateUser, UserRequest } from "@/app/service/user/userService";
import { DATE_FORMAT_MAIN } from "@/lookups/commonLookup";
import { RoleLookup } from "@/lookups/role/roleLookup";
import { UserData } from "@/types/UserData";

interface ProfileDataProps {
  id: string;
  title: string;
  data: string;
  editable: boolean;
  isEditing?: boolean;
}

const useProfile = (user: UserData | null) => {
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState<ProfileDataProps[]>([]);

  useEffect(() => {
    if (user !== null) {
      setProfileData([
        {
          id: "fullName",
          title: "Full Name",
          data: user.fullName,
          editable: false,
        },
        {
          id: "email",
          title: "Email Address",
          data: user.email,
          editable: true,
          isEditing: false,
        },
        {
          id: "phoneNumber",
          title: "Phone Number",
          data: user.phoneNumber,
          editable: true,
          isEditing: false,
        },
        {
          id: "dob",
          title: "Date Of Birth",
          data: dayjs(user.dob).format(DATE_FORMAT_MAIN),
          editable: false,
        },
        {
          id: "area",
          title: "Area",
          data: user.area,
          editable: true,
          isEditing: false,
        },
        {
          id: "gender",
          title: "Gender",
          data: user.gender,
          editable: false,
        },
        {
          id: "roleId",
          title: "Role",
          data: RoleLookup.find((r) => r.id === user.roleId)?.title!,
          editable: false,
        },
      ]);
    }
  }, [user]);

  const toggleEditing = (index: number) => {
    setProfileData((prevData) => {
      const newData = prevData.map((data, i) => {
        if (i === index && data.editable) {
          return {
            ...data,
            isEditing: !data.isEditing,
          };
        } else {
          return { ...data };
        }
      });

      return newData;
    });
  };

  const onHandleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    if (e.target && e.target.value) {
      setProfileData((prevData) => {
        const newData = prevData.map((data, i) => {
          if (i === index && data.editable) {
            return {
              ...data,
              data: e.target.value,
            };
          } else {
            return { ...data };
          }
        });

        return newData;
      });
    }
  };

  const onHandleConfirm = async (isConfirm: boolean, index: number) => {
    if (isConfirm && user) {
      const name = profileData.find((x, i) => i == index)?.id;
      const data = profileData.find((x, i) => i == index)?.data;
      let updatedData = "";
      console.log("email: ", data);
      try {
        if (name === "email") {
          updatedData = z
            .string()
            .email({
              message: "Please enter a valid email address.",
            })
            .parse(data);
          console.log(updatedData);
        } else if (name === "phoneNumber") {
          updatedData = z
            .string()
            .min(10, {
              message: "Please enter a valid phone number.",
            })
            .parse(data);
        } else if (name === "area") {
          updatedData = z
            .string()
            .min(1, {
              message: "Please enter your city or postcode.",
            })
            .parse(data);
        }

        const reqData: UserRequest = {
          ...user,
          email: name === "email" ? updatedData : user.email,
          phoneNumber: name === "phoneNumber" ? updatedData : user.phoneNumber,
          area: name === "area" ? updatedData : user.area,
          roleId: user.roleId,
          photoUrl: user.photoUrl,
          isEmailVerified: user.isEmailVerified,
          dob: new Date(user.dob),
        };
        const res = await updateUser(reqData, user.id!);
        console.log("result: ", res);
      } catch (error) {
        console.log(error);
      }
    }

    setProfileData((prevData) => {
      const newData = prevData.map((data, i) => {
        if (i === index && data.editable) {
          // const name = Object.keys(user!);
          // const oriData = user![name.find(x => x === data.id)?.toString()]
          const name = Object.keys(user!).find((x) => x == data.id);
          // console.log("value: ", user![name! as keyof UserData]!.toString());
          return {
            ...data,
            isEditing: false,
            data: isConfirm
              ? data.data
              : user![name! as keyof UserData]!.toString(),
          };
        } else {
          return { ...data };
        }
      });

      return newData;
    });
  };

  return {
    isLoading,
    profileData,
    toggleEditing,
    onHandleChange,
    onHandleConfirm,
  };
};

export default useProfile;
