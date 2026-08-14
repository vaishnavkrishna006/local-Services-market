import { cookies } from "next/headers";
import { API_BASE } from "@/lib/api";

const SERVER_API_BASE = process.env.API_SERVER_URL ?? API_BASE;

export async function apiFetchServer(path: string, options: RequestInit = {}) {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.getAll().map((c) => `${c.name}=${c.value}`).join("; ");

  return fetch(`${SERVER_API_BASE}${path}`, {
    ...options,
    cache: "no-store",
    headers: {
      ...(options.headers ?? {}),
      cookie: cookieHeader
    }
  });
}
