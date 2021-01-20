import React, { useEffect, useReducer, useState } from 'react';
import { FollowerBadge } from './FollowerBadge';
import { createUseStyles } from 'react-jss';
import { CamDock } from './CamDock';
import useStreamElements from '../hooks/useStreamElements';

type ChatEvent = {
  name: string
}

type Listener = 'follower-latest'
const FOLLOWER_SHOW_TIME = 8000

const styles = {
  root: {
    width: '100vw',
    height: '100vh',
    textAlign: 'center',
    position: 'relative'
  }
}

const useStyles = createUseStyles(styles)

enum ACTION_TYPE {
  PUSH_FOLLOWER,
  POP_FOLLOWER,
}
type State = {
  followersQueue: string[],
  shownFollower: string | undefined
}

const reducer = (state: State, action: {
  type: ACTION_TYPE
  payload?: any
}) => {
  switch (action.type) {
    case ACTION_TYPE.PUSH_FOLLOWER:
      if (!state.shownFollower) {
        return {
          ...state,
          shownFollower: action.payload
        }
      }

      return {
        ...state,
        followersQueue: [...state.followersQueue, action.payload]
      }

    case ACTION_TYPE.POP_FOLLOWER:
      const [popped, ...rest] = state.followersQueue
      if (!popped && !state.shownFollower) {
        //nothing changed
        return state
      }

      return {
        ...state,
        followersQueue: rest,
        shownFollower: popped
      }
  }
}

export const Overlay = (props: { authToken: string }) => {

  const styles = useStyles()
  const streamElements = useStreamElements({ authToken: props.authToken })
  const [audioEnabled, setAudioEnabled] = useState<boolean>(false)
  const [state, dispatch] = useReducer(reducer, {
    followersQueue: [],
    shownFollower: undefined
  })

  const audioElem = document.getElementById('audio') as HTMLAudioElement

  useEffect(() => {
    const handlers = {
      'follower-latest': (event: ChatEvent) => {
        dispatch({ type: ACTION_TYPE.PUSH_FOLLOWER, payload: event.name });
      },
    };

    streamElements.onEvent((e: any) => {

      if (!e.listener) {
        return
      }

      const handler = handlers[e.listener as Listener]

      if (!handler) {
        console.warn('No handler for listener', e.listener)
        return
      }

      handler(e.event);
    })
  }, []);

  useEffect(() => {

    if (!state.shownFollower) {
      return
    }

    const timeout = setTimeout(() => dispatch({ type: ACTION_TYPE.POP_FOLLOWER }), FOLLOWER_SHOW_TIME)
    return () => {
      clearTimeout(timeout)
    }
  }, [state.shownFollower])

  return (
    <div className={styles.root}>
      { audioEnabled ? null : <button onClick={() => { audioElem.play(); setAudioEnabled(true) }}>Activate Audio</button>}
      <CamDock />
      {state.shownFollower ? <FollowerBadge
        key={state.shownFollower}
        nickname={state.shownFollower}
        duration={FOLLOWER_SHOW_TIME}
      /> : null}
    </div>
  );
};
