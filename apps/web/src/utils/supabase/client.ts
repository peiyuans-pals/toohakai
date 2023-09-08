import { createClient } from "@supabase/supabase-js";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";

export const supabase = createClientComponentClient(process.env.NEXT_PUBLIC_SUPABASE_URL)
