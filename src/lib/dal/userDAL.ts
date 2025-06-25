import { fetchData } from "@/lib/db";

export interface User {
  id: number;
  firstname: string;
  middlename: string | null;
  lastname: string | null;
  area: string | null;
  city: string;
  [key: string]: unknown;
}

export async function getAllUsers(): Promise<User[]> {
  return await fetchData("SELECT * FROM formregister");
}