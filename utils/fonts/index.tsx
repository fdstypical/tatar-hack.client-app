import {
  Montserrat_Alternates,
  Noto_Color_Emoji,
} from "next/font/google"

export const montserratAlternates = Montserrat_Alternates({
  subsets: ["cyrillic"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
})

export const notoEmoji = Noto_Color_Emoji({
  subsets: ["emoji"],
  weight: ["400"],
})
