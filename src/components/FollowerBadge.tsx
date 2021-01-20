import { FunctionComponent, useEffect, useState } from 'react'
import { Heart } from 'heroicons-react'
import { createUseStyles } from 'react-jss'
import tokens from '../tokens'
import Shield from '../svgs/shield.svg';
import useSound from 'use-sound';

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
        width: asVw(size),
        height: asVw(size * 1.3),
        textAlign: 'center',
        display: 'inline-block',
        transformOrigin: 'center center',
        marginTop: '30vh',
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    inner: {
        position: 'relative',
        width: asVw(size * 0.85),
        height: asVw(size * 1.15),
        marginTop: asVw(size * 0.025),
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
    nickname: string,
    duration: number,
}

enum BadgeAnimation {
    IN,
    OUT,
}

export function FollowerBadge({ nickname, duration }: FollowerBadgeProps) {

    const styles = useStyles()
    const [play, { stop }] = useSound('./sounds/follower.ogg', { volume: 1 })
    const [animation, setAnimation] = useState<BadgeAnimation>(BadgeAnimation.IN)

    const animationClass = {
        [BadgeAnimation.IN]: styles.bounceIn,
        [BadgeAnimation.OUT]: styles.bounceOutUp,
    }

    useEffect(() => {

        const audioElem = document.getElementById('audio') as HTMLAudioElement
        audioElem.volume = 0.6
        audioElem.play()

        const outTimeout = setTimeout(
            () => setAnimation(BadgeAnimation.OUT), duration * (1 - FollowerBadge.RELATIVE_OUT_DURATION)
        )
        return () => {
            audioElem.pause()
            clearTimeout(outTimeout)
        }
    })

    return (
        <div className={`${styles.root} ${animationClass[animation]}`}>
            <img src={Shield} className={styles.background} alt='badge' />
            <div className={styles.inner}>
                <Flex className={styles.fullHeight} direction='column'>
                    <span className={styles.icon}><Heart /></span>
                    <span className={styles.label}>Nuovo follower</span>
                    <h2 className={styles.nickname}>{nickname}</h2>
                </Flex>
            </div>
        </div>
    )
}

FollowerBadge.RELATIVE_IN_DURATION = 0.3
FollowerBadge.RELATIVE_OUT_DURATION = 0.3