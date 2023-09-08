import React, { forwardRef, useMemo } from "react"
import cx from "classnames"
import styles from "./Loader.module.css"

export interface LoaderProps
  extends React.ComponentPropsWithoutRef<"div"> {
  className?: string
}

export const Loader = forwardRef<HTMLDivElement, LoaderProps>(
  ({ className }, ref) => {
    const classNames = useMemo(
      () => cx(styles.loader, className),
      [className]
    )

    return <div ref={ref} className={classNames} />
  }
)

Loader.displayName = "Loader"
