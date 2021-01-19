import { useEffect, useState } from "react"

import io from 'socket.io-client';


type StreamEvent = any

const useStreamElements = (props: {authToken: string}) => {


    const socket = io('https://realtime.streamelements.com', {
        transports: ['websocket']
    });

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('authenticated', onAuthenticated);

    function onConnect() {
        console.log('Successfully connected to the websocket');
        socket.emit('authenticate', {
            method: 'jwt',
            token: props.authToken
        });
    }

    function onDisconnect() { console.log('Disconnected from websocket'); }
    function onAuthenticated(data: any) { const { channelId } = data; console.log(`Successfully connected to channel ${channelId}`); }
    socket.on('event:update', (data: StreamEvent) => { console.log(data); });
    socket.on('event:reset', (data: StreamEvent) => { console.log(data); });

    return {
        onEvent: (handler: (data: StreamEvent) => void) => {
            const handlerWithLog = (data: StreamEvent) => {
                console.log(data)
                if (handler) {
                    handler(data)
                }
            }
            socket.on('event:test', handlerWithLog);
            socket.on('event', handlerWithLog); 
        }
    }
}

export default useStreamElements
