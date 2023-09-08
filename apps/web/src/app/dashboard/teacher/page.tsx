import { Text } from "../../../components/ui";
import { trpcServer } from "../../../utils/trpc/server";
import { cookies } from "next/headers";

export default async function DashboardRoot() {
  const users = await trpcServer(cookies).user.list.query(); // debug

  const questionBankCount = await trpcServer(
    cookies
  ).questionBank.count.query();

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

      <Text>You have {questionBankCount} question banks</Text>
    </div>
  );
}
