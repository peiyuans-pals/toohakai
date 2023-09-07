import React from "react";

interface Props {
  children: React.ReactNode,
  level?: 1 | 2 | 3 | 4 | 5 | 6
}

export const Heading = ({children, level}: Props) => {
  return ( // TODO: add support for other heading levels
    <h1 className="text-2xl font-bold text-gray-900">
      {children}
    </h1>
  )
}
