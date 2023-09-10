"use client"

import { Loader } from "@/components/ui"
import { useFetch } from "@/hooks/fetch/useFetch"
import { fetcher } from "@/libs/apis/fetcher"
import cx from "classnames"

export default function Profile() {
  const { data: completed, isLoading } = useFetch<
    any[],
    unknown
  >((headers) => fetcher.get("/mark/get-completed", headers))

  return (
    <div className="w-full h-full pt-4 px-2 flex flex-col">
      {isLoading && <Loader className="mx-auto text-2xl" />}

      <h1 className="text-2xl font-medium mb-6">
        Ваши достижения
      </h1>

      <div
        className={cx(
          "flex px-4 py-2 mb-4 shadow-2xl items-center gap-6 rounded-md bg-stone-400 opacity-60",
          { "!opacity-100": completed?.length! >= 1 }
        )}
      >
        <div>
          <span className="text-5xl">🚀</span>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Турист</h2>

          <span>
            Поздравляем! Вы стали настоящим туристом Татарстана,
            найдя первую культурную локацию!
          </span>
        </div>
      </div>

      <div
        className={cx(
          "flex px-4 py-2 mb-4 shadow-2xl items-center gap-6 rounded-md bg-stone-400 opacity-60",
          { "!opacity-100": completed?.length! >= 3 }
        )}
      >
        <div>
          <span className="text-5xl">🔥</span>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            Исследователь культуры
          </h2>

          <span>
            Поздравляем! Вы достигли звания Исследователя
            культуры, после того как успешно нашли и изучили 3
            культурные локации в Татарстане!
          </span>
        </div>
      </div>

      <div
        className={cx(
          "flex px-4 py-2 mb-4 shadow-2xl items-center gap-6 rounded-md bg-stone-400 opacity-60",
          { "!opacity-100": completed?.length! >= 5 }
        )}
      >
        <div>
          <span className="text-5xl">🎉</span>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            Знаток татарской культуры
          </h2>

          <span>
            Поздравляем! Вы достигли звания Знатка татарской
            культуры, после того как успешно нашли и изучили 5
            культурных локаций в Татарстане!
          </span>
        </div>
      </div>

      <div
        className={cx(
          "flex px-4 py-2 mb-4 shadow-2xl items-center gap-6 rounded-md bg-stone-400 opacity-60",
          { "!opacity-100": completed?.length! >= 10 }
        )}
      >
        <div>
          <span className="text-5xl">👑</span>
        </div>

        <div className={'overflow-hidden'}>
          <h2 className="text-xl font-semibold mb-2">
            Эксперт по достопримечательностям
          </h2>

          <span>
            Поздравляем! Вы достигли звания Мастера культурных
            традиций, после того как успешно нашли и изучили 10
            культурных локаций в Татарстане!
          </span>
        </div>
      </div>
    </div>
  )
}
