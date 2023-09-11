"use server";

import { ProfileButton } from "../../../components/ProfileButton";
import { Page } from "../../../components/ui";
import Link from "next/link";
import { trpcServer } from "../../../utils/trpc/server";
import { cookies } from "next/headers";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";

const sidebarItems = [
  {
    name: "Home",
    href: "/dashboard/teacher"
  },
  {
    name: "Question Banks",
    href: "/dashboard/teacher/question-banks"
  },
  {
    name: "Quizzes",
    href: "/dashboard/teacher/quizzes"
  }
];

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const me = await trpcServer(cookies).user.me.query();

  return (
    <div className="flex flex-row justify-center bg-gradient-to-br from-blue-900 to-blue-400">
      <div className="min-h-screen pt-5 pb-5 flex-col justify-start w-[1280px] bg-white">
        <div className="flex flex-row">
          <div className="block sm:hidden  pl-5">
            <Sheet>
              <SheetTrigger>
                <Button>
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent className=" w-[300px]" side="left">
                <SheetHeader>
                  <SheetTitle>Navigation</SheetTitle>
                  <SheetDescription>
                    <div className="flex flex-col pt-5">
                      {sidebarItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex justify-stretch items-stretch"
                        >
                          <Button className="btn flex-1 mt-1">
                            {item.name}
                          </Button>
                        </Link>
                      ))}
                    </div>
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
          <div className="grow"></div>
          <ProfileButton initialData={me} />
        </div>
        <div className="flex min-h-screen">
          <div className="border-r-violet-500 border-r-[1px] hidden md:block">
            <div className="flex flex-col p-5">
              {sidebarItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex justify-stretch items-stretch mt-1 mb-1"
                >
                  <Button className="btn flex-1">{item.name}</Button>
                </Link>
              ))}
            </div>
          </div>

          <div className="p-10 w-full">{children}</div>
        </div>
      </div>
    </div>
    // {/* </div>
    //   <div className="flex flex-row sticky h-16 bg-blue-300 items-center justify-between px-6">
    //     <p className="font-extrabold">toohakai</p>
    //     <ProfileButton initialData={me} />
    //   </div>
    //   <div className="flex flex-1 flex-row min-h-full bg-pink-300 justify-stretch items-stretch divide-x-2">
    //     <div className="flex flex-col w-64 bg-gray-100 p-4 gap-1">
    //       {sidebarItems.map((item) => (
    //         <Link
    //           key={item.href}
    //           href={item.href}
    //           className="flex justify-stretch items-stretch"
    //         >
    //           <Button className="flex-1">{item.name}</Button>
    //         </Link>
    //       ))}
    //     </div>
    //     <div className="bg-orange-300 flex-1">{children}</div>
    //   </div>
    // </div> */}
  );

  //Backup
  // return (
  //   <Page>
  //     <div className="flex flex-row sticky h-16 bg-blue-300 items-center justify-between px-6">
  //       <p className="font-extrabold">toohakai</p>
  //       <ProfileButton initialData={me} />
  //     </div>
  //     <div className="flex flex-1 flex-row min-h-full bg-pink-300 justify-stretch items-stretch divide-x-2">
  //       <div className="flex flex-col w-64 bg-gray-100 p-4 gap-1">
  //         {sidebarItems.map((item) => (
  //           <Link
  //             key={item.href}
  //             href={item.href}
  //             className="flex justify-stretch items-stretch"
  //           >
  //             <Button className="flex-1">{item.name}</Button>
  //           </Link>
  //         ))}
  //       </div>
  //       <div className="bg-orange-300 flex-1">{children}</div>
  //     </div>
  //   </Page>
  // );

  //Dyllon's old comment
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
