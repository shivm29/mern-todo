import React, { useContext } from 'react'
import { SocketContext } from '../SocketContext'
import '../styling/OptionsContainer.css'
const Notifications = () => {

  const { answerCall,
    call,
    callAccepted,

  } = useContext(SocketContext)

  return (
    <>
      {
        call.isRecievedCall && !callAccepted && (
          <div style={{display: 'flex', justifyContent: 'center'}} >
            <h1>{call.name} is calling</h1>
            <button onClick={answerCall} >
            Answer
            </button>
          </div>
        )
      }
    </>
  )
}

export default Notifications