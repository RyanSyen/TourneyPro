import { NextResponse } from "next/server";

import { UsersResponse } from "@/app/api/user/route";
import formSchema from "@/app/signup/formSchema";
import { IFormData } from "@/app/signup/useForm";
import { ResponseData } from "@/types/common";
import { UserData } from "@/types/UserData";

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/user`;

interface UserRequest extends IFormData {
  roleId: number;
  photoUrl: string;
  isEmailVerified: boolean;
}

export const getAllUsers = async () => {
  try {
    const res = await fetch(`${BASE_URL}`, {
      method: "GET",
    });

    const resPayload: UsersResponse = await res.json();
    const userList: UserData[] = resPayload.message;

    return userList;
  } catch (error) {
    console.error("Error: ", error);
  }
};

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
