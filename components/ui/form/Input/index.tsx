import React from "react";

import styles from './styles.module.scss'

interface IInput {
    name: string
    placeholder: string
    label?: string
    leftIcon?: React.FC<{ color: keyof typeof colors }>
    rightIcon?: React.FC<{ color: keyof typeof colors }>
    className?: ClassValue
    noInline?: boolean
    labelColor?: keyof typeof colors
}


export const Input: React.FC<IInput> = (
    {
        name,
        placeholder,
        label,
        leftIcon,
        rightIcon,
        className,
        noInline = false,
        labelColor
    }
) => {

    const {
        register, formState
    } = useFormContext()

    return (
        <>
            <div
                className={clsx(`d-flex d-${(noInline ? '' : `inline-`)}flex flex-column align-items-start`, className || '')}>
                <Typography size={'p1'} type={'regular'} color={labelColor}>
                    <>
                        {label && label}
                    </>
                </Typography>
                <div className={clsx('d-flex w-100', styles.inputContainer)}>
                    <div>
                        {leftIcon && leftIcon({color: "grey_500"})}
                    </div>
                    <input className={clsx(styles.base, 'd-flex flex-fill')}
                           placeholder={placeholder}
                           {...register(name)}
                    />
                    <div>
                        {rightIcon && rightIcon({color: "grey_500"})}
                    </div>
                </div>
                <Typography color={"danger"} size={'p1'} type={'regular'}>
                    <>
                        {fp.getOr('', `errors.${name}.message`, formState)}
                        {fp.has(`errors.${name}.message`, formState)}
                    </>
                </Typography>
            </div>
        </>
    )
}

import {useFormContext} from "react-hook-form";
import clsx, {ClassValue} from "clsx";
import fp from "lodash/fp";
import {Typography} from "@/components/form/Typography";
import {colors} from "@/lib/utils/css";