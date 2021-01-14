import React, { useEffect, useState } from 'react';
import { FollowerBadge } from './components/FollowerBadge';
import './App.css'

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

export const App = () => {

  const [newFollower, setNewFollower] = useState<string | undefined>(undefined)
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
    const timeout = setTimeout(() => setNewFollower(undefined), 2500)
    return () => {
      clearTimeout(timeout)
    }
  }, [newFollower])

  return (
    <>
      {newFollower ? <FollowerBadge nickname={newFollower} /> : null}
    </>
  );
};
