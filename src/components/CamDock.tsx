import { createUseStyles } from "react-jss"
import tokens from "../tokens"

const useStyles = createUseStyles({
    outer: {
        position: 'absolute',
        backgroundColor: tokens.colorPurple,
        height: '0.9vw',
        width: '19vw',
        bottom: '27vh',
    },
    line: {
        backgroundColor: tokens.colorYellowFluoDark,
        margin: '0.3vw',
        marginLeft: 0,
        height: '0.3vw',
    }
})

export const CamDock = () => {

    const styles = useStyles()

    return  (
        <div className={styles.outer}>
            <div className={styles.line}></div>
        </div>
    )
}