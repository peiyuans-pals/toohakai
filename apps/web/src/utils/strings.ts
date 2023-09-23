import { UserIdentity } from "@supabase/supabase-js";
import { TrpcRouterOutputs } from "./trpc/lib";

export const getCleanedNameFromIdentities = (
  me: TrpcRouterOutputs["user"]["me"] | undefined
): string => {
  // console.log("identities", identities);
  const identities: UserIdentity[] | undefined = me?.identities;
  const userIdentity = Array.isArray(identities) ? identities[0] : null;
  const userName: string = userIdentity?.identity_data?.name  ?? me?.name ?? ""; // just in case there's no name default to ZZ
  return userName.replace(/[^a-zA-Z ]/g, "");
};

export const getInitialsFromCleanedName = (cleanedName: string): string => {
  const allInitials = cleanedName
    .split(" ")
    .map((name: string) => name[0])
    .join("");
  if (allInitials.length === 0) {
    return "??";
  }
  return allInitials[0] + allInitials.slice(-1);
};
