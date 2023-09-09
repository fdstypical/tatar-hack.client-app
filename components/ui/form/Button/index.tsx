import clsx, {ClassValue} from "clsx";
import React, {PropsWithChildren, ButtonHTMLAttributes, AriaRole} from "react";
import fp from "lodash/fp";
import {colors} from "@/lib/utils/css";
import styles from "./styles.module.scss"
import {ITypography, Typography} from "@/components/form/Typography";

interface IButton {
    colorBehavior: 'main_blue' | 'main_blue_outline' | 'locked_val' | 'main_pink' | 'main_pink_outline'
    className?: ClassValue,
    htmlType?: 'submit' | 'reset' | 'button'
    colorText?: keyof typeof colors
    onClick?: ButtonHTMLAttributes<HTMLButtonElement>['onClick']
    role?: AriaRole
    disabled?: boolean
    typographyAttr?: ITypography
    leftIcon?: (...args: any) => React.ReactNode
    rightIcon?: (...args: any) => React.ReactNode
    size?: 'sm'
    dataToggle?: any
    dataTarget?: any
}

export const Button: React.FC<PropsWithChildren<IButton>> = (
    {
        colorBehavior,
        htmlType,
        onClick,
        role,
        disabled,
        className,
        leftIcon,
        rightIcon,
        colorText,
        children,
        typographyAttr,
        size = '',
    }) => {
    return <button
        className={clsx(
            styles.base,
            styles[`size_${size}`],
            styles[`btn_${colorBehavior}`],
            className || '',
        )}
        disabled={!!disabled}
        role={role}
        onClick={onClick as any}
        type={fp.isString(htmlType) ? htmlType : 'button' as any}
    >
        <Typography left={() => leftIcon} right={() => rightIcon} color={colorText || 'white'} blockColor {...typographyAttr}>
            {children}
        </Typography>
    </button>
}

export default Button;