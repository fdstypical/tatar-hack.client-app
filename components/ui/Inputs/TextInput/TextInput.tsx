"use client"

import React, { forwardRef, useMemo } from "react"
import cx from "classnames"
import { Nullable } from "@/types"

export type InputPropsWithoutWrapped = Omit<
  React.ComponentPropsWithoutRef<"input">,
  "value" | "onChange" | "onKeyDown"
>

export interface TextInputProps
  extends InputPropsWithoutWrapped {
  className?: string
  value?: Nullable<string>
  onChange?: (value: string) => void
  onKeyDown?: (key: string) => void
}

export const TextInput = forwardRef<
  HTMLInputElement,
  TextInputProps
>(({ value, className, onChange, onKeyDown, ...rest }, ref) => {
  const clsNames = useMemo(
    () =>
      cx(
        "w-full px-4 py-2 outline-none border-none !ring-0",
        "bg-[color:transparent] text-[color:var(--foreground)]",
        "[appearance:textfield]",
        "[&::-webkit-outer-spin-button]:appearance-none",
        "[&::-webkit-inner-spin-button]:appearance-none",
        className
      ),
    [className]
  )

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => onChange?.(event.target.value)

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => onKeyDown?.(event.key)

  return (
    <input
      ref={ref}
      value={value ?? ""}
      className={clsNames}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      {...rest}
    />
  )
})

TextInput.displayName = "TextInput"
