import React from "react";

interface Props {
  children: React.ReactNode;
}

export const StudentView = ({ children }: Props) => {
  return (
    <div
      className=" min-w-full p-4 flex flex-col justify-start" // TODO: fix
    >
      {children}
    </div>
  );
};
