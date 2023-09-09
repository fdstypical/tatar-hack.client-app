import Link from "next/link";
import {ITypography, Typography} from "@/components/form/Typography";
import React, {PropsWithChildren} from "react";
import {UrlObject} from "url";


interface INavLink extends ITypography {
    href: string | UrlObject
}

export const NavLink: React.FC<PropsWithChildren<INavLink>> = (
    {
        href,
        children,
        ...other
    }) => {

    return <Link href={href}>
        <Typography {...other as ITypography}>
            {children}
        </Typography>
    </Link>
}