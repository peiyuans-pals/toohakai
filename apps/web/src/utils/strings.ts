import { UserIdentity } from "@supabase/supabase-js";

export const getCleanedNameFromIdentities = (identities: UserIdentity[] | undefined): string => {
  const userIdentity = Array.isArray(identities) ? identities[0] : null;
  const userName: string = userIdentity?.identity_data?.name ?? "No Name"; // just in case there's no name default to ZZ
  return userName.replace(/[^a-zA-Z ]/g, "")
}

export const getInitialsFromCleanedName = (cleanedName: string): string => {
  const allInitials = cleanedName
    .split(" ")
    .map((name: string) => name[0])
    .join("")
  return allInitials[0] + allInitials.slice(-1)
}
