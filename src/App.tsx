import React, { useEffect, useState } from 'react';
import { FollowerBadge } from './components/FollowerBadge';
import './App.css'
import { createUseStyles } from 'react-jss';
import { CamDock } from './components/CamDock';

type ChatEvent = {
  name: string
}

type Listener = 'follower'

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

export const App = () => {
  const styles = useStyles()
  const [newFollower, setNewFollower] = useState<string | undefined>('Bikappa')
  const handlers = {
    follower: (event: ChatEvent) => {
      setNewFollower(event.name);
    },
  };


  useEffect(() => {
    const chatEventHandler = (e: any) => {
      const obj = e as StreamEvent
      if (!obj.detail.event) {
        return;
      }
      const [listener,] = obj.detail.listener.split('-');
      const event = obj.detail.event;

      handlers[listener as Listener]?.(event);
    };

    window.addEventListener('onEventReceived', chatEventHandler);
    return () => {
      window.removeEventListener('onEventReceived', chatEventHandler);
    };
  });

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
      {newFollower ? <FollowerBadge nickname={newFollower} /> : null}
    </div>
  );
};
