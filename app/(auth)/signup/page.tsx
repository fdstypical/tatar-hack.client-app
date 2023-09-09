"use client"
import styles from "@/styles/pages/auth/signup.module.scss"
import { SignUpForm } from "@/app/(auth)/signup/components/SignUpForm"
import { IconArrowLeft } from "@/components/icons"
import cx from "classnames"
import { useRouter } from "next/navigation"

export default function SignUpComponent() {
  const { push } = useRouter()

  const toBack = () => push("/choice")

  return (
    <div className={styles.wrapper}>
      <div className={styles.firstCircle}></div>
      <div className={styles.formWrapper}>
        <SignUpForm />
      </div>

      <div className={"relative"}>
        <div
          className={styles.titleWrapper}
          onClick={() => toBack()}
        >
          <div className={styles.backButtonWrapper}>
            <IconArrowLeft className={styles.iconBack} />
            <div className={cx(styles.backText)}>Назад</div>
          </div>
          <div className={styles.pageTitle}>Регистрация</div>
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
    </div>
  )
}
