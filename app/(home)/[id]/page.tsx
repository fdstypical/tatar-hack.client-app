"use client"

import styles from "@/styles/pages/game/styles.module.scss"
import { Loader } from "@/components/ui"
import { useWatchPostion } from "@/hooks"
import { fetcher } from "@/libs/apis/fetcher"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { Emoji } from "@/app/(home)/components/Emoji"
import cx from "classnames"
import { montserratAlternates, notoEmoji } from "@/utils/fonts"
import { Modal } from "@/app/(home)/components/Modal"
import { BaseButton } from "@/components/ui/Buttons/BaseButton"
import { useRouter } from "next/navigation"

export default function Mark({
  params,
}: {
  params: { id: string }
}) {
  const { data: session } = useSession()
  const { position } = useWatchPostion()
  const [data, setDate] = useState<any>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [emoji, setEmoji] = useState(
    <Emoji src={"emoji/sad.png"} />
  )
  const [action, setAction] = useState<boolean>(false)
  const [helperAction, setHelperAction] =
    useState<boolean>(false)
  const [info, setInfo] = useState<any>({
    label: "",
    description: "",
    src: "",
  })
  const { push } = useRouter()

  const editEmoji = (position: number) => {
    if (position < 500) setEmoji(<Emoji src={"emoji/hot.png"} />)
    if (position > 1000)
      setEmoji(<Emoji src={"emoji/normal.png"} />)
    if (position > 2000)
      setEmoji(<Emoji src={"emoji/okay.png"} />)
    if (position > 3000)
      setEmoji(<Emoji src={"emoji/sad.png"} />)
    if (position > 4000)
      setEmoji(<Emoji src={"emoji/cold.png"} />)
  }

  const backHandle = () => push("/")

  async function successHandle() {
    if (session?.user?.accessToken && position) {
      await fetch(
        "https://kzn-hack.duckdns.org/mark/get/" + params.id,
        {
          headers: {
            Authorization: `Bearer ${session.user.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      ).then(async (response) => {
        const data = await response.json()

        if (response.status === 200) {
          const description =
            data.description.split(".").slice(0, 2).join(".") +
            "."

          setInfo({
            label: data.title,
            description: description,
            src: data.headerImg,
          })
          setAction(true)
        }
      })

      await fetcher.post("/mark/reach", {
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
          "Content-Type": "application/json",
        },
        body: {
          markId: params.id,
          atitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
      })
    }
  }

  useEffect(() => {
    if (session?.user?.accessToken && position)
      fetcher
        .post("/distance/get-to-mark", {
          headers: {
            Authorization: `Bearer ${session.user.accessToken}`,
            "Content-Type": "application/json",
          },
          body: {
            markId: params.id,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        })
        .then((data: any) => {
          const distance = data.distanceInMeters
          setDate(data)
          editEmoji(distance)

          if (data.distanceInMeters < 200) {
            successHandle()
            setAction(true)
          }
        })
        .finally(() => setIsLoading(false))
  }, [session, position])

  return (
    <div className="w-full h-full">
      {isLoading && <Loader className="mx-auto text-2xl" />}
      {data && (
        <div className={styles.gameWrapper}>
          <div className={styles.header}>
            <div
              className={cx(
                "w-full text-2xl flex justify-center mt-6",
                montserratAlternates.className
              )}
            >
              Найди место:{" "}
              <span>{data.mark.emojifiedTitle}</span>
            </div>
            <div className={cx(styles.emojiLayer, "w-auto")}>
              {emoji}
            </div>
          </div>
          <div className={styles.main}>
            <BaseButton
              className={cx(
                "w-full rounded-full px-5 py-8",
                "text-lg text-[color:var(--white)]",
                "d-flex items-center justify-center",
                styles.buttons
              )}
              onClick={() => setHelperAction(true)}
            >
              Правила
            </BaseButton>

            <BaseButton
              className={cx(
                "w-full rounded-full px-5 py-8",
                "text-lg text-[color:var(--white)]",
                "d-flex items-center justify-center",
                styles.buttons
              )}
              onClick={backHandle}
            >
              Назад
            </BaseButton>
          </div>
          <div
            className={cx(
              styles.footer,
              "text-lg text-white",
              montserratAlternates.className
            )}
          >
            Вам осталось около{" "}
            {Math.round(data.distanceInMeters)} метров
          </div>
        </div>
      )}
      <Modal action={action} setAction={() => {}}>
        <div className={"flex-column"}>
          <div className={"text-2xl text-bold"}>Вы нашли</div>
          <div className={"text-xl text-bold mt-6"}>
            {info.label}
          </div>
          <div className={"mt-4"}>{info.description}</div>
          <div className={"mt-4"}>
            <img alt={"image"} src={info.src} />
          </div>
          <BaseButton
            className={
              "rounded-0 bg-green-400 text-white w-full py-8 mt-4"
            }
            onClick={backHandle}
          >
            Назад
          </BaseButton>
        </div>
      </Modal>

      <Modal action={helperAction} setAction={setHelperAction}>
        {" "}
        {/* Rules */}
        <div className={"flex-column"}>
          <div className={"text-2xl text-bold"}>Правила</div>
          <div className={"mt-4"}>
            Отгадай место, зашифрованное c помощью эмодзи
          </div>
          <div className={"mt-4"}>
            Внизу показывается количество метров до локации
          </div>
          <div className={"mt-4"}>
            Сверху справа показывается, как насколько близко вы к
            цели
          </div>
          <div>🥶 - более 4км</div>
          <div>😣 - около 3км</div>
          <div>😐 - около 2км</div>
          <div>🙃 - около 1км</div>
          <div>🥵 - менее 500м</div>
        </div>
      </Modal>
    </div>
  )
}
