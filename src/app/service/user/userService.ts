import { NextResponse } from "next/server";
import { z } from "zod";

import { IFormData } from "@/app/signup/useForm";
import formSchema from "@/components/auth/sign-up/formSchema";
import { ResponseData } from "@/types/common";

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/user`;

// interface UserRequest extends z.output<typeof formSchema> {
//   roleId: number;
//   photoUrl: string;
//   isEmailVerified: boolean;
// }
interface UserRequest extends IFormData {
  roleId: number;
  photoUrl: string;
  isEmailVerified: boolean;
}

export const getUserByEmail = async (email: string) => {
  try {
    // console.log("email: ", email);
    const res = await fetch(`${BASE_URL}/email/${email}`, {
      method: "GET",
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error: ", error);
  }
};

export const registerUser = async (
  // data: z.output<typeof formSchema>,
  // profileUrl: string
  data: IFormData
) => {
  try {
    // console.log("Data param: ", data);
    const parsed = formSchema.safeParse(data);

    if (!parsed.success) throw new Error("Invalid form data");

    const reqData: UserRequest = {
      fullName: data.fullName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      area: data.area,
      dob: data.dob,
      gender: data.gender,
      roleId: data.roleId,
      photoUrl: data.photoUrl,
      isEmailVerified: false,
    };

    console.log("requestData: ", reqData);

    const res = await fetch(`${BASE_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqData),
    });

    if (!res.ok) throw new Error(`Failed to register: ${res.statusText}`);

    return await res.json();
    // const res: ResponseData = { success: true, message: "test" };
    // return res;
  } catch (error) {
    console.error("Error: ", error);
  }
};
