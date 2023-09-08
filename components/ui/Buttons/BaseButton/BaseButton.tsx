"use client"

import { forwardRef, useMemo } from "react"
import { Transition } from "@headlessui/react"
import cx from "classnames"
import { Loader } from "@/components/ui/Loader"
import styles from "./BaseButton.module.css"

export interface BaseButtonProps
  extends React.ComponentPropsWithoutRef<"button"> {
  loading?: boolean
}

export const LoaderTransitionConfig = {
  enter: "transition-opacity duration-300",
  enterFrom: "opacity-0",
  enterTo: "opacity-100",
  leave: "transition-opacity duration-300",
  leaveFrom: "opacity-100",
  leaveTo: "opacity-0",
} as const

export const BaseButton = forwardRef<
  HTMLButtonElement,
  BaseButtonProps
>(
  (
    { className, children, disabled, loading = false, ...rest },
    ref
  ) => {
    const classNames = useMemo(
      () =>
        cx(
          "w-auto leading-none whitespace-nowrap",
          "!outline-none !ring-0",
          "transition duration-300",
          className,
          styles.button,
          {
            [styles.loading]: loading,
            [styles.disabled]: disabled,
          }
        ),
      [loading, disabled, className]
    )

    return (
      <button
        ref={ref}
        disabled={loading || disabled}
        className={classNames}
        {...rest}
      >
        <div className={styles.inner}>{children}</div>

        <Transition
          show={loading}
          {...LoaderTransitionConfig}
          className={styles.loader}
        >
          <Loader />
        </Transition>
      </button>
    )
  }
)

BaseButton.displayName = "BaseButton"
