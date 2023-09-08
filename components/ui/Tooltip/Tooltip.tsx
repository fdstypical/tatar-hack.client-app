"use client"

import React, {
  forwardRef,
  Fragment,
  ReactNode,
  useState,
} from "react"
import { Transition } from "@headlessui/react"
import cx from "classnames"
import styles from "./Tooltip.module.css"

export type TooltipPlacement = "left" | "top"

export interface TooltipProps
  extends Omit<
    React.ComponentPropsWithoutRef<"div">,
    "content"
  > {
  content: ReactNode
  placement?: TooltipPlacement
}

export const TooltipTransitionConfig = {
  enter: "transition-opacity duration-300 delay-100",
  enterFrom: "opacity-0",
  enterTo: "opacity-100",
  leave: "transition-opacity duration-300 delay-150",
  leaveFrom: "opacity-100",
  leaveTo: "opacity-0",
} as const

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (
    { children, content, className, placement = "top", ...rest },
    ref
  ) => {
    const [isHovered, setIsHovered] = useState<boolean>(false)

    const tooltipClassNames = cx(
      "absolute rounded-full cursor-pointer transition-all",
      className,
      styles.tooltip,
      { [styles?.[placement]]: placement }
    )

    const onHover = () => setIsHovered(true)

    const onLeave = () => setIsHovered(false)

    return (
      <div
        ref={ref}
        className="relative"
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        {...rest}
      >
        {children}

        <Transition
          show={isHovered}
          as={Fragment}
          {...TooltipTransitionConfig}
        >
          <div role="tooltip" className={tooltipClassNames}>
            {content}
          </div>
        </Transition>
      </div>
    )
  }
)

Tooltip.displayName = "Tooltip"
