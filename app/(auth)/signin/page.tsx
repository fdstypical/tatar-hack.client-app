"use client"

import styles from "@/styles/pages/auth/signin.module.scss"
import cx from "classnames"
import { SignInForm } from "@/app/(auth)/signin/components/SignInForm"
import { IconArrowLeft } from "@/components/icons"
import { useRouter } from "next/navigation"
import { montserratAlternates } from "@/utils/fonts"

export default async function SignIn() {
  const { push } = useRouter()
  const handleToBack = () => {
    push("/choice")
  }

  return (
    <div
      className={cx(
        "relative",
        styles.wrapper,
        montserratAlternates.className
      )}
    >
      <div className={styles.thirdCircle}></div>
      <div className={styles.secondCircle}></div>
      <div className={styles.firstCircle}></div>
      <div className={styles.rect}></div>

      <div className={"relative"}>
        <div
          className={styles.titleWrapper}
          onClick={() => handleToBack()}
        >
          <div className={styles.backButtonWrapper}>
            <IconArrowLeft
              className={cx(styles.iconBack, "text-white")}
            />
            <div
              className={cx(
                montserratAlternates.className,
                styles.backText
              )}
            >
              Назад
            </div>
          </div>
          <div className={styles.pageTitle}>Вход</div>
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="179"
          height="123"
          viewBox="0 0 179 123"
          fill="none"
        >
          <ellipse
            cx="58.5"
            cy="7.5"
            rx="120.5"
            ry="115.5"
            fill="#049444"
          />
        </svg>
      </div>

      <div className={styles.formWrapper}>
        <SignInForm />
      </div>
    </div>
  )
}
