import React, {CSSProperties, PropsWithChildren} from "react";
import clsx, {ClassValue} from 'clsx';
import {colors} from "@/lib/utils/css";

import styles from './styles.module.scss'


type ITypographyTypes =
    `p${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8}_${'regular' | 'medium' | 'semi_bold' | 'bold'}`
    | `h${1 | 2 | 3 | 4}`

export interface ITypography {
    type?: 'regular' | 'medium' | 'semibold' | 'bold'
    size?: 'p1' | 'h1' | 'h2' | 'h3' | 'p2' | 'p3'
    color?: keyof typeof colors
    blockColor?: boolean
    className?: ClassValue
    deepClasses?: ClassValue
    onClick?: (...args: any) => void
    noInline?: boolean
    position?: 'start' | 'center' | 'end' | 'baseline' | 'stretch'
    left?: (args: any) => React.ReactNode
    right?: (args: any) => React.ReactNode
    style?: CSSProperties | undefined
}


export const Typography: React.FC<PropsWithChildren<ITypography>> = (
    {
        type = 'regular',
        size= 'p2',
        color = 'black',
        onClick,
        children,
        className,
        noInline,
        position = 'start',
        left,
        right,
        blockColor,
        deepClasses,
        style,
    }) => {

    return <>
        <div
            className={clsx(
                `d${(noInline ? '' : '-inline')}-flex align-items-${position}`,
                blockColor || styles[`color_${color}`],
                className || '',
                styles[`${type}`],
                styles[`${size}`]
            )}
            tabIndex={-1}
            role={!!onClick ? 'button' : ''}
            onClick={() => onClick && onClick()}
        >
            {left && (
                <div className='pe-2 d-flex'>
                    {left({color})}
                </div>
            )}
            <div className={clsx(deepClasses || '')} style={style}>
                {children}
            </div>
            {right && (
                <div className='pe-2 d-flex'>
                    {right({color})}
                </div>
            )}
        </div>
    </>
}