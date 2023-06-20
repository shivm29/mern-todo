import React, { useContext, useEffect, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { SocketContext } from '../SocketContext'

import '../styling/OptionsContainer.css'

const Options = ({ children }) => {

    const {
        me,
        callAccepted,
        name,
        setName,
        leaveCall,
        callUser,
        callEnded
    } = useContext(SocketContext)

    const [idTocall, setIdToCall] = useState('')


    return (
        <div className="options_container">
            <div className="options">
            <div className="option_box">
                <h2>Account Info</h2>
                <input type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Name' />
    {console.log("me : ", me)}
                <CopyToClipboard text={me} >
                    <button>Copy your Id</button>
                </CopyToClipboard>

            </div>
            <div className="option_box">
                <h2>Make a Call</h2>
                <input type="text"
                    value={idTocall}
                    onChange={(e) => setIdToCall(e.target.value)}
                    placeholder='ID to call' />
                {
                    callAccepted && !callEnded ? (
                        <button
                            onClick={leaveCall}
                        >Hang up </button>
                    ) : (

                        <button onClick={() => callUser(idTocall)} >
                            Call
                        </button>
                    )
                }
            </div> 
            </div>
            <div className="notifications_container">
            {children}
            </div>
           
        </div>
    )
}

export default Options