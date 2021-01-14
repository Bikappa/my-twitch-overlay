import React from 'react'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
    root: {
        backgroundColor: '#223322',
        padding: '20px',
        width: '400px',
        height: '400px',
        clipPath: 'polygon(0% 0%, 100% 0, 100% 76%, 49% 100%, 0 76%)',
        boxSizing: 'border-box'
    },
    innerBorder: {
        backgroundColor: '#CCFF00',
        padding: '6px',
        width: '360px',
        height: '360px',
        clipPath: 'polygon(0% 0%, 100% 0, 100% 76%, 49% 100%, 0 76%)',
        boxSizing: 'border-box',
    },
    inner: {
        backgroundColor: '#223322',
        padding: '20px',
        width: '348px',
        height: '348px',
        boxSizing: 'border-box',
        clipPath: 'polygon(0% 0%, 100% 0, 100% 76%, 49% 100%, 0 76%)',
        textAlign: 'center',
        color: 'white',

    },
    nickname: {
        textTransform: 'uppercase'
    }
})

export type FollowerBadgeProps = {
    nickname: string
}

export function FollowerBadge({ nickname }: FollowerBadgeProps) {

    const styles = useStyles()


    return (
        <div className={styles.root}>
            <div className={styles.innerBorder}>
                <div className={styles.inner}>
                    <span>Nuovo follower</span>
                    <h2 className={styles.nickname}>{nickname}</h2>
                </div>
            </div>
        </div>
    )
}