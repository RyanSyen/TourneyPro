import formSchema from "@/app/signup/formSchema";
import { IFormData } from "@/app/signup/useForm";
import { UserData } from "@/types/UserData";
// import { updateCache } from "@/helper/cacheable";

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/user`;

export interface UserRequest extends IFormData {
  roleId: number;
  photoUrl: string;
  isEmailVerified: boolean;
}

export const getAllUsers = async () => {
  try {
    const res = await fetch(`${BASE_URL}`, {
      method: "GET",
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error: ", error);
  }
};

export const getUserByEmail = async (email: string): Promise<UserData> => {
  try {
    const res = await fetch(`${BASE_URL}/email/${email}`, {
      method: "GET",
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.statusText}`);
    }

    const data: UserData = await res.json();
    return data;
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
};

export const getUserById = async (id: string) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "GET",
    });

    if (!res.ok) {
      console.error(`HTTP error! status: ${res.status}`);
      throw new Error(`Error: ${res.statusText} (status: ${res.status})`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      console.error("Network error or invalid URL: ", error);
    } else if (error instanceof Error) {
      console.error("Error fetching user by ID: ", error.message);
    } else {
      console.error("Unknown error: ", error);
    }
    throw error;
  }
};

export const registerUser = async (data: IFormData) => {
  try {
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
  } catch (error) {
    console.error("Error: ", error);
  }
};

export const updateUser = async (data: UserRequest, id: string) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error(`Failed to update user: ${res.statusText}`);

    //update cache
    // updateCache(data, "user");
    return await res.json();
  } catch (error) {
    console.error("Error: ", error);
  }
};
