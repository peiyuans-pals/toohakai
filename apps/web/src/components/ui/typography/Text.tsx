import React from 'react'

interface Props {
  children: React.ReactNode
}

export const Text = ({ children }: Props) => {
  return (
    <p className="text-gray-900">{children}</p>
  )
}
