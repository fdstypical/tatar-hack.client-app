"use client"

import { forwardRef, ReactNode, useMemo } from "react"
import { Transition } from "@headlessui/react"
import cx from "classnames"
import {
  TextInput,
  TextInputProps,
} from "@/components/ui/Inputs/TextInput"
import styles from "./Input.module.css"

export type InputColor = "blue" | "pink" | "gray"

export interface InputProps extends TextInputProps {
  color?: InputColor
  errors?: ReactNode
}

export const ErrorTransitionConfig = {
  enter: "transition-all ease-out duration-300",
  enterFrom: "h-0 opacity-0",
  enterTo: "h-3.5 opacity-100",
  leave: "transition-all ease-in duration-200",
  leaveFrom: "h-3.5 opacity-100",
  leaveTo: "h-0 opacity-0",
} as const

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, errors, color = "blue", ...rest }, ref) => {
    const classNames = useMemo(
      () =>
        cx("py-3 rounded-full", className, styles.input, {
          [styles.has_errors]: !!errors,
          [styles?.[color]]: color,
        }),
      [className, errors, color]
    )

    const errorClassNames = useMemo(
      () => cx("truncate [&>*]:truncale", styles.error),
      []
    )

    return (
      <div className="relative w-full">
        <TextInput ref={ref} className={classNames} {...rest} />

        <Transition
          show={!!errors}
          {...ErrorTransitionConfig}
          className={errorClassNames}
        >
          {errors}
        </Transition>
      </div>
    )
  }
)

Input.displayName = "Input"
