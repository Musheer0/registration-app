import { auth } from "./auth";
import { headers } from "next/headers";
import { cache } from "react";

// Memoized session getter - reads session once per request
export const getSession = cache(async () => {
  return await auth.api.getSession({
    headers: await headers(),
  });
});

