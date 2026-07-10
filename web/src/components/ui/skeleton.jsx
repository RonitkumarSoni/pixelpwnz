import * as React from "react"

function Skeleton({ className = "", ...props }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-[rgba(108,92,231,0.1)] ${className}`}
      {...props}
    />
  )
}

export { Skeleton }
