import styles from './styles.module.scss'

interface IEmoji {
    src: string
}


export const Emoji: React.FC<IEmoji> =
    ({
         src
     }) => {

        return (
            <>
                <img className={styles.emojiImg} alt={'emoji'} src={src}/>
            </>
        )
    }