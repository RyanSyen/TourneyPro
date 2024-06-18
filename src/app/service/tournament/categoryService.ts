import dayjs from "dayjs";
import { StringValidation } from "zod";

import { ICategory } from "@/app/tournament/(builder)/[id]/dashboard/category/category";

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/tournament_category`;

export interface TournamentCategoryRequest extends ICategory {
  status: string;
  createdAt: string;
  updatedAt: string;
}

export const getCategoryById = async (id: string) => {
  try {
    const res = await fetch(`${BASE_URL}?id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok)
      throw new Error(`Failed to get tournament category: ${res.statusText}`);

    return await res.json();
  } catch (error) {
    console.error("Error: ", error);
  }
};

export const getCategoryByTournamentId = async (tournamentId: string) => {
  try {
    const res = await fetch(`${BASE_URL}?tournamentId=${tournamentId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok)
      throw new Error(`Failed to get tournament categories: ${res.statusText}`);

    return await res.json();
  } catch (error) {
    console.error("Error: ", error);
  }
};

export const setCategory = async (data: ICategory) => {
  try {
    const payload: TournamentCategoryRequest = {
      ...data,
      createdAt: dayjs().toString(),
      updatedAt: dayjs().toString(),
      status: "active",
    };

    const res = await fetch(`${BASE_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok)
      throw new Error(`Failed to create tournament: ${res.statusText}`);

    return await res.json();
  } catch (error) {
    console.error("Error: ", error);
  }
};

export const updateCategory = async (data: ICategory, createdAt: string) => {
  try {
    const payload: TournamentCategoryRequest = {
      ...data,
      createdAt: createdAt,
      updatedAt: dayjs().toString(),
      status: "active",
    };

    const res = await fetch(`${BASE_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok)
      throw new Error(`Failed to update tournament: ${res.statusText}`);

    return await res.json();
  } catch (error) {
    console.error("Error: ", error);
  }
};

export const deleteCategoryById = async (catId: string) => {
  try {
    const res = await fetch(`${BASE_URL}?catId=${catId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok)
      throw new Error(
        `Failed to delete tournament category: ${res.statusText}`
      );

    return await res.json();
  } catch (error) {
    console.error("Error: ", error);
  }
};
