import styles from "./styles.module.scss"
import cx from "classnames";

interface IModal {
    action: boolean
    setAction: React.Dispatch<React.SetStateAction<boolean>>
}

export const Modal: React.FC<React.PropsWithChildren<IModal>> = ({action, setAction, children}) => {
    return (
        <div className={action ? cx(styles.modal, styles.modalActive) : styles.modal} onClick={() => setAction(false)}>
            <div className={action ? cx(styles.modalContent, styles.modalContentActive) : styles.modalContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}