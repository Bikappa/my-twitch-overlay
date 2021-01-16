import { FunctionComponent, useEffect, useState } from 'react'
import { Heart } from 'heroicons-react'
import { createUseStyles } from 'react-jss'
import tokens from '../tokens'

import 'animate.css'

function asVw(number: number) {
    return `${number}vw`
}
const size = 10
const useStyles = createUseStyles({
    bounceIn: {
        animation: 'bounceInUp',
        animationDuration: '1.5s',
    },
    bounceOutUp: {
        animation: 'bounceOutUp',
        animationDuration: '2s',
    },
    root: {
        position: 'relative',
        background: `radial-gradient(at bottom center, ${tokens.colorViolet} 29%, ${tokens.colorPurple} 92%)`,
        width: asVw(size),
        height: asVw(size * 1.3),
        clipPath: 'polygon(0% 0%, 100% 0, 100% 76%, 49% 100%, 0 76%)',
        textAlign: 'center',
        display: 'inline-block',
        transformOrigin: 'center center',
        marginTop: '30vh',
        boxShadow: '0px 0px 190px 190px rgba(0,0,0,0.75)',
    },
    innerBorder: {
        backgroundColor: `${tokens.colorYellowFluoDark}`,
        width: asVw(size * 0.9),
        height: asVw(size * 1.2),
        marginTop: asVw(size * 0.05),
        clipPath: 'polygon(0% 0%, 100% 0, 100% 76%, 49% 100%, 0 76%)',
        display: 'inline-block',
        textAlign: 'center'
    },
    inner: {
        background: `radial-gradient(at top center, ${tokens.colorViolet} 9%, ${tokens.colorPurple} 72%)`,
        width: asVw(size * 0.85),
        height: asVw(size * 1.15),
        marginTop: asVw(size * 0.025),
        clipPath: 'polygon(0% 0%, 100% 0, 100% 76%, 49% 100%, 0 76%)',
        textAlign: 'center',
        color: 'white',
        display: 'inline-block'
    },
    icon: {
        marginBottom: '0.5em',
    },
    label: {
        textTransform: 'uppercase',
        fontSize: '12pt',
        fontFamily: 'Lucida Console',
        fontWeight: 'bold',
        color: 'rgba(255,255,255, 0.9)',
    },
    nickname: {
        marginTop: '0.1em',
        textTransform: 'uppercase',
        textDecoration: 'underline',
        fontSize: '18pt',
        fontFamily: 'MilitiaW01-Regular',
        color: `${tokens.colorYellowFluoDark}`
    },
    fullHeight: {
        height: '100%'
    },
    flex: {
        display: 'flex!important'
    },
    justifyContentCenter: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    flexColumn: {
        flexDirection: 'column'
    }
})

const Flex: FunctionComponent<{ direction?: 'row' | 'column' } & React.HTMLAttributes<HTMLDivElement>> = (props) => {
    const styles = useStyles()

    const className = [
        styles.flex,
        styles.justifyContentCenter,
        ...[props.direction === 'column' ? styles.flexColumn : undefined],
        props.className,
    ].join(' ')

    return <div className={className}>{props.children}</div>
}

export type FollowerBadgeProps = {
    nickname: string
}

enum BadgeAnimation {
    BOUNCING,
    BOUNCINGOUT,
}
export function FollowerBadge({ nickname }: FollowerBadgeProps) {

    const styles = useStyles()

    const [animation, setAnimation] = useState<BadgeAnimation>(BadgeAnimation.BOUNCING)

    const animationClass = {
        [BadgeAnimation.BOUNCING]: styles.bounceIn,
        [BadgeAnimation.BOUNCINGOUT]: styles.bounceOutUp,
    }

    useEffect(() => {
        const t = setTimeout(() => setAnimation(BadgeAnimation.BOUNCINGOUT), 3000)
        return () => {
            clearTimeout(t)
        }
    }, [])

    return (
        <div className={`${styles.root} ${animationClass[animation]}`}>
            <div className={styles.innerBorder}>
                <div className={styles.inner}>
                    <Flex className={styles.fullHeight} direction='column'>
                        <span className={styles.icon}><Heart /></span>
                        <span className={styles.label}>Nuovo follower</span>
                        <h2 className={styles.nickname}>{nickname}</h2>
                    </Flex>
                </div>
            </div>
        </div>
    )
}