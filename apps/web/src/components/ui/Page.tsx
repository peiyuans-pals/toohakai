import React from "react";

interface Props {
  children: React.ReactNode;
}

export const Page = ({ children }: Props) => {
  return (
    <div
      // minHeight="100vh"
      // display="flex"
      // flexDirection="column"
      // alignItems="center"
      // justifyContent="center"
      // gap={4}
      // width="100vw"
      // // marginY={2}
      // // marginX="auto"
      // paddingY={0}
      // paddngX={4}
      // textAlign="center"
      className="min-h-screen bg-gray-100 flex flex-col justify-start" // TODO: fix
    >
      {children}
    </div>
  );
};
