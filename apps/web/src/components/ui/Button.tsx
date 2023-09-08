import React from "react";

interface Props {
  children: React.ReactNode;
  primary?: boolean;
  variant?: "pill" | "outline" | "bordered" | "disabled" | "3D"
}

export const Button = ({children, primary = false}: Props) => {
  let className = "btn"

  if (primary) className += " btn-primary"

  // TODO: button variants

  return (
    <button className={className}>{children}</button>
  )
}
