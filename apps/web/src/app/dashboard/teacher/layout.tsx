"use server";

import { ProfileButton } from "../../../components/ProfileButton";
import { Page } from "../../../components/ui";
import Link from "next/link";
import { trpcServer } from "../../../utils/trpc/server";
import { cookies } from "next/headers";
import { Input } from "@/components/ui/input";
import { cn } from "../../../lib/utils/shadcn";
import { NavSidebar } from "./NavSidebar";

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const me = await trpcServer(cookies).user.me.query();

  return (
    <Page>
      <div className="flex flex-row sticky h-16 items-center justify-between px-6 border-b bg-white">
        <div>
        <p className="font-extrabold">toohakai</p>
        </div>
        <div className="flex flex-row items-center">
          <Input type="search" placeholder="Search..." className="mr-4 w-80" />
          <ProfileButton initialData={me} />
        </div>
      </div>
      <div className="flex flex-1 flex-row min-h-full justify-stretch items-stretch">
        <div className="flex flex-col w-64 p-4 gap-1 items-stretch">
          <NavSidebar />
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </Page>
  );

  // return <Page>
  //   <Flex
  //     paddingY={4}
  //     paddingX={12}
  //     width="100%"
  //     borderBottomWidth={1}
  //     alignItems={"center"}
  //   >
  //     <Text fontWeight="bold">toohakai</Text>
  //     <Flex flexGrow={1} />
  //     <Popover trigger="hover">
  //       <PopoverTrigger>
  //         <Tabs
  //           variant='soft-rounded'
  //           colorScheme='green'
  //           index={config.role === 'TEACHER' ? 0 : 1}
  //           onChange={handleTabsChange}
  //           me={4}
  //           borderWidth={2}
  //           borderRadius={99}
  //         >
  //           <TabList>
  //             <Tab>Teacher</Tab>
  //             <Tab>Student</Tab>
  //           </TabList>
  //         </Tabs>
  //       </PopoverTrigger>
  //       <PopoverContent>
  //         <PopoverArrow />
  //         <PopoverBody>This is just for debugging!</PopoverBody>
  //       </PopoverContent>
  //     </Popover>
  //     <ProfileButton />
  //   </Flex>
  //   <Flex width="100%" minHeight="100%" flex={1} justifyContent="stretch" alignItems="stretch">
  //     <Flex width={64} flexDirection="column" borderEndWidth={1}>
  //       {
  //         sidebarItems.map((item) => {
  //           return <Link href={item.href}>
  //             <Button key={item.href} colorScheme="green" m={2} variant={pathname === item.href ? "solid" : "ghost"}>
  //               {item.name}
  //             </Button>
  //           </Link>
  //         })
  //       }
  //     </Flex>
  //     <Divider orientation="vertical"  />
  //     {children}
  //   </Flex>
  // </Page>;
}
