"use client";

import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {useUrlFromQuery} from "@/hooks/utils";
import {Pages} from "@/constants/routing";
import {signIn} from "next-auth/react";
import {montserratAlternates} from "@/utils/fonts";
import styles from "@/app/(auth)/signin/components/SignInForm/styles.module.scss";
import {useRouter} from "next/navigation";
import cx from 'classnames'

export const SignUpForm = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {control, handleSubmit, setError, setValue, register} = useForm();

    const {push} = useRouter();
    const callbackUrl = useUrlFromQuery("callbackUrl", Pages.Index);

    const onSubmitReg = async (data: any) => {
        // const regRes = await fetch('http://92.51.47.29:81/auth/register', {body: data})
        // console.log(regRes) // todo: req to reg and login

        setIsLoading(true);

        const res = await signIn("credentials", {
            ...data,
            redirect: false,
        });

        setIsLoading(false);

        if (res?.error) {
            setError("password", {
                type: "custom",
                message: res.error ?? "Incorrect credentials",
            });
            setValue("password", null);
            return;
        }

        push(callbackUrl);
    }
    const onEnter = (key: string) => key === "Enter" && handleSubmit(onSubmitReg)();

    return (
        <div className={montserratAlternates.className}>
            <div className={cx(styles.text, styles.passTitle)}>Имя пользователя</div>

        </div>
    );
}