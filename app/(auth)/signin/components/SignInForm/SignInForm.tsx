"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Pages } from "@/constants/routing"
import cx from "classnames"
import { signIn } from "next-auth/react"
import { Controller, useForm } from "react-hook-form"
import { Input } from "@/components/ui/Inputs/Input"
import { BaseButton } from "@/components/ui/Buttons/BaseButton"
import styles from "./styles.module.scss"

export interface SignInFormProps {}

export const SignInForm: React.FC<SignInFormProps> = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { control, handleSubmit, setError, setValue } = useForm()

  const { push } = useRouter()

  const onSubmit = async (data: any) => {
    setIsLoading(true)

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

    push(Pages.Index)
  }

  const onEnter = (key: string) =>
    key === "Enter" && handleSubmit(onSubmit)()

  return (
    <div>
      <div className={cx(styles.text, styles.titleLogin)}>
        Имя пользователя
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
        rules={{ required: "Password is required" }}
        render={({
          field: { value, onChange },
          fieldState: { error },
        }) => (
          <Input
            className={styles.passInput}
            type="password"
            value={value}
            errors={error?.message ?? null}
            color={!error ? "gray" : "pink"}
            onChange={onChange}
            onKeyDown={onEnter}
          />
        )}
      />
      <div className={styles.buttonWrapper}>
        <BaseButton
          className={cx(
            "w-full rounded-full px-5 py-4",
            "text-lg text-[color:var(--white)]",
            "d-flex items-center justify-center",
            styles.button
          )}
          loading={isLoading}
          onClick={handleSubmit(onSubmit)}
        >
          войти
        </BaseButton>
      </div>
    </div>
  )
}
