import { forwardRef } from "react"
import Image, { ImageLoader } from "next/image"
import cx from "classnames"
import styles from "./FillingImage.module.css"

export type MaskColor = "blue" | "blue-light" | "gray-light"

export type GradientType = "to-top" | "to-bottom"

export type ObjectFit =
  | "fill"
  | "contain"
  | "cover"
  | "none"
  | "scale-down"

export interface FillingImageProps
  extends React.HtmlHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  priority?: boolean
  mask?: MaskColor
  objectFit?: ObjectFit
  gradient?: GradientType
  loader?: ImageLoader
}

export const FillingImage = forwardRef<
  HTMLImageElement,
  FillingImageProps
>(
  (
    {
      className,
      src,
      alt,
      loader,
      mask = null,
      priority = false,
      gradient = null,
      objectFit = "fill",
    },
    ref
  ) => {
    const classNames = cx("relative w-full h-full", className)

    const maskClassNames = cx(
      "absolute top-0 left-0 w-full h-full z-10",
      styles.mask,
      {
        [styles?.[mask!]]: mask,
        [styles?.[gradient!]]: gradient,
      }
    )

    const imageClassNames = cx(styles.image, {
      [styles?.[gradient!]]: gradient,
      [styles?.[objectFit]]: objectFit,
    })

    return (
      <div ref={ref} className={classNames}>
        {mask && <div className={maskClassNames} />}

        <Image
          fill
          src={src}
          alt={alt}
          priority={priority}
          loader={loader}
          className={imageClassNames}
        />
      </div>
    )
  }
)

FillingImage.displayName = "FillingImage"
