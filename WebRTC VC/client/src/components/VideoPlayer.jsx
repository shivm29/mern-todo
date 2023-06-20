import React, { useContext, useEffect } from 'react'
import '../styling/VideoPlayer.css'
import { SocketContext } from '../SocketContext'

const VideoPlayer = () => {

    const {
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        callEnded,
       

    } = useContext(SocketContext)

    
    return (
        <div className='video_player_container' >

            {
                stream && (
                    <div className="video_player" id='me' >
                        {console.log("myvideo : ", myVideo)}
                        <video playsInline muted ref={myVideo} autoPlay />
                        
                    </div>
                )
            }

            {
                // callAccepted && !callEnded
                callAccepted && !callEnded && (
                    <div className="video_player" >
                        {console.log("user video : ", userVideo)}
                        {/* { console.log("userVideo srcObject:", userVideo.current.srcObject) } */}
                        <video playsInline ref={userVideo} autoPlay />

                        <div className="video_text">{call.name || 'You'}</div>
                    </div>
                )
            }

        </div>
    )
}

export default VideoPlayer