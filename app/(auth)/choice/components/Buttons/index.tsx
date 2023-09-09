"use client";

import styles from "./styles.module.scss";
import {BaseButton} from "@/components/ui/Buttons/BaseButton";
import React, {useState} from "react";
import {useRouter} from "next/navigation";
import cx from "classnames";

export const ButtonsComponent = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleToReg = () => {
        setIsLoading(false);

        push('/signup')
    }

    const handleToAuth = () => {
        setIsLoading(false);

        push('/signin')
    }

    const {push} = useRouter();

    return (
        <div className={styles.buttonsWrapper}>
            <BaseButton
                className={cx(
                    "w-full rounded-full px-5 py-1.5",
                    "text-lg text-[color:var(--white)]",
                    "flex items-center justify-between"
                    , styles.pink)}
                loading={isLoading}
                onClick={handleToAuth}
            >
                вход
            </BaseButton>
            <BaseButton
                className={cx(
                    "w-full rounded-full px-5 py-1.5",
                    "text-lg text-[color:var(--white)]",
                    "flex items-center justify-between green"
                    , styles.green)}
                loading={isLoading}
                onClick={handleToReg}
            >
                регистрация
            </BaseButton>
        </div>);
};
