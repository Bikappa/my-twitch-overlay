import React, { useState } from 'react';
import './App.css'
import { Overlay } from './components/Overlay';


const TokenForm = (props: { onTokenSubmit: (token: string) => void }) => {

  const [value, setValue] = useState<string>('')
  const keyDownHandler = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      e.stopPropagation()
      props.onTokenSubmit(value)
    }
  }

  return <input
    type='password'
    placeholder='Your streamelements token'
    value={value}
    onChange={(e) => setValue(e.target.value)}
    onKeyDown={keyDownHandler} />
}

export const App = () => {

  const [authToken, setAuthToken] = useState<string>()


  return (
    authToken ? <Overlay authToken={authToken}/> : <TokenForm onTokenSubmit={(token) => setAuthToken(token)} />
  )
};
