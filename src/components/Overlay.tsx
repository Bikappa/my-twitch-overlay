import React, { useEffect, useState } from 'react';
import { FollowerBadge } from './FollowerBadge';
import { createUseStyles } from 'react-jss';
import { CamDock } from './CamDock';
import io from 'socket.io-client';
import useStreamElements from '../hooks/useStreamElements';

type ChatEvent = {
  name: string
}

type Listener = 'follower-latest'

type StreamEvent = {
  detail: {
    listener: string,
    event: ChatEvent
  }
}

const FOLLOWER_SHOW_TIME = 5000

const styles = {
  root: {
    width: '100vw',
    height: '100vh',
    textAlign: 'center',
    position: 'relative'
  }
}

const useStyles = createUseStyles(styles)

export const Overlay = (props: {authToken: string}) => {

  const styles = useStyles()
  const streamElements = useStreamElements({authToken: props.authToken})
  const [newFollower, setNewFollower] = useState<string>()
 
  useEffect(() => {
    const handlers = {
      'follower-latest': (event: ChatEvent) => {
        setNewFollower(event.name);
      },
    };

    streamElements.onEvent((e:any) => {

      if(!e.listener){
        return
      }

      const handler = handlers[e.listener as Listener]

      if(!handler){
        console.warn('No handler for listener', e.listener)
        return
      }

      handler(e.event);
    })
  }, [streamElements]);

  useEffect(() => {

    if(!newFollower){
      return
    }

    const timeout = setTimeout(() => setNewFollower(undefined), FOLLOWER_SHOW_TIME)
    return () => {
      clearTimeout(timeout)
    }
  }, [newFollower])

  return (
    <div className={styles.root}>
      <CamDock />
      {newFollower ? <FollowerBadge nickname={newFollower} duration={FOLLOWER_SHOW_TIME} /> : null}
    </div>
  );
};
