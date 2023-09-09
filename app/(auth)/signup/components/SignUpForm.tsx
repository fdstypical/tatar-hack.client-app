"use client"

import React, { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { useUrlFromQuery } from "@/hooks/utils"
import { Pages } from "@/constants/routing"
import { signIn } from "next-auth/react"
import styles from "@/app/(auth)/signup/components/styles.module.scss"
import { useRouter } from "next/navigation"
import cx from "classnames"
import { Input } from "@/components/ui/Inputs/Input"
import { BaseButton } from "@/components/ui/Buttons/BaseButton"

export const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { control, handleSubmit, setError, setValue } = useForm()

  const { push } = useRouter()
  const callbackUrl = useUrlFromQuery("callbackUrl", Pages.Index)

  const onSubmitReg = async (data: any) => {
    setIsLoading(true)

    const regRes = await fetch(
      "https://kzn-hack.duckdns.org/auth/register",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )

    setIsLoading(false)
    if (regRes.status != 200) {
      setError("password", {
        type: "custom",
        message: (await regRes.json())["exception"]
          ? "Ошибка"
          : "Incorrect credentials",
      })
      setValue("password", null)

      return
    }

    const res = await signIn("credentials", {
      ...data,
      redirect: false,
    })

    setIsLoading(false)

    if (res?.error) {
      setError("password", {
        type: "custom",
        message: res.error ?? "Incorrect credentials",
      })
      setValue("password", null)
      return
    }

    push(callbackUrl)
  }
  const onEnter = (key: string) =>
    key === "Enter" && handleSubmit(onSubmitReg)()

  return (
    <div className={cx(styles.formWrapper)}>
      <div className={cx(styles.text, styles.passTitle)}>
        Имя пользователя
      </div>
      <Controller
        name="username"
        control={control}
        rules={{
          required: "Username is required",
        }}
        render={({
          field: { value, onChange },
          fieldState: { error },
        }) => (
          //
          <Input
            className={styles.loginInput}
            type="text"
            value={value}
            errors={error?.message ?? null}
            color={!error ? "gray" : "pink"}
            onChange={onChange}
            onKeyDown={onEnter}
          />
        )}
      />

      <div className={cx(styles.text, styles.passTitle)}>
        Почта
      </div>
      <Controller
        name="email"
        control={control}
        rules={{
          required: "E-mail is required",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "Wrong E-mail format",
          },
        }}
        render={({
          field: { value, onChange },
          fieldState: { error },
        }) => (
          //
          <Input
            className={styles.loginInput}
            type="email"
            value={value}
            errors={error?.message ?? null}
            color={!error ? "gray" : "pink"}
            onChange={onChange}
            onKeyDown={onEnter}
          />
        )}
      />

      <div className={cx(styles.text, styles.passTitle)}>
        Пароль
      </div>
      <Controller
        name="password"
        control={control}
        rules={{
          required: "password is required",
        }}
        render={({
          field: { value, onChange },
          fieldState: { error },
        }) => (
          //
          <Input
            className={styles.loginInput}
            type="password"
            value={value}
            errors={error?.message ?? null}
            color={!error ? "gray" : "pink"}
            onChange={onChange}
            onKeyDown={onEnter}
          />
        )}
      />

      <BaseButton
        className={cx(
          "w-full rounded-full px-5 py-4",
          "text-lg text-[color:var(--white)]",
          "d-flex items-center justify-center",
          styles.button
        )}
        loading={isLoading}
        onClick={handleSubmit(onSubmitReg)}
      >
        Зарегестрироваться
      </BaseButton>
    </div>
  )
}
