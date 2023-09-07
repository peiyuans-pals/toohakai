import React from "react";

interface Props {
  children: React.ReactNode
}

export const Button = ({children}: Props) => {
  return (
    <button className="btn">{children}</button>
  )
}
