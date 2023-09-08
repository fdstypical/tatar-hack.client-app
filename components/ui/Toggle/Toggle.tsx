"use client"

import React, { Fragment, ReactNode, useCallback } from "react"
import { Switch } from "@headlessui/react"
import cx from "classnames"
import { BaseButton } from "@/components/ui/Buttons"
import styles from "./Toggle.module.css"

export interface TogglerRendererProps {
  checked: boolean
}

export interface ToggleProps {
  checked: boolean
  disabled?: boolean
  className?: string
  onChange?: (checked: boolean) => void
  renderToggler?: (props: TogglerRendererProps) => ReactNode
}

export const Toggle: React.FC<ToggleProps> = ({
  checked,
  disabled = false,
  className = null,
  onChange,
  renderToggler,
}) => {
  const getClassNames = useCallback(
    (checked: boolean) =>
      cx(
        "w-full h-6 p-1 flex items-center",
        "rounded-full transition-all",
        className,
        styles.toggle,
        {
          [styles.checked]: checked,
          [styles.disabled]: disabled,
        }
      ),
    [disabled]
  )

  const getToggleClassNames = useCallback(
    (_: boolean) =>
      cx(
        "absolute h-full aspect-square",
        "rounded-full transition-all duration-300",
        styles.toggler
      ),
    []
  )

  return (
    <Switch checked={checked} onChange={onChange} as={Fragment}>
      {({ checked }) => (
        <BaseButton
          disabled={disabled}
          className={getClassNames(checked)}
        >
          <div className="relative h-full w-full">
            <div className={getToggleClassNames(checked)}>
              {renderToggler?.({ checked })}
            </div>
          </div>
        </BaseButton>
      )}
    </Switch>
  )
}
