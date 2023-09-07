import React from "react";

interface Props {
  children: React.ReactNode
}

export const DashboardView = ({children}:Props) => {
  return <div
    className="min-h-full bg-gray-100 p-4 flex flex-col justify-start" // TODO: fix
    >{children}</div>
}
