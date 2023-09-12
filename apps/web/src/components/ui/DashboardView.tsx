import React from "react";

interface Props {
  children: React.ReactNode;
}

export const DashboardView = ({ children }: Props) => {
  return (
    <div
      className="min-h-full p-4 flex flex-col justify-start" // TODO: fix
    >
      {children}
    </div>
  );
};
