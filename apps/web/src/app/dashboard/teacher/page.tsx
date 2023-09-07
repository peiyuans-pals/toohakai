import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {Text} from "../../../components/ui";
import {trpcServer} from "../../../utils/trpc/server";

export default async function DashboardRoot() {

  const supabase = createClientComponentClient()

  const users = await trpcServer.user.list()

  return (
    <div className="flex-1">
      <Text>Main pane</Text>

      <div>
        {users.map((user) => (
          <div key={user.id}>
            {user.name} - ({user.email})
          </div>
        ))}
      </div>

    </div>
  );
}
